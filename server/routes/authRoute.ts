import express from "express";
import { googleLogin, googleLoginCallback , generateAccessToken , getUser } from "../controller/authController";
import isAuthenticate from "../middleware/isAuthenticate";
const authRoute = express.Router();
authRoute.get("/google", googleLogin);
authRoute.get("/google/callback", googleLoginCallback);
authRoute.post("/refresh_token", generateAccessToken);
authRoute.post("/get_user",isAuthenticate, getUser )

export default authRoute;
