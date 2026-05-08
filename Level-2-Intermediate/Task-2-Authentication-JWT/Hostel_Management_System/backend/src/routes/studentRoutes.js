import express from "express";

import {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent
} from "../controllers/rectorStudentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { rectorOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Rector Only
router.post("/", protect, rectorOnly, addStudent);

router.get("/", protect, rectorOnly, getStudents);

router.put("/:id", protect, rectorOnly, updateStudent);

router.delete("/:id", protect, rectorOnly, deleteStudent);

export default router;