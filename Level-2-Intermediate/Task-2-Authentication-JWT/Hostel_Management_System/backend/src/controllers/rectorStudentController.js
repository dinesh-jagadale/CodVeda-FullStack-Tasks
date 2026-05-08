import User from "../models/User.js";
import Room from "../models/Room.js";
import Payment from "../models/Payment.js";

/* =========================
   ADD STUDENT
========================= */
export const addStudent = async (req, res) => {
  try {
    const { name, email, password, roomId } = req.body;

    const existingStudent = await User.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({
        message: "Student already exists",
      });
    }

    const student = await User.create({
      name,
      email,
      password,
      role: "student",
      isApproved: true,
      status: "active",
      room: roomId || null,
    });

    // CREATE PAYMENT RECORD
    await Payment.create({
      student: student._id,
      totalFee: 50000,
      dueAmount: 50000,
      paidAmount: 0,
      status: "due",
    });

    // ASSIGN ROOM
    if (roomId) {
      const room = await Room.findById(roomId);

      if (!room) {
        return res.status(404).json({
          message: "Room not found",
        });
      }

      if (room.occupants.length >= room.capacity) {
        return res.status(400).json({
          message: "Room is full",
        });
      }

      room.occupants.push(student._id);

      await room.save();
    }

    res.status(201).json(student);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
   GET ALL STUDENTS
========================= */
export const getStudents = async (req, res) => {
  try {

    const students = await User.find({
      role: "student",
    }).populate("room");

    res.json(students);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

/* =========================
   GET REGISTERED STUDENTS
========================= */
export const getRegisteredStudents = async (req, res) => {
  try {

    const students = await User.find({
      role: "student",
      isApproved: false,
    });

    res.json(students);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

/* =========================
   UPDATE STUDENT
========================= */
export const updateStudent = async (req, res) => {
  try {

    const {

  name,

  email,

  password,

  room,

} = req.body;

const student =
  await User.findByIdAndUpdate(

    req.params.id,

    {

      name,

      email,

      password,

      room,

    },

    {

      new: true,

    }

  );

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json(student);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

/* =========================
   DELETE STUDENT
========================= */
export const deleteStudent = async (req, res) => {
  try {

    const student = await User.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // REMOVE STUDENT FROM ROOM
    if (student.room) {

      const room = await Room.findById(student.room);

      if (room) {

        room.occupants = room.occupants.filter(
          (id) => id.toString() !== student._id.toString()
        );

        await room.save();
      }
    }

    // DELETE PAYMENT RECORD
    await Payment.deleteMany({
      student: student._id,
    });

    // DELETE STUDENT
    await User.findByIdAndDelete(student._id);

    res.json({
      message: "Student deleted successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

/* =========================
   APPROVE + ASSIGN ROOM
========================= */
export const approveAndAssignRoom = async (req, res) => {
  try {

    const { studentId, roomId } = req.body;

    const student = await User.findByIdAndDelete(req.params.id);

    const room = await Room.findById(roomId);

    if (!student || !room) {
      return res.status(404).json({
        message: "Student or Room not found",
      });
    }

    if (student.isApproved) {
      return res.status(400).json({
        message: "Student already approved",
      });
    }

    if (room.occupants.includes(student._id)) {
      return res.status(400).json({
        message: "Student already assigned to this room",
      });
    }

    if (room.occupants.length >= room.capacity) {
      return res.status(400).json({
        message: "Room is full",
      });
    }

    // ASSIGN ROOM
    room.occupants.push(student._id);

    student.room = room._id;

    // APPROVE STUDENT
    student.isApproved = true;
    student.status = "active";

    await room.save();
    await student.save();

    res.json({
      message: "Student approved and room assigned successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};