const functions = require("firebase-functions");
const express = require("express");
const config = require("./backend/config");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
require("express-ws")(app);
const PORT = 3000;
app.use(express.json());

// Define routes
const routes = require("./backend/routes");
app.use("/api/v1", routes);

// Serve the index.html file for all other requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

// Connect to MongoDB
mongoose
  .connect(config.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
    process.exit();
  });
// comment for firebase deploying
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// un-comment for deploying to firebase
// exports.app = functions.https.onRequest(app);
