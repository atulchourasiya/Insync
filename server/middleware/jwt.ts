import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import ApiError from "./apiError";

interface JwtPayloadWithId extends JwtPayload {
  id: string;
}

export const signJWT = (payload: JwtPayloadWithId): string => {
  const options: SignOptions = { expiresIn: "1h" };
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
  return jwt.sign(payload, ACCESS_TOKEN_SECRET , options);
};

export const verifyJWT = (token: string) => {
  try {
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
    const decodedToken = jwt.verify(
      token,
      ACCESS_TOKEN_SECRET
    ) as JwtPayloadWithId;

    return decodedToken;
  } catch (error) {
    throw new ApiError(401, (error as Error).message || "Invalid access token");
  }
};

export const signRefreshToken = (payload: JwtPayloadWithId): string => {
  const options: SignOptions = { expiresIn: "1d" };
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, options);
};

export const verifyRefreshToken = (token: string): JwtPayloadWithId => {
  try {
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtPayloadWithId;
  } catch (error) {
    throw new ApiError(401, "Invalid refresh token");
  }
};
