import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import {
  AuthDatasource,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from "../../domain";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      // 1. Verificar que el correo existe
      const emailExist = await UserModel.findOne({ email });
      if (emailExist) {
        throw CustomError.badRequest("User already exists");
      }

      // 2. Hash de contraseña

      // 3. Mapear respuesta a entidad
      const user = await UserModel.create({
        name: name,
        email: email,
        password: this.hashPassword(password),
      });

      // 4. Guardar en base de datos
      await user.save();
      return new UserEntity(user.id, name, email, password, user.roles);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
