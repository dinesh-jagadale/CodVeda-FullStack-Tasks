//Hostel_Management_System\frontend\src\components\rector\StudentTable.jsx
const StudentTable = ({ students, onDelete }) => {
  return (
    <table className="table table-bordered table-striped">
    <thead className="table-dark">
        <tr>
        <th>Name</th>
        <th>Roll No</th>
        <th>Email</th>
        <th>Room</th>
        <th>Course</th>
        <th>Year</th>
        <th>Fee</th>
        <th>Action</th>
        </tr>
    </thead>
    <tbody>
        {students.map(s => (
        <tr key={s._id}>
            <td>{s.name}</td>
            <td>{s.rollNo}</td>
            <td>{s.email}</td>
            <td>{s.room?.roomNumber || "NA"}</td>
            <td>{s.course}</td>
            <td>{s.year}</td>
            <td>{s.feeStatus}</td>
            <td>
            <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(s._id)}
            >
                Delete
            </button>
            </td>
        </tr>
        ))}
    </tbody>
    </table>

  );
};

export default StudentTable;
