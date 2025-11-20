import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Hash password before saving
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare passwords
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
