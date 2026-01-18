const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

/**
 * @route   GET /api/students
 * @desc    Get all students
 */
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   POST /api/students
 * @desc    Add new student
 */
router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
