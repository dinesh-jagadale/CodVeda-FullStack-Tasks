//frontend\src\components\rector\MarkAttendanceForm.jsx
import { useState } from "react";

const MarkAttendanceForm = ({ students, onMark }) => {
  const [studentId, setStudentId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("present");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!studentId || !date) {
      alert("Select student and date");
      return;
    }

    onMark({ studentId, date, status });

    setStudentId("");
    setDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <h3>Mark Attendance</h3>

      <select value={studentId} onChange={(e) => setStudentId(e.target.value)}>
        <option value="">Select Student</option>
        {students.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name} ({s.rollNo})
          </option>
        ))}
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="present">Present</option>
        <option value="absent">Absent</option>
      </select>

      <button>Mark</button>
    </form>
  );
};

export default MarkAttendanceForm;
