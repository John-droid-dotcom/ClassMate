const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");

const {
  getSingleTask,
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router
  .route("/")
  .get(authenticateUser, getAllTasks)
  .post(authenticateUser, createTask);
router
  .route("/:id")
  .get(authenticateUser, getSingleTask)
  .patch(authenticateUser, updateTask)
  .delete(authenticateUser, deleteTask);

module.exports = router;
