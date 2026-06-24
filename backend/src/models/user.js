const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  profilePicture: {
    type: String,
    default: "",
  },

  codeforcesHandle: {
    type: String,
    default: "",
  },

  leetcodeHandle: {
    type: String,
    default: "",
  },

  githubUsername: {
    type: String,
    default: "",
  },

  codechefHandle: {
    type: String,
    default: "",
  },

  atcoderHandle: {
    type: String,
    default: "",
  },

  gfgUsername: {
    type: String,
    default: "",
  },

  bio: {
    type: String,
    default: "",
  },
});

module.exports =
  mongoose.model("User", userSchema);