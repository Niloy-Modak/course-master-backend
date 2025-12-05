const express = require("express");
const router = express.Router();
const {
  addCourse,
  getCoursesPublic,
  getPopularCourses,
  getCourseDetail,
} = require("../controllers/courseController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// Admin adds course
router.post("/", verifyToken, isAdmin, addCourse);

// Public courses list
router.get("/", getCoursesPublic);

// Popular courses
router.get("/popular", getPopularCourses);

// Course detail (lessons only if purchased)
router.get("/:id", getCourseDetail);

module.exports = router;
