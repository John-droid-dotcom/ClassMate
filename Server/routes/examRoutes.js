const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");

const {
  getAllExams,
  createExam,
  getSingleExam,
  updateExam,
  deleteExam,
} = require("../controllers/examController");

router
  .route("/")
  .get(authenticateUser, getAllExams)
  .post(authenticateUser, createExam);
router
  .route("/:id")
  .get(authenticateUser, getSingleExam)
  .patch(authenticateUser, updateExam)
  .delete(authenticateUser, deleteExam);

module.exports = router;
