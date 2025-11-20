import express from "express";
import Todo from "../models/Todo.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

/*
  CREATE TODO
  Only logged-in users can create. 
  userId is automatically taken from auth middleware.
*/
router.post("/", auth, async (req, res) => {
  try {
    const todo = await Todo.create({
      task: req.body.task,
      status: false,
      userId: req.user,
      username: req.username
    });

    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: "Failed to create todo" });
  }
});


/*
  GET ALL TODOS
  Only get todos that belong to logged-in user
*/
router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch todos" });
  }
});

/*
  UPDATE TODO (complete/undo)
*/
router.put("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user }, // Ensure only owner can update
      { status: req.body.status },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: "Failed to update todo" });
  }
});

/*
  DELETE TODO
*/
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user
    });

    if (!deleted) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete todo" });
  }
});

export default router;
