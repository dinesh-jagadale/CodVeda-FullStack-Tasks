//frontend\src\pages\rector\RectorDashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { Outlet } from "react-router-dom";

const RectorDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/rector/stats/dashboard")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!stats) {
    return <p className="text-center mt-4">Loading dashboard...</p>;
  }

  return (
    <>
      {/* ===== Header ===== */}
      <header className="header">
        <h1>Hostel Management System</h1>
        <p>Dashboard Overview</p>
      </header>

      {/* ===== Layout Wrapper ===== */}
  <div className="dashboard-layout">

  {/* ===== Sidebar ===== */}
  <aside className="sidebar">
    <h4 className="sidebar-title">Menu</h4>

    <Link to="/rector">Dashboard</Link>
    <Link to="/rector/students">Students</Link>
    <Link to="/rector/rooms">Rooms</Link>
    <Link to="/rector/attendance">Attendance</Link>
    <Link to="/rector/payments">Payments</Link>
    <Link to="/rector/complaints">Complaints</Link>
    <Link to="/login">Logout</Link>
  </aside>

  {/* ===== Main Content ===== */}
  <main className="content">
    <Outlet /> 
  </main>
</div>

      {/* ===== Footer ===== */}
      <footer className="footer text-center">
        <p>© 2026 Hostel Management System. All rights reserved.</p>
      </footer>
    </>
  );
};

export default RectorDashboard;
