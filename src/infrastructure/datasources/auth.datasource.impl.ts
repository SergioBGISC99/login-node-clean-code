import { UserModel } from "../../data/mongodb";
import {
  AuthDatasource,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from "../../domain";

export class AuthDatasourceImpl implements AuthDatasource {
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      // 1. Verificar que el correo existe
      const emailExist = await UserModel.findOne({ email });
      if (emailExist) {
        throw CustomError.badRequest("User already exists");
      }

      // 2. Hash de contraseña
      const user = await UserModel.create({
        name: name,
        email: email,
        password: password,
      });

      await user.save();
      // 3. Mapear respuesta a entidad

      // 4. Guardar en base de datos
      return new UserEntity(user.id, name, email, password, user.roles);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
