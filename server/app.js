const express = require("express");
const morgan = require("morgan");
const userRouter = require("./api/v1/user/route");
require("./config/database/connection")

const app = express();

app.use(express.json());
app.use(morgan("dev"))

// Expose Routes
app.use("/v1/users", userRouter)

module.exports = app;