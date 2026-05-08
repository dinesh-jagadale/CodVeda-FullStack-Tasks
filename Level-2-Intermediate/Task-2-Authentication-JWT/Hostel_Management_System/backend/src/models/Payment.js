import mongoose from "mongoose";

const paymentSchema =
  new mongoose.Schema(

    {

      student: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

      },

      amount: {

        type: Number,

        required: true,

        default: 20000,

      },

      date: {

        type: Date,

        default: Date.now,

      },

      status: {

        type: String,

        enum: [
          "due",
          "paid",
        ],

        default: "due",

      },

      paymentMethod: {

        type: String,

        default: "Manual",

      },

    },

    {

      timestamps: true,

    }

  );

const Payment =
  mongoose.model(
    "Payment",
    paymentSchema
  );

export default Payment;