import { useEffect, useState } from "react";

import {
  getMyAttendance,
} from "../../services/attendanceService";

const StudentAttendance = () => {

  const [attendance, setAttendance] = useState([]);

  useEffect(() => {

    loadAttendance();

  }, []);

  const loadAttendance = async () => {

    try {

      const data = await getMyAttendance();

      setAttendance(data || []);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="container mt-4">

      <h3>Attendance</h3>

      <table className="table table-bordered mt-3">

        <thead className="table-dark">

          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {attendance.length > 0 ? (

            attendance.map((a) => (

              <tr key={a._id}>

                <td>
                  {new Date(
                    a.date
                  ).toLocaleDateString()}
                </td>

                <td>

                  {a.status === "present" ? (

                    <span className="badge bg-success">
                      Present
                    </span>

                  ) : (

                    <span className="badge bg-danger">
                      Absent
                    </span>

                  )}

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="2"
                className="text-center"
              >
                No attendance found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
};

export default StudentAttendance;