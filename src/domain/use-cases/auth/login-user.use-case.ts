import { AuthRepository, LoginUserDto } from "../..";

interface UserLogged {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<UserLogged>;
}

export class LoginUser implements LoginUserUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(loginUserDto: LoginUserDto): Promise<UserLogged> {
    const user = await this.authRepository.login(loginUserDto);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
