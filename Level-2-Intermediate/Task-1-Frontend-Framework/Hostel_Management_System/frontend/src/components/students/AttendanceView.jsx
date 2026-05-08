//Hostel_Management_System\frontend\src\components\students\AttendanceView.jsx
const AttendanceView = ({ records }) => {
  return (
    <div>
      <h3>My Attendance</h3>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r._id}>
              <td>{new Date(r.date).toLocaleDateString()}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceView;
