const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach full payload {id, email, role}
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Token is invalid" });
  }
};

module.exports = authMiddleware;
