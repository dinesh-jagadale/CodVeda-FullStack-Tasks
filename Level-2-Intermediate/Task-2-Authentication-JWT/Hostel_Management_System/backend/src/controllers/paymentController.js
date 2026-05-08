import Payment from "../models/Payment.js";

/* =========================
   CREATE PAYMENT
========================= */
export const createPayment =
  async (req, res) => {

    try {

      const {
        student,
        amount,
      } = req.body;

      const payment =
        await Payment.create({

          student,

          amount,

          status: "due",

        });

      res.status(201).json(
        payment
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }
  };

/* =========================
   GET ALL PAYMENTS
========================= */
export const getPayments =
  async (req, res) => {

    try {

      const payments =
        await Payment.find()

          .populate("student")

          .sort({
            createdAt: -1,
          });

      res.json(payments);

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }
  };

/* =========================
   GET MY PAYMENTS
========================= */
export const getMyPayments =
  async (req, res) => {

    try {

      const { email } =
        req.query;

      console.log(
        "EMAIL:",
        email
      );

      const payments =
        await Payment.find()
          .populate("student");

      const myPayments =
        payments.filter(
          (p) =>
            p.student?.email ===
            email
        );

      console.log(
        "MY PAYMENTS:",
        myPayments
      );

      res.json(myPayments);

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,

      });

    }
  };

/* =========================
   PAY FEE
========================= */
export const payFee =
  async (req, res) => {

    try {

      console.log(
        "PAY REQUEST:",
        req.body
      );

      const {
        paymentId,
        paymentMethod,
      } = req.body;

      if (!paymentId) {

        return res.status(400).json({

          message:
            "Payment ID required",

        });

      }

      const payment =
        await Payment.findById(
          paymentId
        );

      if (!payment) {

        return res.status(404).json({

          message:
            "Payment not found",

        });

      }

      payment.status =
        "paid";

      payment.paymentMethod =
        paymentMethod || "Manual";

      await payment.save();

      res.json({

        success: true,

        message:
          "Payment successful",

        payment,

      });

    } catch (error) {

      console.log(
        "PAYMENT ERROR:",
        error
      );

      res.status(500).json({

        message:
          error.message,

      });

    }
  };