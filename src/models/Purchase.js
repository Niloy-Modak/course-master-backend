const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    user_email: { type: String, required: true },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    purchased_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Purchase", purchaseSchema);
