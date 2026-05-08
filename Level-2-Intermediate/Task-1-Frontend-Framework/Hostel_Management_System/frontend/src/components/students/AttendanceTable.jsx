//Hostel_Management_System\frontend\src\components\students\AttendanceTable.jsx
const AttendanceTable = ({ records }) => {
  return (
    <div>
      <h3>Attendance</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec) => (
            <tr key={rec._id}>
              <td>{new Date(rec.date).toLocaleDateString()}</td>
              <td>{rec.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
