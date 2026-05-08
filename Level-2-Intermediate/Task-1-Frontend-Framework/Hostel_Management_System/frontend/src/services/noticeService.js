//frontend\src\services\noticeService.js
import api from "./api";

export const getNotices = async () => {
  const { data } = await api.get("/notices");
  return data;
};

export const createNotice = async (notice) => {
  const { data } = await api.post("/notices", notice);
  return data;
};
