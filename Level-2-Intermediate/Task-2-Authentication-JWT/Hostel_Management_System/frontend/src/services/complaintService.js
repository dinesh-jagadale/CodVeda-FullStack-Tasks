import api from "./api";

/* =========================
   STUDENT - CREATE COMPLAINT
========================= */
export const createComplaint = async (
  complaintData
) => {

  const { data } = await api.post(
    "/complaints",
    complaintData
  );

  return data;
};

/* =========================
   STUDENT - MY COMPLAINTS
========================= */
export const getMyComplaints = async () => {

  const { data } = await api.get(
    "/complaints/me"
  );

  return data;
};

/* =========================
   RECTOR - ALL COMPLAINTS
========================= */
export const getAllComplaints = async () => {

  const { data } = await api.get(
    "/complaints/all"
  );

  return data;
};

/* =========================
   RECTOR - UPDATE STATUS
========================= */
export const updateComplaintStatus = async (
  id,
  status
) => {

  const { data } = await api.put(
    `/complaints/${id}`,
    { status }
  );

  return data;
};