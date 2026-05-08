import Attendance from "../models/Attendance.js";
import User from "../models/User.js";
/* =========================
   MARK ATTENDANCE
========================= */
export const markAttendance = async (
  req,
  res
) => {

  try {

    const {
      student,
      date,
      status,
    } = req.body;

    // CHECK EXISTING
    let attendance =
      await Attendance.findOne({
        student,
        date,
      });

    // UPDATE
    if (attendance) {

      attendance.status = status;

      await attendance.save();

    } else {

      // CREATE
      attendance =
        await Attendance.create({
          student,
          date,
          status,
        });
    }

    res.json(attendance);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

/* =========================
   GET ATTENDANCE BY DATE
========================= */
export const getAttendanceByDate =
  async (req, res) => {

    try {

      const selectedDate =
        new Date(req.params.date);

      // START + END OF DAY
      const start =
        new Date(selectedDate);

      start.setHours(0, 0, 0, 0);

      const end =
        new Date(selectedDate);

      end.setHours(
        23,
        59,
        59,
        999
      );

      const attendance =
        await Attendance.find({
          date: {
            $gte: start,
            $lte: end,
          },
        }).populate("student");

      res.json(attendance);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };

/* =========================
   STUDENT MY ATTENDANCE
========================= */
export const getMyAttendance =
  async (req, res) => {

    try {

      // GET EMAIL FROM QUERY
      const { email } = req.query;

      // FIND USER
      const user = await User.findOne({
        email,
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // FIND ATTENDANCE
      const attendance =
        await Attendance.find({
          student: user._id,
        }).sort({
          date: 1,
        });

      res.json(attendance);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message,
      });

    }
  };