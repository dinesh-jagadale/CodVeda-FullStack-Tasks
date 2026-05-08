//frontend\src\services\authService.js
import api from "./api";

export const loginUser = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data; // { token, role, ... }
};


export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};
