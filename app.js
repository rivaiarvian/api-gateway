require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const mediaRouter = require("./routes/media");
const coursesRouter = require("./routes/courses");
const chaptersRouter = require("./routes/chapters");
const lessonsRouter = require("./routes/lessons");
const imageCoursesRouter = require("./routes/imageCourses");
const myCoursesRouter = require("./routes/myCourses");
const reviewsRouter = require("./routes/reviews");
const ordersRouter = require("./routes/orders");
const paymentsRouter = require("./routes/payments");
const refreshTokensRouter = require("./routes/refreshTokens");
const mentorsRouter = require("./routes/mentors");

const verifyToken = require("./middlewares/verifyToken");

const app = express();

app.use(logger("dev"));
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: false, limit: "200mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/media", mediaRouter);
app.use("/courses", coursesRouter);
app.use("/chapters", verifyToken, chaptersRouter);
app.use("/lessons", lessonsRouter);
app.use("/image-courses",verifyToken, imageCoursesRouter);
app.use("/my-courses", myCoursesRouter);
app.use("/reviews",verifyToken, reviewsRouter);
app.use("/orders", ordersRouter);
app.use("/payments", paymentsRouter);
app.use("/refreshTokens", refreshTokensRouter);
app.use("/mentors",verifyToken, mentorsRouter);

module.exports = app;
