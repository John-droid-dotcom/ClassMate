const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");

const {
  getAllSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  getSingleSubject,
} = require("../controllers/subjectController");

router
  .route("/")
  .get(authenticateUser, getAllSubjects)
  .post(authenticateUser, createSubject);
router
  .route("/:id")
  .get(authenticateUser, getSingleSubject)
  .patch(authenticateUser, updateSubject)
  .delete(authenticateUser, deleteSubject);

module.exports = router;
