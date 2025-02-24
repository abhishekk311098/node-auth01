const sendErrorResponse = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({
    success: false,
    message,
    data,
  });
};

const sendSuccessResponse = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

module.exports = { sendErrorResponse, sendSuccessResponse };
