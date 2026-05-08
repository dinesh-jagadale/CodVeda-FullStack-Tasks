import express from "express";

import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  approveAndAssignRoom,
} from "../controllers/rectorStudentController.js";

const router = express.Router();

// GET ALL STUDENTS
router.get("/students/all", getStudents);

// ADD STUDENT
router.post("/students", addStudent);

// UPDATE STUDENT
router.put("/students/:id", updateStudent);

// DELETE STUDENT
router.delete("/students/:id", deleteStudent);

// APPROVE STUDENT
router.post("/students/approve", approveAndAssignRoom);

export default router;