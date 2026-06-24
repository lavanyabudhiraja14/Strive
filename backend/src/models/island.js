const mongoose = require("mongoose");

const islandSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  currentStreak: {
    type: Number,
    default: 0,
  },

  longestStreak: {
    type: Number,
    default: 0,
  },

  trees: {
    type: Number,
    default: 0,
  },

  flowers: {
    type: Number,
    default: 0,
  },

  stones: {
    type: Number,
    default: 0,
  },

  houses: {
    type: Number,
    default: 0,
  },

  ponds: {
    type: Number,
    default: 0,
  },

  lastCompletedDate: {
    type: String,
    default: "",
  },
  totalCompletedDays: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Island", islandSchema);