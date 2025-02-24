const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Article = sequelize.define("Article", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  userId: { type: DataTypes.UUID, allowNull: false },
});

module.exports = Article;