const jwt = require("jsonwebtoken");

// Verify JWT and set req.user
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ message: "Unauthorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role }
    next();
  } catch (err) {
    console.error("JWT verify error:", err);
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

// Generic role middleware
const roleMiddleware =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };

// Shortcut middlewares
const isAdmin = roleMiddleware("admin");
const isStudent = roleMiddleware("student");

module.exports = { verifyToken, isAdmin, isStudent, roleMiddleware };
