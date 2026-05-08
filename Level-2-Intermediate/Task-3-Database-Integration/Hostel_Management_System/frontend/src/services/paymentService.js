// C:\Users\Dinesh\Documents\Codveda\CodVeda-FullStack-Tasks\Level-2-Intermediate\Task-1-Frontend-Framework\Hostel_Management_System\frontend\src\services\paymentService.js

import api from "./api";

/* RECTOR */
export const createPayment =
  async (paymentData) => {

    const { data } =
      await api.post(
        "/payments",
        paymentData
      );

    return data;
  };

export const getPayments =
  async () => {

    const { data } =
      await api.get("/payments");

    return data;
  };

/* STUDENT */
export const getMyPayments =
  async () => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const { data } =
      await api.get(
        `/payments/me?email=${user.email}`
      );

    return data;
  };

export const payFee =
  async (
    paymentId,
    paymentMethod
  ) => {

    const { data } =
      await api.put(
        "/payments/pay",
        {
          paymentId,
          paymentMethod,
        }
      );

    return data;
  };

  // export const createOrder =
  // async (amount) => {

  //   const { data } =
  //     await api.post(
  //       "/payments/create-order",
  //       { amount }
  //     );

  //   return data;
  // };