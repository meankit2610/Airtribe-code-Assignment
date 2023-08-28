const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name not provided"],
  },
  email: {
    type: String,
    unique: [true, "email already exist"],
    lowercase: true,
    trim: true,
    required: [true, "Email not provided"],
  },
  password: {
    type: String,
    required: [true, "password not provided"],
  },
  preferences: {
    type: Array,
    itemType: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //   updatedAt: {},
});

module.exports = mongoose.model("User", userSchema);
