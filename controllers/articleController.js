const { sendErrorResponse, sendSuccessResponse } = require("../helpers/helper");
const Article = require("../models/Article");

const createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return sendErrorResponse(res, 400, "Title and content are required");
    }
    const article = await Article.create({
      title,
      content,
      userId: req.user.id,
    });
    sendSuccessResponse(res, 201, "Article created successfully", article);
  } catch (err) {
    sendErrorResponse(res, 500, "Internal server error", err.message);
  }
};

const getAllArticle = async (req, res) => {
  try {
    const articles = await Article.findAll();
    sendSuccessResponse(res, 200, "Articles fetched successfully", articles);
  } catch (err) {
    sendErrorResponse(res, 500, "Internal server error", err.message);
  }
};

const getArticleById = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return sendErrorResponse(res, 404, "Article not found");
    }
    sendSuccessResponse(res, 200, "Article fetched successfully", article);
  } catch (err) {
    sendErrorResponse(res, 500, "Internal server error", err.message);
  }
};

const updateArticleById = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return sendErrorResponse(res, 404, "Article not found");
    }
    if (article.userId !== req.user.id) {
      return sendErrorResponse(res, 403, "Not authorized to edit this article");
    }
    await article.update(req.body);
    sendSuccessResponse(res, 200, "Article updated successfully", article);
  } catch (err) {
    sendErrorResponse(res, 500, "Internal server error", err.message);
  }
};

const deleteArticleById = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return sendErrorResponse(res, 404, "Article not found");
    }
    if (article.userId !== req.user.id) {
      return sendErrorResponse(
        res,
        403,
        "Not authorized to delete this article"
      );
    }
    await article.destroy();
    sendSuccessResponse(res, 200, "Article deleted successfully");
  } catch (err) {
    sendErrorResponse(res, 500, "Internal server error", err.message);
  }
};

module.exports = {
  createArticle,
  getAllArticle,
  getArticleById,
  updateArticleById,
  deleteArticleById,
};
