//C:\Users\Dinesh\Documents\Codveda\CodVeda-FullStack-Tasks\Level-2-Intermediate\Task-1-Frontend-Framework\Hostel_Management_System\frontend\src\pages\rector\DashboardCards.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

const DashboardCards = () => {
  const [total, setTotal] = useState(0);
  const [approved, setApproved] = useState(0);
  const [pending, setPending] = useState(0);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await api.get("/rector/students");

        const students = res.data;

        setTotal(students.length);
        setApproved(students.filter(s => s.isApproved).length);
        setPending(students.filter(s => !s.isApproved).length);

      } catch (error) {
        console.error("DashboardCards error:", error.response?.data || error.message);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="row mb-4">
      <Card title="Total Students" value={total} />
      <Card title="Approved Students" value={approved} />
      <Card title="Pending Approvals" value={pending} />
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="col-md-4">
    <div className="card shadow text-center">
      <div className="card-body">
        <h6>{title}</h6>
        <h3>{value}</h3>
      </div>
    </div>
  </div>
);

export default DashboardCards;