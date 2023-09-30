import { AuthResponse } from "../../../repository/User/IUserRepository";

export interface IAuthUserService {
  execute: (name: string, password: string) => Promise<AuthResponse>;
}
