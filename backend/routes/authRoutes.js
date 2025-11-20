import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    await User.create(req.body);
    res.json({ message: "User registered" });
  } catch (e) {
    res.status(400).json({ message: "User already exists" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await user.comparePassword(password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET
  );

  res.json({
    token,
    username: user.username   // <-- IMPORTANT (Frontend uses this)
  });
});

export default router;
