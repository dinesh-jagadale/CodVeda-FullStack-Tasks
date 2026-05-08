//Hostel_Management_System\backend\src\routes\complaintRoutes.js
import express from "express";
import {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus
} from "../controllers/complaintController.js";

import { protect } from "../middleware/authMiddleware.js";
import { rectorOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Student
router.post("/", protect, createComplaint);
router.get("/me", protect, getMyComplaints);

// Rector
router.get("/all", protect, rectorOnly, getAllComplaints);
router.put("/:id", protect, rectorOnly, updateComplaintStatus);

export default router;
