import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyJWT } from "./jwt";
import asyncErrorHandler from "./asyncErrorHandler";

const isAuthenticate = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).send("Unauthorized request");
      return;
    }
    try {
      const user = verifyJWT(token);
      req.user = user;
      next();
    } catch (error) {
      res.status(401).send("Unauthorized request");
    }
  }
);

export default isAuthenticate;