import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dtos";
import { AuthRepository } from "../../domain/repositories/auth.repository";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  registerUser = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.authRepository
      .register(registerDto!)
      .then((user) => res.json(user))
      .catch((error) => res.status(500).json(error));
  };
  loginUser = (req: Request, res: Response) => {
    res.json("loginUser controller");
  };
}
