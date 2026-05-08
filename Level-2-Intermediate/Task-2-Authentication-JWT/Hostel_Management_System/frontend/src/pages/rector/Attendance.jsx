import { useEffect, useState } from "react";

import {
  getAttendanceByDate,
  markAttendance,
} from "../../services/attendanceService";

import { getAllStudents } from "../../services/rectorService";

const Attendance = () => {

  const [students, setStudents] = useState([]);

  const [attendance, setAttendance] = useState([]);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {

    loadStudents();

  }, []);

  useEffect(() => {

    loadAttendance();

  }, [selectedDate]);

  // LOAD STUDENTS
  const loadStudents = async () => {

    try {

      const data = await getAllStudents();

      setStudents(data || []);

    } catch (error) {

      console.log(error);

    }
  };

  // LOAD ATTENDANCE BY DATE
  const loadAttendance = async () => {

    try {

      const data = await getAttendanceByDate(
        selectedDate
      );

      setAttendance(data || []);

    } catch (error) {

      console.log(error);

    }
  };

  // GET STATUS
  const getStatus = (studentId) => {

    const record = attendance.find(
      (a) => a.student?._id === studentId
    );

    return record?.status || "absent";
  };

  // UPDATE STATUS
  const updateStatus = async (
    studentId,
    status
  ) => {

    try {

      await markAttendance({
        student: studentId,
        date: selectedDate,
        status,
      });

      await loadAttendance();

    } catch (error) {

      console.log(error);

      alert("Failed to update attendance");

    }
  };

  return (
    <div className="container mt-4">

      <h3 className="mb-4">
        Attendance Management
      </h3>

      {/* DATE SELECTOR */}
      <div className="mb-4">

        <label className="form-label">
          Select Date
        </label>

        <input
          type="date"
          className="form-control"
          value={selectedDate}
          onChange={(e) =>
            setSelectedDate(e.target.value)
          }
        />

      </div>

      {/* ATTENDANCE TABLE */}
      <table className="table table-bordered">

        <thead className="table-dark">

          <tr>
            <th>Student</th>
            <th>Date</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {students.map((student) => (

            <tr key={student._id}>

              <td>{student.name}</td>

              <td>{selectedDate}</td>

              <td>

                <select
                  className="form-select"
                  value={getStatus(student._id)}
                  onChange={(e) =>
                    updateStatus(
                      student._id,
                      e.target.value
                    )
                  }
                >

                  <option value="present">
                    Present
                  </option>

                  <option value="absent">
                    Absent
                  </option>

                </select>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default Attendance;