import express from "express";
import { googleLogin, googleLoginCallback , generateAccessToken } from "../controller/authController";
const authRoute = express.Router();

authRoute.get("/google", googleLogin);
authRoute.get("/google/callback", googleLoginCallback);
authRoute.get("/refresh_token", generateAccessToken);

export default authRoute;
