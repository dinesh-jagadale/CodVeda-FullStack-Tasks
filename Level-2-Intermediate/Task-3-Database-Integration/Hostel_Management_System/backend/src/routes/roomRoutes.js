//C:\Users\Dinesh\Documents\Codveda\CodVeda-FullStack-Tasks\Level-2-Intermediate\Task-1-Frontend-Framework\Hostel_Management_System\backend\src\routes\roomRoutes.js
import express from "express";
import {
  createRoom,
  getRooms,
  allocateRoom
} from "../controllers/roomController.js";

import { protect } from "../middleware/authMiddleware.js";
import { rectorOnly } from "../middleware/roleMiddleware.js";
import Room from "../models/Room.js";

const router = express.Router();

// Create Room
router.post("/", protect, rectorOnly, createRoom);

// Get Rooms
router.get("/", protect, rectorOnly, getRooms);

// Allocate Room
router.post("/allocate", protect, rectorOnly, allocateRoom);

// Delete Room
router.delete("/:id", protect, rectorOnly, async (req, res) => {
  try {

    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // prevent deleting room with students
    if (room.occupants.length > 0) {
      return res.status(400).json({
        message: "Cannot delete room with assigned students"
      });
    }

    await Room.findByIdAndDelete(req.params.id);

    res.json({ message: "Room deleted successfully" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
});

export default router;