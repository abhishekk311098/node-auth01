const express = require("express");
require("dotenv").config();

const limiter = require("./middleware/limiter");
const authRoutes = require("./routes/authRoutes");
const articleRoutes = require("./routes/articleRoutes");
const { sequelize } = require("./config/database");
const passport = require("passport");

const app = express();
app.use(express.json());
app.use(passport.initialize());


app.use(limiter);
app.use("/api/v1", authRoutes);
app.use("/api/v1", articleRoutes);

app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await sequelize.sync();
  console.log(`Server running on port ${PORT}`);
});
