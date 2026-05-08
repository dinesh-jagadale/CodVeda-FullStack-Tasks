import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* RECTOR */
import RectorDashboard from "./pages/rector/RectorDashboard";
import StudentsSection from "./pages/rector/StudentsSection";
import RectorRooms from "./pages/rector/RectorRooms";
import Attendance from "./pages/rector/Attendance";
import Payments from "./pages/rector/Payments";
import Complaints from "./pages/rector/Complaints";
import DashboardHome from "./pages/rector/DashboardHome";

/* STUDENT */
import StudentDashboard from "./pages/students/StudentDashboard";
import StudentProfile from "./pages/students/StudentProfile";
import StudentRooms from "./pages/students/StudentRooms";
import StudentAttendance from "./pages/students/StudentAttendance";
import StudentPayments from "./pages/students/StudentPayments";
import StudentComplaints from "./pages/students/StudentComplaints"
import AttendanceView from "./pages/students/AttendanceView";

function App() {
  return (
    <Routes>

      {/* AUTH */}
      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* STUDENT DASHBOARD */}
      <Route
        path="/student"
        element={<StudentDashboard />}
      >

        <Route
          index
          element={<StudentProfile />}
        />

        <Route
          path="profile"
          element={<StudentProfile />}
        />

        <Route
          path="rooms"
          element={<StudentRooms />}
        />

        <Route
          path="attendance"
          element={<StudentAttendance />}
        />

        <Route
          path="payments"
          element={<StudentPayments />}
        />
        <Route
          path="complaints"
          element={<StudentComplaints />}
        />

        <Route
          path="attendance-view"
          element={<AttendanceView />}
        />

      </Route>

      {/* RECTOR DASHBOARD */}
      <Route
        path="/rector"
        element={<RectorDashboard />}
      >

        <Route
          index
          element={<DashboardHome />}
        />

        <Route
          path="students"
          element={<StudentsSection />}
        />

        <Route
          path="rooms"
          element={<RectorRooms />}
        />

        <Route
          path="attendance"
          element={<Attendance />}
        />

        <Route
          path="payments"
          element={<Payments />}
        />

        <Route
          path="complaints"
          element={<Complaints />}
        />

      </Route>

    </Routes>
  );
}

export default App;