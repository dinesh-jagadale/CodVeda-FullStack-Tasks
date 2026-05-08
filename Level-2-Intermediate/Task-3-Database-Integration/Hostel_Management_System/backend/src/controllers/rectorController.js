//backend\src\controllers\rectorController.js

const Student = require("../models/studentModel");

export const approveStudent = async (req, res) => {
  const student = await User.findById(req.params.id);

  if (!student || student.role !== "student") {
    return res.status(404).json({ message: "Student not found" });
  }

  student.isApproved = true;
  await student.save();

  res.json({ message: "Student approved" });
};



export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json({
      message: "Student deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  updateStudent,
  deleteStudent
};