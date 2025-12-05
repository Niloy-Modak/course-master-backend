const Course = require("../models/Course");
const Purchase = require("../models/Purchase");

// Admin add course
exports.addCourse = async (req, res) => {
  try {
    const {
      course_title,
      about_course,
      category,
      price,
      lessons = [],
      course_cover_image = null,
    } = req.body;

    // Validate required fields
    if (
      !course_title?.trim() ||
      !about_course?.trim() ||
      !category?.trim() ||
      price === undefined ||
      price === null
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    if (typeof price !== "number" || price < 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Price must be a non-negative number",
        });
    }

    const newCourse = new Course({
      course_title,
      about_course,
      category,
      price,
      lessons,
      course_cover_image,
      course_added_by: {
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });

    const saved = await newCourse.save();
    res.status(201).json({ success: true, course: saved });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET courses for public (no lessons)
exports.getCoursesPublic = async (req, res) => {
  try {
    const courses = await Course.find()
      .sort({ createdAt: -1 })
      .select("course_title about_course category price course_cover_image");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET top 3 popular courses
exports.getPopularCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .sort({ students_bought: -1 })
      .limit(3)
      .select("course_title about_course category price course_cover_image");

    res.json(courses);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET single course with lessons if purchased
exports.getCourseDetail = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });

    let lessons = [];

    // check if user_email query param exists
    const userEmail = req.query.user_email;
    if (userEmail) {
      const purchased = await Purchase.findOne({
        user_email: userEmail,
        course_id: course._id,
      });
      if (purchased) {
        lessons = course.lessons;
      }
    }

    res.json({
      _id: course._id,
      course_title: course.course_title,
      about_course: course.about_course,
      category: course.category,
      price: course.price,
      course_cover_image: course.course_cover_image,
      lessons,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
