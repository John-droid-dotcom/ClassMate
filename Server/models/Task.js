const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  type: {
    type: String,
    enum: {
      values: ["Assignment", "Revision"],
      message: "{VALUE} IS NOT SUPPORTED.",
    },
  },
  dueDate: {
    type: Date,
    required: [true, "Due Date Must be Provided."],
  },

  title: {
    type: String,
    required: [true, "title Must be Provided."],
  },

  description: {
    type: String,
  },
  completion: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  subject: {
    type: mongoose.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  exam: {
    type: mongoose.Types.ObjectId,
    ref: "Exam",
    default: null,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
