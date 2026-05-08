//Hostel_Management_System\backend\src\server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import rectorStudentRoutes from "./routes/rectorStudentRoutes.js";
import rectorStatsRoutes from "./routes/rectorStatsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import createRector from "./seed/createRector.js";
import studentRoutes from "./routes/studentRoutes.js";


dotenv.config();
connectDB().then(() => {
  createRector();
});

const app = express();

/* =====================
   MIDDLEWARE
===================== */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(express.json());

/* =====================
   ROUTES
===================== */
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/notices", noticeRoutes);

app.use("/api/students", studentRoutes);

app.use("/api/rector", rectorStudentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rector/stats", rectorStatsRoutes);


/* =====================
   HEALTH CHECK
===================== */
app.get("/", (req, res) => {
  res.send("✅ Hostel Management Backend Running");
});

/* =====================
   ERROR HANDLER (ALWAYS LAST)
===================== */
app.use(errorHandler);

/* =====================
   SERVER
===================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);