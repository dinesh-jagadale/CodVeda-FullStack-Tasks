//Hostel_Management_System\backend\src\controllers\complaintController.js
import Complaint from "../models/Complaint.js";
import Student from "../models/User.js";
// Student creates complaint
export const createComplaint = async (req, res) => {
  const complaint = await Complaint.create({
    student: req.user._id,
    subject: req.body.subject,
    description: req.body.description,
  });

  res.status(201).json(complaint);
};

// Student views own complaints
export const getMyComplaints = async (req, res) => {
  const complaints = await Complaint.find({ student: req.user._id });
  res.json(complaints);
};

// Rector views all complaints
export const getAllComplaints = async (req, res) => {
  const complaints = await Complaint.find()
    .populate("student", "name email rollNo");
  res.json(complaints);
};

// Rector updates complaint status
export const updateComplaintStatus = async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  complaint.status = req.body.status;
  await complaint.save();

  res.json(complaint);
};