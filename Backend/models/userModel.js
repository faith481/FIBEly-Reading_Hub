const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define sub-schema for the Publisher role
const publisherSchema = new Schema({
  booksUploaded: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

// Define sub-schema for the Normal Reader role
const readerSchema = new Schema({
  booksRead: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

// Define the main User schema
const userSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    auto: true, // Automatically generate ObjectId
  },
  username: {
    type: String,
    unique: false, // username is optional
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["reader", "publisher", "admin"],
    default: "reader",
    required: true,
  },
  publisher: publisherSchema,
  reader: readerSchema,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the `updatedAt` field before saving
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// User authentication method
userSchema.statics.findByCredentials = async function (identifier, password) {
  // Try to find the user by email or username
  const user = await this.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!user) {
    throw new Error("Invalid login credentials");
  }

  // Check if the password matches the stored hash
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new Error("Invalid login credentials");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
