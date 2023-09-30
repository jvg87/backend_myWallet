import { NotFoundError, UnauthorizedError } from "../../../helpers/apiErros";
import {
  CreateResponse,
  IUserRepository,
} from "../../../repository/User/IUserRepository";
import { IDetailUserService } from "./protocols";

export class DetailUserService implements IDetailUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(user_id: string): Promise<CreateResponse> {
    if (!user_id) {
      throw new UnauthorizedError("Invalid user");
    }
    const user = await this.userRepository.findUserById(user_id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }
}
