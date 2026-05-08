import api from "./api";

/* =========================
   GET ALL STUDENTS
========================= */
export const getAllStudents = async () => {
  const { data } = await api.get("/rector/students/all");
  return data;
};

/* =========================
   APPROVE STUDENT
========================= */
export const approveStudentWithRoom = async (
  studentId,
  roomId
) => {

  const { data } = await api.post(
    "/rector/students/approve",
    {
      studentId,
      roomId,
    }
  );

  return data;
};

/* =========================
   DELETE STUDENT
========================= */
export const deleteStudent = async (id) => {

  const { data } = await api.delete(
    `/rector/students/${id}`
  );

  return data;
};

/* =========================
   UPDATE STUDENT
========================= */
export const updateStudent = async (
  id,
  studentData
) => {

  const { data } = await api.put(
    `/rector/students/${id}`,
    studentData
  );

  return data;
};

/* =========================
   CREATE STUDENT
========================= */
export const createStudent = async (
  studentData
) => {

  const { data } = await api.post(
    "/rector/students",
    studentData
  );

  return data;
};