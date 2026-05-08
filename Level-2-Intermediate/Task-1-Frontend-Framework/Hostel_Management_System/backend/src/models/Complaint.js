//Hostel_Management_System\backend\src\models\Complaint.js
import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  subject: String,
  description: String,
  status: { type: String, enum: ["open", "in_progress", "resolved"], default: "open" }
}, { timestamps: true });

export default mongoose.model("Complaint", complaintSchema);