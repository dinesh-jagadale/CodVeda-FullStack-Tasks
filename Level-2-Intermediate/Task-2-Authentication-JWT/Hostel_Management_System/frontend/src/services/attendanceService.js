import api from "./api";

/* =========================
   GET ATTENDANCE BY DATE
========================= */
export const getAttendanceByDate = async (
  date
) => {

  const { data } = await api.get(
    `/attendance/date/${date}`
  );

  return data;
};

/* =========================
   MARK ATTENDANCE
========================= */
export const markAttendance = async (
  attendanceData
) => {

  const { data } = await api.post(
    "/attendance",
    attendanceData
  );

  return data;
};

/* =========================
   STUDENT ATTENDANCE
========================= */
export const getMyAttendance = async () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const { data } = await api.get(
    `/attendance/me?email=${user.email}`
  );

  return data;
};