//Hostel_Management_System\frontend\src\components\students\FeeStatus.jsx
const FeeStatus = ({ payments }) => {
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <h3>Fee Status</h3>
      <p><b>Total Paid:</b> ₹{totalPaid}</p>

      <ul>
        {payments.map((p) => (
          <li key={p._id}>
            ₹{p.amount} – {p.method} – {p.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeeStatus;
