const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createExam = async (req, res) => {
  
  res.status(StatusCodes.CREATED).send("createExam");
};
const getSingleExam = async (req, res) => {
  res.status(StatusCodes.CREATED).send("get Single Exam");
};
const getAllExams = async (req, res) => {
  res.status(StatusCodes.CREATED).send("getAllExams");
};
const updateExam = async (req, res) => {
  res.status(StatusCodes.CREATED).send("updateExam");
};
const deleteExam = async (req, res) => {
  res.status(StatusCodes.CREATED).send("deleteExam");
};

module.exports = {
  createExam,
  getSingleExam,
  getAllExams,
  updateExam,
  deleteExam,
};
