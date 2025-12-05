const express = require("express");
const router = express.Router();
const { buyCourse } = require("../controllers/purchaseController");
const { verifyToken, isStudent } = require("../middleware/authMiddleware");

// Only logged-in students can buy courses
router.post("/buy", verifyToken, isStudent, buyCourse);

module.exports = router;
