import { IUSer } from "../../models/User";

export interface CreateProps {
  name: string;
  email: string;
  password: string;
  balance: number;
}

export interface IUserRepository {
  create: (props: CreateProps) => Promise<Omit<IUSer, "password">>;
  findUserByEmail: (email: string) => Promise<IUSer | null>;
}
