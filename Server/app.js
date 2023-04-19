//dot env
require("dotenv").config();
//error handler that handles thrown error
require("express-async-errors");

//express
const express = require("express");
const app = express();

//the rest of the package
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

//routes
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");
const examRouter = require("./routes/examRoutes");
const subjectRouter = require("./routes/subjectRoutes");

//database
const connectDB = require("./db/connect");

//middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

//tells us the route we head to
app.use(morgan("tiny"));
//this middle ware help us access json data in our req.body
app.use(express.json());
//parse the cookie from the req.cookies
//if cookies is signed it will be available in req.signedCookies
app.use(cookieParser(process.env.JWT_SECRET));

//file upload
app.use(express.static("./public/uploads"));
app.use(fileUpload());

//routes
app.get("/api", (req, res) => {
  res.send("hello word");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/exams", examRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log("Server has started on " + port));
  } catch (error) {
    console.log(error);
  }
};

start();
