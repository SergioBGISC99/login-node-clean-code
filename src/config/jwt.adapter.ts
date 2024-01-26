import jwt from "jsonwebtoken";
import { envs } from "./envs.adapter";

const secret = envs.JWT_SEED;

export class JwtAdapter {
  static async generateToken(
    payload: Object,
    duration: string = "2h"
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, secret, { expiresIn: duration }, (error, token) => {
        if (error) resolve(null);
        resolve(token!);
      });
    });
  }

  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) resolve(null);
        resolve(decoded as T);
      });
    });
  }
}
