import {
  CreateResponse,
  UpdateUserProps,
} from "../../../repository/User/IUserRepository";

export interface IUpdateUserService {
  execute: (props: UpdateUserProps) => Promise<CreateResponse>;
}
