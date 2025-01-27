import asyncErrorHandler from "../middleware/asyncErrorHandler";
import { Request, Response, NextFunction } from "express";
import axios from "axios";
import User from "../model/user";
import { verifyRefreshToken } from "../middleware/jwt";
interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}

export const googleLogin = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const scope = [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" ");
    const params: Record<string, string> = {
      client_id: process.env.CLIENT_ID as string,
      redirect_uri: `${process.env.BASE_URL}/auth/google/callback` as string,
      response_type: "code",
      scope: scope,
      access_type: "offline",
      prompt: "consent",
    };
    const query = new URLSearchParams(params).toString();
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${query}`;
    res.json({ redirect_url: authUrl });
  }
);

export const googleLoginCallback = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const code = req.query.code as string;
    if (!code) {
      res.status(400).send("Authorization code not found");
      return;
    }

    const params: Record<string, string> = {
      code: code,
      client_id: process.env.CLIENT_ID as string,
      client_secret: process.env.SECRET_KEY as string,
      redirect_uri: `${process.env.BASE_URL}/auth/google/callback`,
      grant_type: "authorization_code",
    } as const;

    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams(params),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const { access_token, refresh_token } = response.data;

    const userResponse = await axios.get<GoogleUser>(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    const userInfo = userResponse.data;

    const user = await User.findOneAndUpdate(
      { email: userInfo.email },
      {
        googleId: userInfo.id,
        email: userInfo.email,
        verified_email: userInfo.verified_email,
        name: userInfo.given_name + " " + userInfo.family_name,
        picture: userInfo.picture,
        role: "user",
        status: "active",
        refresh_token: refresh_token,
      },
      { upsert: true, new: true }
    );

    const user_access_token = user.generateAccessToken();
    const user_refresh_token = user.generateRefreshToken();
    res
      .cookie("token", user_access_token, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
      })
      .cookie("refresh_token", user_refresh_token, {
        httpOnly: true,
        sameSite: "strict",
        path: "/auth/refresh_token",
        secure: true,
      })
      .redirect(process.env.CLIENT_URL as string);
  }
);

export const generateAccessToken = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refresh_token } = req.cookies;
    if (!refresh_token) {
      res.status(401).send("Unauthorized request");
      return;
    }
    const user_refresh_token = verifyRefreshToken(refresh_token);

    if (!user_refresh_token) {
      res.status(401).send("Unauthorized request");
      return;
    }
    const user = await User.findOne({
      refresh_token: user_refresh_token.id,
    });

    if (!user) {
      res.status(401).send("Unauthorized request");
      return;
    }

    const user_access_token = user.generateAccessToken();
    res
      .cookie("token", user_access_token, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
      })
      .send();
  }
);

export const getUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.user;
    const user = await User.findById({ _id });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    const { email, name, picture, role, status } = user;
    res.json({ email, name, picture, role, status });
  }
);
