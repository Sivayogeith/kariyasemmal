const mongoose = require("mongoose");

const NotificationsSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  userObjectId: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const NotificationsModel = mongoose.model("notifications", NotificationsSchema);

module.exports = NotificationsModel;
