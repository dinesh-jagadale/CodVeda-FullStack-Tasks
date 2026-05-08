//Hostel_Management_System\backend\src\routes\userRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { rectorOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/me", protect, async (req, res) => {
  const user = await req.user.populate("room");
  res.json(user);
  
});

// Student + Rector
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

// Rector only
router.get("/rector-dashboard", protect, rectorOnly, (req, res) => {
  res.json({ message: "Welcome Rector" });
});

export default router;
