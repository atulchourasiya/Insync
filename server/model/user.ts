import mongoose from "mongoose";
import { signJWT, signRefreshToken } from "../middleware/jwt";
export interface User extends mongoose.Document {
  email: string;
  verified_email: boolean;
  googleId: string;
  name: string;
  picture: string;
  role: string;
  status: string;
  refresh_token: string;
  created_at: Date;
  updated_at: Date;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  googleId: { type: String, required: true },
  verified_email: { type: Boolean, required: true },
  name: { type: String, required: true },
  picture: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], required: true },
  status: { type: String, enum: ["active", "inactive"] },
  refresh_token: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

userSchema.methods.generateRefreshToken = function () {
  return signRefreshToken({ id: this.refresh_token });
};

userSchema.methods.generateAccessToken = function () {
  return signJWT({ id: this._id });
};

const User = mongoose.model<User>("User", userSchema);
export default User;
