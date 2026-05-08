//C:\Users\Dinesh\Documents\Codveda\CodVeda-FullStack-Tasks\Level-2-Intermediate\Task-1-Frontend-Framework\Hostel_Management_System\frontend\src\services\api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Attach token automatically
api.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// ✅ OPTIONAL: auto logout on 401
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized → Logging out");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;