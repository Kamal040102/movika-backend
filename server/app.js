const express = require("express");
const morgan = require("morgan");
const userRouter = require("./api/v1/user/route");
const articleRouter = require("./api/v1/articles/route");
require("../config/database/connection")
const cors = require("cors");
const adminRoute = require("./api/v1/admin/routes");
const userArticleRouter = require("./api/v1/userArticles/routes");

const app = express();

app.use(cors())
app.use(express.json());
app.use(morgan("dev"))

app.get("/", (req, res) => {
    res.send("Backend is live")
})

// Expose Routes
app.use("/v1/users", userRouter)
app.use("/v1/articles", articleRouter)
app.use("/v1/admin", adminRoute)
app.use("/v1/userArticle", userArticleRouter)

module.exports = app;