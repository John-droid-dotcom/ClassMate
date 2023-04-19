const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createSubject = async (req, res) => {
  res.status(StatusCodes.CREATED).send("createSubject");
};
const getAllSubjects = async (req, res) => {
  res.status(StatusCodes.CREATED).send("getAllSubject");
};
const getSingleSubject = async (req, res) => {
  res.status(StatusCodes.CREATED).send("get S Subject");
};
const updateSubject = async (req, res) => {
  res.status(StatusCodes.CREATED).send("updateSubject");
};
const deleteSubject = async (req, res) => {
  res.status(StatusCodes.CREATED).send("deleteSubject");
};

module.exports = {
  createSubject,
  getAllSubjects,
  getSingleSubject,
  updateSubject,
  deleteSubject,
};
