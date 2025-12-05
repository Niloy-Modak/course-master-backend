const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  lesson_no: { type: Number, required: true },
  lesson_title: { type: String, required: true },
  lesson_description: { type: String, required: true },
  lesson_video: { type: String, required: true },
  lesson_status: { type: String, default: "pending" }, // pending | completed | published
});

const courseSchema = new mongoose.Schema(
  {
    course_title: { type: String, required: true },
    about_course: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    course_cover_image: { type: String, default: "" }, // optional

    lessons: {
      type: [lessonSchema],
      default: [],
    },

    course_added_by: {
      name: String,
      email: String,
      role: String,
    },

    students_bought: { type: Number, default: 0 }, // track popularity
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
