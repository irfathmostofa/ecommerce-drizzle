import jwt from "jsonwebtoken";

export function signJWT(payload: object) {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d" });
}

export function verifyJWT<T>(token: string): T {
  return jwt.verify(token, process.env.JWT_SECRET!) as T;
}
