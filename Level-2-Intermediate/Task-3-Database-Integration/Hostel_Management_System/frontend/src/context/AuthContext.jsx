import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  // Restore login after refresh
  useEffect(() => {

    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) return;

    setUser(JSON.parse(storedUser));

    axios.get("http://localhost:5000/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .catch(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    });

  }, []);

  // Login
  const login = async (email, password) => {

    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password }
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data));

    setUser(res.data);

    return res.data;
  };

  // Register
  const register = async (name, email, password) => {

    await axios.post(
      "http://localhost:5000/api/auth/register",
      { name, email, password }
    );
  };

  // Logout
  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);