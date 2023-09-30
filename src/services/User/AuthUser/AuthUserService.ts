import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { BadRequestError, NotFoundError } from "../../../helpers/apiErros";
import {
  AuthResponse,
  IUserRepository,
} from "../../../repository/User/IUserRepository";
import { IAuthUserService } from "./protocols";

export class AuthUserService implements IAuthUserService {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(email: string, password: string): Promise<AuthResponse> {
    const findUser = await this.userRepository.findUserByEmail(email);

    if (!findUser) {
      throw new NotFoundError("User not found");
    }

    const passwordMatch = await compare(password, findUser.password);

    if (!passwordMatch) {
      throw new BadRequestError("Email/Password incorrect!");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error();
    }

    const token = sign(
      {
        name: findUser.name,
        email: findUser.email,
      },
      process.env.JWT_SECRET,
      {
        subject: findUser.id,
        expiresIn: "30d",
      }
    );

    return {
      id: findUser.id,
      name: findUser.name,
      email: findUser.email,
      token,
    };
  }
}
