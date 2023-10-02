import { NotFoundError, UnauthorizedError } from "../../../helpers/apiErros";
import {
  CreateResponse,
  IUserRepository,
  UpdateUserProps,
} from "../../../repository/User/IUserRepository";
import { IUpdateUserService } from "./protocols";

export class UpdateUserService implements IUpdateUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(props: UpdateUserProps): Promise<CreateResponse> {
    if (!props.user_id) {
      throw new UnauthorizedError("Invalid user");
    }

    const findUser = await this.userRepository.findUserById(props.user_id);

    if (!findUser) {
      throw new NotFoundError("User not found");
    }

    const updatedUser = await this.userRepository.updateUser(props);

    return updatedUser;
  }
}
