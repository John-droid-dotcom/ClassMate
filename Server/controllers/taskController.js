const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createTask = async (req, res) => {
  res.status(StatusCodes.CREATED).send("createTask");
};
const getSingleTask = async (req, res) => {
  res.status(StatusCodes.CREATED).send("getSingleTask");
};
const getAllTasks = async (req, res) => {
  res.status(StatusCodes.CREATED).send("getAllTasks");
};
const updateTask = async (req, res) => {
  res.status(StatusCodes.CREATED).send("updateTask");
};
const deleteTask = async (req, res) => {
  res.status(StatusCodes.CREATED).send("deleteTask");
};

module.exports = {
  createTask,
  getSingleTask,
  getAllTasks,
  updateTask,
  deleteTask,
};
