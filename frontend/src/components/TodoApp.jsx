import { useEffect, useState } from "react";
import api from "../api";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const load = async () => {
    const res = await api.get("/todos");
    setTodos(res.data);
  };

  const add = async () => {
    if (!task) return;
    await api.post("/todos", { task });
    setTask("");
    load();
  };

  const toggle = async (id, status) => {
    await api.put(`/todos/${id}`, { status: !status });
    load();
  };

  const del = async (id) => {
    await api.delete(`/todos/${id}`);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add task..."
      />
      <button onClick={add}>Add</button>

      <ul>
        {todos.map((t) => (
          <li key={t._id}>
            <span
              style={{ textDecoration: t.status ? "line-through" : "none" }}
            >
              {t.task}
            </span>
            <button onClick={() => toggle(t._id, t.status)}>
              {t.status ? "Undo" : "Complete"}
            </button>
            <button onClick={() => del(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
