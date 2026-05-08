//Hostel_Management_System\backend\src\controllers\authController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// ✅ Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// ✅ Register
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  await User.create({
    name,
    email,
    password,
    role: "student",
    isApproved: false,
    status: "registered",
  });

  res.status(201).json({
    message: "Registered successfully. Wait for rector approval.",
  });
};

// ✅ Login (THIS WAS MISSING)
export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    // FIND USER
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // SIMPLE PASSWORD CHECK
    if (password !== user.password) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // SUCCESS
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};