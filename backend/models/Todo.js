import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
    status: { type: Boolean, default: false },

    // Owner of todo
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    username: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);
