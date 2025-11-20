import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const nav = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // if logged in already → redirect
  useEffect(() => {
    if (localStorage.getItem("token")) {
      nav("/dashboard");
    }
  }, []);

  const register = async () => {
    setError("");
    setSuccess("");

    if (!form.username || !form.password) {
      return setError("Please enter a username and password.");
    }

    try {
      await api.post("/auth/register", form);
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => nav("/login"), 1500);
    } catch (e) {
      setError(e.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

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

      <button style={styles.btn} onClick={register}>
        Register
      </button>

      <p style={{ marginTop: "10px" }}>
        Already have an account? <Link to="/login">Login</Link>
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
    background: "#c95656ff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  }
};
