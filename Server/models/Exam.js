const mongoose = require("mongoose");

const ExamSchema = mongoose.Schema({
  module: String,
  date: {
    type: Date,
    required: [true, "Date Must be Provided"],
  },
  duration: Number,
  subject: {
    type: mongoose.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  location: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Exam", ExamSchema);
