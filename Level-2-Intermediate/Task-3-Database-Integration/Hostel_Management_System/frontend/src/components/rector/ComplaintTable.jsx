//frontend\src\components\rector\ComplaintTable.jsx
const ComplaintTable = ({ complaints, onUpdate }) => (
  <div>
    <h3>Complaints</h3>
    <table border="1">
      <thead>
        <tr>
          <th>Student</th>
          <th>Subject</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {complaints.map(c=>(
          <tr key={c._id}>
            <td>{c.student.name}</td>
            <td>{c.subject}</td>
            <td>{c.status}</td>
            <td>
              <select value={c.status}  onChange={(e) => onUpdate(c._id, e.target.value)}>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ComplaintTable;
