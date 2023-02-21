// app.js

const express = require("express");
const config = require("./backend/config");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const expressws = require("express-ws")(app);

// Allow cross-origin requests
app.use(cors());

// Parse requests of content-type - application/json
app.use(express.json());

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

app.listen(3000, "192.168.43.158", () => {
  console.log(`Server running on port 3000`);
});

// Define routes
const routes = require("./backend/routes");
app.use("/api/v1", routes);

// // Export WebSocket server
// module.exports = wss;
