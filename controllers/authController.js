
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendErrorResponse, sendSuccessResponse } = require("../helpers/helper");


const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return sendErrorResponse(res, 400, "All fields are required");
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return sendErrorResponse(res, 409, "Email already registered");
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    sendSuccessResponse(res, 201, "User registered successfully", user);
  } catch (err) {
    sendErrorResponse(res, 500, "Internal server error", err.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendErrorResponse(res, 400, "Email and password are required");
    }
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return sendErrorResponse(res, 401, "Invalid email or password");
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return sendSuccessResponse(res, 200, "Login successful", { token });
  } catch (err) {
    return sendErrorResponse(res, 500, "Internal server error", err.message);
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email"],
    });
    if (!user) {
      return sendErrorResponse(res, 404, "User not found");
    }
    return sendSuccessResponse(res, 200, "User profile fetched successfully", user);
  } catch (err) {
   return sendErrorResponse(res, 500, "Internal server error", err.message);
  }
};

module.exports = { registerUser, loginUser, getProfile };
