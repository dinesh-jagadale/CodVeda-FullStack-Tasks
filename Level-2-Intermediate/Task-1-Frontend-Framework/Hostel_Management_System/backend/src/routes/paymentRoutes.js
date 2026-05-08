import express from "express";

import {

  createPayment,

  getPayments,

  getMyPayments,

  payFee,

} from "../controllers/paymentController.js";

const router =
  express.Router();

router.post(
  "/",
  createPayment
);

router.get(
  "/",
  getPayments
);

router.get(
  "/me",
  getMyPayments
);

router.put(
  "/pay",
  payFee
);

export default router;