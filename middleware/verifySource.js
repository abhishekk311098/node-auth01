const verifySource = (req, res, next) => {
    const source = req.headers["x-source"];
    if (!source || source !== "android") {
      return res.status(403).json({ message: "Invalid request source" });
    }
    next();
  };
  module.exports = verifySource;