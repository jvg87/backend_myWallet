import {
  CreateProps,
  CreateResponse,
} from "../../../repository/User/IUserRepository";

export interface ICreateUserService {
  execute: (props: CreateProps) => Promise<CreateResponse>;
}
