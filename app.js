require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const mediaRouter = require("./routes/media");
const coursesRouter = require("./routes/courses");
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
app.use("/orders", ordersRouter);
app.use("/payments", paymentsRouter);
app.use("/refreshTokens", refreshTokensRouter);
app.use("/mentors",verifyToken, mentorsRouter);

module.exports = app;
