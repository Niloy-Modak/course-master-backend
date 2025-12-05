const Purchase = require("../models/Purchase");

exports.buyCourse = async (req, res) => {
  const { course_id } = req.body;
  const user = req.user; // comes from verifyToken middleware

  try {
    // Check if already enrolled
    const existing = await Purchase.findOne({
      user_email: user.email,
      course_id,
    });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Already enrolled in this course" });
    }

    // Save purchase
    const purchase = new Purchase({ user_email: user.email, course_id });
    await purchase.save();

    res.json({ success: true, purchase });
  } catch (err) {
    console.error("Purchase error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
