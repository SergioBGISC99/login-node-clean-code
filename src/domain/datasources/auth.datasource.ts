import { RegisterUserDto, UserEntity } from "..";

export abstract class AuthDatasource {
  //abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
