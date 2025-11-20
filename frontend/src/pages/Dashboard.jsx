import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TodoApp from "../components/TodoApp";

export default function Dashboard() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("username");

    if (!token) {
      nav("/login");
      return;
    }

    if (user) setUsername(user);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    nav("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Welcome, {username}! 👋</h1>

        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>

      <hr style={styles.line} />

      <div style={{ marginTop: "25px" }}>
        <TodoApp />
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "92%",
    maxWidth: "800px",
    margin: "30px auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: "34px",
    fontWeight: "600",
    margin: 0,
  },

  logoutBtn: {
    padding: "12px 25px",
    fontSize: "18px",
    background: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  line: {
    marginTop: "15px",
    border: "0.5px solid #ccc",
  },
};
