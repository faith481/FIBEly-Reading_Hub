require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoose = require("./utils/db");
const route = require("./routes/route");
const cors = require("cors");
const upload = require("./middleware/multer");
const path = require("path");
const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Session middleware using Redis
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // false because we are in development
  })
);

app.use("/", route);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
const IP_ADDRESS = process.env.NODE_IP_ADDRESS || "127.0.0.1";
app.listen(PORT, IP_ADDRESS, () =>
  console.log(
    `Server is running on port ${PORT} and the IP address is ${IP_ADDRESS}`
  )
);
