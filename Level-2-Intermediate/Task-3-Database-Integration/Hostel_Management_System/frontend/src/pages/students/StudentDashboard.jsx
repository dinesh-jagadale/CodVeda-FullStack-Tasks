import { Link, Outlet } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <div className="container-fluid">

      <div className="row">

        {/* SIDEBAR */}
        <div className="col-md-2 bg-dark text-white min-vh-100 p-3">

          <h4>Student Panel</h4>

          <ul className="nav flex-column mt-4">

            <li className="nav-item mb-2">
              <Link
                className="nav-link text-white"
                to="/student/profile"
              >
                Profile
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link
                className="nav-link text-white"
                to="/student/rooms"
              >
                Room
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link
                className="nav-link text-white"
                to="/student/attendance"
              >
                Attendance
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link
                className="nav-link text-white"
                to="/student/payments"
              >
                Payments
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link
                className="nav-link text-white"
                to="/student/complaints"
              >
                Complaints
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link
                className="nav-link text-white"
                to="/login"
              >
                Logout
              </Link>
            </li>

          </ul>

        </div>

        {/* CONTENT */}
        <div className="col-md-10 p-4">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default StudentDashboard;