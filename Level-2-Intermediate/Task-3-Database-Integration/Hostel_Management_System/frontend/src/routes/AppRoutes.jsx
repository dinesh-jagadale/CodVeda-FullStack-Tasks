//Hostel_Management_System\frontend\src\routes\AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import StudentDashboard from "../pages/students/StudentDashboard";
import RectorDashboard from "../pages/rector/RectorDashboard";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route
      path="/student"
      element={
        <ProtectedRoute role="student">
          <StudentDashboard />
        </ProtectedRoute>
      }
    />

    <Route
      path="/rector"
      element={
        <ProtectedRoute role="rector">
          <RectorDashboard />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;