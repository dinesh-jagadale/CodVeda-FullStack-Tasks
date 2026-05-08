//frontend\src\components\payments\PaymentTable.jsx
const verifyPayment = async (id) => {
  await api.put(`/payments/verify/${id}`);
};
const PaymentTable = ({ payments, onVerify }) => {
  return (
    <div>
      <h3>Fee Payments</h3>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Student</th>
            <th>Total Fee</th>
            <th>Paid</th>
            <th>Due</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id}>

            <td>{p.student?.name}</td>

            <td>₹{p.totalFee}</td>

            <td>₹{p.paidAmount}</td>

            <td>₹{p.dueAmount}</td>

            <td>{p.status}</td>

            <td>
              {p.status === "due" && (
                <button
                  onClick={() => onVerify(p._id)}
                >
                Verify
                </button>
                )}
            </td>

          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
