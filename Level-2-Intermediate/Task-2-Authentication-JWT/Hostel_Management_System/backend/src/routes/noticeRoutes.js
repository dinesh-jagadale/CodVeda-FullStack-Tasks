//Hostel_Management_System\backend\src\routes\noticeRoutes.js
import express from "express";
import { createNotice, getNotices } from "../controllers/noticeController.js";
import { protect } from "../middleware/authMiddleware.js";
import { rectorOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, getNotices);
router.post("/", protect, rectorOnly, createNotice);

export default router;
