import Room from "../models/Room.js";
import User from "../models/User.js";

// Create Room
export const createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get Rooms
export const getRooms = async (req, res) => {
  const rooms = await Room.find().populate("occupants");
  res.json(rooms);
};

// Allocate Room
export const allocateRoom = async (req, res) => {
  const { studentId, roomId } = req.body;

  const room = await Room.findById(roomId);
  const student = await User.findById(studentId);

  if (!room || !student)
    return res.status(404).json({ message: "Not found" });

  if (room.occupants.length >= room.capacity)
    return res.status(400).json({ message: "Room full" });

  room.occupants.push(student._id);
  student.room = room._id;

  await room.save();
  await student.save();

  res.json({ message: "Room allocated" });
};