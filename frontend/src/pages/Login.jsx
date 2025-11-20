import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const nav = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      nav("/dashboard");
    }
  }, []);

  const login = async () => {
    setError("");

    if (!form.username || !form.password) {
      return setError("Please enter both username and password.");
    }

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);

      nav("/dashboard");

    } catch (e) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Username"
        style={styles.input}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        style={styles.input}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button style={styles.btn} onClick={login}>Login</button>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

const styles = {
  container: {
    margin: "50px auto",
    width: "300px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "8px",
    margin: "8px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  btn: {
    width: "100%",
    padding: "10px",
    background: "#ff3e3eff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
};
