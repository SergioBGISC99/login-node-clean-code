import { RegisterUserDto } from "../../domain/dtos";
import { UserEntity } from "../../domain/entities";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { AuthDatasource } from "../../domain/datasources/auth.datasource";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {}

  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDatasource.register(registerUserDto);
  }
}
