const mongoose = require("mongoose");

// MongoDB connection URI
const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/fibely-reading_hub";

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

module.exports = mongoose;
