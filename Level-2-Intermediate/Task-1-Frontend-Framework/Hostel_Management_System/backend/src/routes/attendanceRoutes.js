import express from "express";

import {
  markAttendance,
  getAttendanceByDate,
  getMyAttendance,
} from "../controllers/attendanceController.js";

const router = express.Router();

/* MARK ATTENDANCE */
router.post(
  "/",
  markAttendance
);

/* GET BY DATE */
router.get(
  "/date/:date",
  getAttendanceByDate
);

/* STUDENT ATTENDANCE */
router.get(
  "/me",
  getMyAttendance
);

export default router;