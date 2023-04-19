const mongoose = require("mongoose");

const SubjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name Must be Provided"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Subject", SubjectSchema);
