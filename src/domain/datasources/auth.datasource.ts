import { RegisterUserDto } from "../dtos";
import { UserEntity } from "../entities";

export abstract class AuthDatasource {
  //abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
