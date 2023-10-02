import { Transaction, Type } from "@prisma/client";
import { IUSer } from "../../models/User";

export interface CreateProps {
  name: string;
  email: string;
  password: string;
  balance: number;
}

export interface CreateResponse {
  id: string;
  name: string;
  email: string;
  balance: number;
}

export interface AuthResponse {
  id?: string;
  name: string;
  email: string;
  token: string;
}

export interface FindBalanceProps {
  user_id: string;
  type: Type;
  newDate?: Date;
}

export interface UpdateUserProps {
  user_id: string;
  name?: string;
  balance?: number;
}

export interface IUserRepository {
  create: (props: CreateProps) => Promise<CreateResponse>;
  findUserByEmail: (email: string) => Promise<IUSer | null>;
  findUserById: (id: string) => Promise<CreateResponse | null>;
  findBalance: (props: FindBalanceProps) => Promise<Transaction[]>;
  updateUser: (props: UpdateUserProps) => Promise<CreateResponse>;
}
