import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", data);

      // ✅ FIX: store token separately
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      // redirect
      if (data.role === "student") {

        navigate("/student");

    } else {

      navigate("/rector");

    }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <div className="card shadow">
        <div className="card-body">

          <h3 className="mb-3 text-center">Login</h3>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="btn btn-primary w-100">Login</button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;