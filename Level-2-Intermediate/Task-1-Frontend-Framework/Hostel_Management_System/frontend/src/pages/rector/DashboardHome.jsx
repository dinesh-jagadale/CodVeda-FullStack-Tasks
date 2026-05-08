import { useEffect, useState } from "react";
import api from "../../services/api";

const DashboardHome = () => {
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
    <div className="container mt-4">

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card text-center p-3 shadow-sm">
            <h5>Total Students</h5>
            <h2 className="text-primary">{stats.totalStudents}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center p-3 shadow-sm">
            <h5>Pending Students</h5>
            <h2 className="text-warning">{stats.pendingStudents}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center p-3 shadow-sm">
            <h5>Available Rooms</h5>
            <h2 className="text-success">{stats.availableRooms}</h2>
          </div>
        </div>
      </div>

      <section className="card p-4 shadow-sm">
        <h4>About Us</h4>
        <p className="text-muted">
          Hostel management system dashboard overview.
        </p>
      </section>

    </div>
  );
};

export default DashboardHome;