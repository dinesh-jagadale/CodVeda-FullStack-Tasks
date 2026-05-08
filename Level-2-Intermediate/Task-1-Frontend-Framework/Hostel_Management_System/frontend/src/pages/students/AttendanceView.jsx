//frontend\src\pages\students\AttendanceView.jsx
const AttendanceView = ({ records }) => {
  return (
    <>
      <h5>Attendance</h5>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i}>
              <td>{r.date}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AttendanceView;