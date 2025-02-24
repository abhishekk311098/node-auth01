const express = require("express");
const authenticate = require("../middleware/authMiddleware");

const {
  createArticle,
  getAllArticle,
  getArticleById,
  updateArticleById,
  deleteArticleById,
} = require("../controllers/articleController");
const router = express.Router();

router.post("/article", authenticate, createArticle);
router.get("/articles", getAllArticle);
router.get("/articles/:id", getArticleById);
router.put("/articles/:id", authenticate, updateArticleById);
router.delete("/articles/:id", authenticate, deleteArticleById);

module.exports = router;
