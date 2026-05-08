//C:\Users\Dinesh\Documents\Codveda\CodVeda-FullStack-Tasks\Level-2-Intermediate\Task-1-Frontend-Framework\Hostel_Management_System\backend\src\routes\rectorStatsRoutes.js
import express from "express";
import User from "../models/User.js";
import Room from "../models/Room.js";
import { protect } from "../middleware/authMiddleware.js";
import { rectorOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, rectorOnly, async (req, res) => {
  try {
    console.log("📊 Dashboard API called");

    const totalStudents = await User.countDocuments({
      role: "student",
      status: "active"
    });

    const pendingStudents = await User.countDocuments({
      role: "student",
      status: "registered"
    });

    const rooms = await Room.find();

    const availableRooms = rooms.filter((r) => {
      const occupants = Array.isArray(r.occupants)
        ? r.occupants.length
        : 0;

      const capacity = r.capacity || 0;

      return capacity > occupants;
    }).length;

    res.json({
      totalStudents,
      pendingStudents,
      availableRooms
    });

  } catch (error) {
    console.error("❌ Dashboard Error:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;