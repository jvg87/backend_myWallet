import { IUSer } from "../../../models/User";
import { CreateProps } from "../../../repository/User/IUserRepository";

export interface ICreateUserService {
  execute: (props: CreateProps) => Promise<IUSer>;
}
