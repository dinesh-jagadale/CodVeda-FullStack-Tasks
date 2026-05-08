//Hostel_Management_System\backend\src\controllers\roomController.js
import Room from "../models/Room.js";
import User from "../models/User.js";


// @desc Add student (Rector only)
export const addStudent = async (req, res) => {
  const { name, rollNo, email, phone, course, year } = req.body;

  const exists = await Student.findOne({ rollNo });
  if (exists) {
    return res.status(400).json({ message: "Student already exists" });
  }

  const student = await Student.create({
    name,
    rollNo,
    email,
    phone,
    course,
    year
  });

  res.status(201).json(student);
};

// @desc Get all students (Rector only)
export const getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

// @desc Get single student
export const getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.json(student);
};

// @desc Update student
export const updateStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  Object.assign(student, req.body);
  const updatedStudent = await student.save();

  res.json(updatedStudent);
};

// @desc Delete student
export const deleteStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  await student.deleteOne();
  res.json({ message: "Student removed successfully" });
};


// ✅ Create Room (Rector)
export const createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Get All Rooms (Rector)
export const getRooms = async (req, res) => {
  const rooms = await Room.find().populate("occupants", "name email rollNo");
  res.json(rooms);
};

// ✅ Allocate Room to Student
export const allocateRoom = async (req, res) => {
  const { studentId, roomId } = req.body;

  const room = await Room.findById(roomId);
  const student = await User.findById(studentId);

  if (!room || !student) {
    return res.status(404).json({ message: "Room or Student not found" });
  }

  if (room.capacity > room.occupants.length) {
    return res.status(400).json({ message: "Room is full" });
  }

  // remove student from old room
  if (student.room) {
    const oldRoom = await Room.findById(student.room);
    if (oldRoom) {
      oldRoom.occupants.pull(student._id);
      await oldRoom.save();
    }
  }

  room.occupants.push(student._id);
  student.room = room._id;

  await room.save();
  await student.save();

  res.json({ message: "Room allocated successfully" });
};
