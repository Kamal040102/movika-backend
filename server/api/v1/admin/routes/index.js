const adminRoute = require("express").Router();
const admin = require("../controller/index")

adminRoute.get("/articles", admin.getArticles)
adminRoute.put("/articles/:id", admin.updateArticles)
adminRoute.delete("/articles/:id", admin.deleteArticles)
adminRoute.get("/articles/:id", admin.indexArticles)

module.exports = adminRoute;