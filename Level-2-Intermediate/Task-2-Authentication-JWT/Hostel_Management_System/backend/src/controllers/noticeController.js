//Hostel_Management_System\backend\src\controllers\noticeController.js

import Notice from "../models/Notice.js";

// Rector posts notice
export const createNotice = async (req, res) => {
  const notice = await Notice.create({
    title: req.body.title,
    message: req.body.message,
    createdBy: req.user._id
  });
  res.status(201).json(notice);
};

// Everyone views notices
export const getNotices = async (req, res) => {
  const notices = await Notice.find().sort({ createdAt: -1 });
  res.json(notices);
};
