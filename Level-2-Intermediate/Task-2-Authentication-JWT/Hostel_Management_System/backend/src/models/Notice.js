//Hostel_Management_System\backend\src\models\Notice.js
import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: String,
  message: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Notice", noticeSchema);