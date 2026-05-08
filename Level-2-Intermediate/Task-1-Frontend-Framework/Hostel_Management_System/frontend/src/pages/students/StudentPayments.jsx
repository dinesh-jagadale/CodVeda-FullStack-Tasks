import {
  useEffect,
  useState,
} from "react";

import {
  getMyPayments,
  payFee,
} from "../../services/paymentService";

const StudentPayments = () => {

  const [payments, setPayments] =
    useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [selectedPayment,
    setSelectedPayment] =
    useState(null);

  useEffect(() => {

    loadPayments();

  }, []);

  // LOAD PAYMENTS
  const loadPayments =
    async () => {

      try {

        const data =
          await getMyPayments();

        setPayments(data || []);

      } catch (error) {

        console.log(error);

      }
    };

  // OPEN MODAL
  const openPaymentModal =
    (payment) => {

      setSelectedPayment(payment);

      setShowModal(true);
    };

  // CONFIRM PAYMENT
  const confirmPayment =
    async () => {

      try {

        await payFee(
          selectedPayment._id,
          "Manual"
        );

        alert(
          "Fee Paid Successfully"
        );

        setShowModal(false);

        loadPayments();

      } catch (error) {

        console.log(error);

        alert(
          "Payment Failed"
        );

      }
    };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        Fee Payments
      </h2>

      {payments.map((p) => (

        <div
          className="card shadow mt-3"
          key={p._id}
        >

          <div className="card-body">

            <p>

              <strong>
                Total Fee:
              </strong>

              ₹{p.amount || 20000}

            </p>

            <p>

              <strong>
                Paid:
              </strong>

              {p.status === "paid"
                ? `₹${p.amount || 20000}`
                : "None"}

            </p>

            <p>

              <strong>
                Due:
              </strong>

              {p.status === "due"
                ? `₹${p.amount || 20000}`
                : "None"}

            </p>

            <p>

              <strong>
                Status:
              </strong>

              {p.status === "paid" ? (

                <span className="badge bg-success ms-2">
                  Paid
                </span>

              ) : (

                <span className="badge bg-warning text-dark ms-2">
                  Due
                </span>

              )}

            </p>

            {p.status === "due" && (

              <button
                className="btn btn-success mt-3"
                onClick={() =>
                  openPaymentModal(p)
                }
              >
                Pay Now
              </button>

            )}

          </div>

        </div>

      ))}

      {/* PAYMENT MODAL */}
      {showModal && selectedPayment && (

        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            backgroundColor:
              "rgba(0,0,0,0.5)",
          }}
        >

          <div className="modal-dialog">

            <div className="modal-content">

              {/* HEADER */}
              <div className="modal-header">

                <h4 className="modal-title">
                  Hostel Fee Payment
                </h4>

                <button
                  className="btn-close"
                  onClick={() =>
                    setShowModal(false)
                  }
                ></button>

              </div>

              {/* BODY */}
              <div className="modal-body">

                <p>

                  <strong>
                    Institute Name:
                  </strong>

                  {" "}
                  SVPM COE

                </p>

                <p>

                  <strong>
                    Account No:
                  </strong>

                  {" "}
                  1234567890

                </p>

                <p>

                  <strong>
                    Hostel Fee:
                  </strong>

                  {" "}
                  ₹{
                    selectedPayment.amount
                    || 20000
                  }

                </p>

              </div>

              {/* FOOTER */}
              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  className="btn btn-success"
                  onClick={
                    confirmPayment
                  }
                >
                  Pay
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default StudentPayments;