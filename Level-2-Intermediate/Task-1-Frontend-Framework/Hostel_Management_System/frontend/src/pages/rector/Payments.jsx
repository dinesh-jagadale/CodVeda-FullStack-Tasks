import {
  useEffect,
  useState,
} from "react";

import {
  getPayments,
} from "../../services/paymentService";

const Payments = () => {

  const [payments, setPayments] =
    useState([]);

  useEffect(() => {

    loadPayments();

  }, []);

  const loadPayments =
    async () => {

      try {

        const data =
          await getPayments();

        setPayments(data || []);

      } catch (error) {

        console.log(error);

      }
    };

  return (
    <div className="container mt-4">

      <h3>
        Student Payments
      </h3>

      <table className="table table-bordered mt-4">

        <thead className="table-dark">

          <tr>

            <th>
              Student
            </th>

            <th>
              Amount
            </th>

            <th>
              Date
            </th>

            <th>
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {payments.map((p) => (

            <tr key={p._id}>

              <td>
                {p.student?.name}
              </td>

              <td>
                ₹{p.amount}
              </td>

              <td>
                {new Date(
                  p.date
                ).toLocaleDateString()}
              </td>

              <td>

                {p.status === "paid" ? (

                  <span className="badge bg-success">
                    Paid
                  </span>

                ) : (

                  <span className="badge bg-warning text-dark">
                    Due
                  </span>

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default Payments;