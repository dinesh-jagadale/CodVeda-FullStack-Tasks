//frontend\src\services\studentService.js
import api from "./api";

export const getMyProfile = async () => {
  const { data } = await api.get("/users/me");
  return data;
};

export const getMyAttendance = async () => {
  const { data } = await api.get("/attendance/me");
  return data;
};

export const getMyPayments = async () => {
  const { data } = await api.get("/payments/me");
  return data;
};
