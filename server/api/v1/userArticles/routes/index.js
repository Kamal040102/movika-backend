const { requireAuth } = require("../../../../middleware/requireAuth");
const userArticles = require("../controllers/index")
const userArticleRouter = require("express").Router();

userArticleRouter.get("/:id", requireAuth, userArticles.indexAllUser)

module.exports = userArticleRouter;