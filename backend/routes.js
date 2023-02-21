const express = require("express");
const router = express.Router();
const UserModel = require("./models/user");
const NotificationsModel = require("./models/notifications");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { jwtKey, notifications, uri } = require("./config");

router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({
      name: req.body.username,
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid username!" });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password!" });
    }

    const token = jwt.sign(
      {
        username: req.body.username,
        email: user.email,
        _id: user._id,
      },
      jwtKey
    );

    console.log("User logged in!");
    console.log(req.body.username);
    res.status(200).json({ message: "Logged in successfully!", token: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    // Check if email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(401).json({ message: "Invalid email format!" });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({
      name: req.body.username,
    });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }
    // Check if email already exists
    const existingEmail = await UserModel.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(409).json({ message: "Email already exists!" });
    }

    // Create new user
    const newUser = new UserModel({
      email: req.body.email,
      password: req.body.password,
      name: req.body.username,
    });
    // Save new user to database

    await newUser.save(async (err, object) => {
      message = new NotificationsModel({
        userObjectId: object._id,
        to: req.body.username,
        message: notifications.newUser(req.body.username),
      });
      await message.save();
    });
    const token = jwt.sign(
      { username: req.body.username, email: req.body.email, _id: newUser._id },
      jwtKey
    );

    // Return success message
    console.log("User created!");
    console.log(newUser.toJSON());
    return res
      .status(201)
      .json({ message: "User created successfully!", token: token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/notifications", async (req, res) => {
  try {
    const notifications = await NotificationsModel.find({
      to: req.query.to,
      userObjectId: req.query.id,
    });
    if (notifications) {
      return res.status(200).json(notifications);
    }
    return res.status(200).json([]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});
router.delete("/deleteNotification/:id", async (req, res) => {
  try {
    const notification = await NotificationsModel.findByIdAndDelete(
      req.params.id
    );
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});
router.put("/markAsRead/:id", async (req, res) => {
  try {
    const notification = await NotificationsModel.findByIdAndUpdate(
      req.params.id,
      { read: true }
    );
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    return res.status(200).send({ message: "Successfully updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.ws("/subscribeNotifications", (ws, req) => {
  console.log(req.query);
  let notifications = mongoose.connection.collection("notifications");
  let monitor = notifications.watch([
    {
      $match: {
        "fullDocument.userObjectId": req.query.id,
        "fullDocument.to": req.query.to,
      },
    },
  ]);
  monitor.on("change", (change) => {
    let doc = change.fullDocument;
    console.log(doc);
    doc["type"] = "notification";
    ws.send(JSON.stringify(doc));
  });
  ws.on("message", (mes) => {
    ws.send(mes);
  });
});
module.exports = router;
