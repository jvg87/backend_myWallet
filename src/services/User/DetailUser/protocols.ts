import { CreateResponse } from "../../../repository/User/IUserRepository";

export interface IDetailUserService {
  execute: (user_id: string) => Promise<CreateResponse>;
}
