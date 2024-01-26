import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import {
  AuthDatasource,
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {
      const userExist = await UserModel.findOne({ email });
      if (!userExist) throw CustomError.badRequest("User does not exist");

      const validPassword = this.comparePassword(password, userExist.password);

      if (!validPassword) throw CustomError.badRequest("Invalid password");

      return UserMapper.userEntityFromObject(userExist);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      // 1. Verificar que el correo existe
      const emailExist = await UserModel.findOne({ email });
      if (emailExist) {
        throw CustomError.badRequest("User already exists");
      }

      // 2. Hash de contraseña
      const hashedPassword = this.hashPassword(password);

      // 3. Mapear respuesta a entidad
      const user = await UserModel.create({
        name: name,
        email: email,
        password: hashedPassword,
      });

      // 4. Guardar en base de datos
      await user.save();
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
