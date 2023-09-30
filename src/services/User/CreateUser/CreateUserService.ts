import { BadRequestError } from "../../../helpers/apiErros";
import {
  CreateProps,
  CreateResponse,
  IUserRepository,
} from "../../../repository/User/IUserRepository";
import { ICreateUserService } from "./protocols";

export class CreateUserService implements ICreateUserService {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(props: CreateProps): Promise<CreateResponse> {
    const userAlreadyExists = await this.userRepository.findUserByEmail(
      props.email
    );

    if (userAlreadyExists) {
      throw new BadRequestError("User already exists");
    }

    const newUser = await this.userRepository.create(props);

    return newUser;
  }
}
