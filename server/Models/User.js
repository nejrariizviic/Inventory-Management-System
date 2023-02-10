import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  employee_id: { type: Schema.Types.ObjectId, ref: "Employee" },
  username: String,
  password: String,
  role: String,
});

const User = mongoose.model("User", userSchema);

export default User;
