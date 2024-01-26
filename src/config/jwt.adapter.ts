import jwt from "jsonwebtoken";

export class JwtAdapter {
  static async generateToken(
    payload: Object,
    duration: string = "2h"
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, "SEED", { expiresIn: duration }, (error, token) => {
        if (error) resolve(null);
        resolve(token!);
      });
    });
  }

  static validateToken<T>(token: string): Promise<T|null> {
    return new Promise((resolve) => {
      jwt.verify(token, "SEED", (error, decoded) => {
        if (error) resolve(null);
        resolve(decoded as T);
      });
    });
  }
}
