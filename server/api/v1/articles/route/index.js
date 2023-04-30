const articleRouter = require("express").Router();
const util = require("../../../../helper/util")
const validation = require("../validation/index")
const article = require("../controller/index");
const { requireAuth } = require("../../../../middleware/requireAuth");

articleRouter.post("/", requireAuth, util.validate(validation.create), article.create)
articleRouter.put("/:id", requireAuth, util.validate(validation.update), article.update)
articleRouter.get("/:id", article.index)
articleRouter.delete("/:id", requireAuth, article.delete)

module.exports = articleRouter