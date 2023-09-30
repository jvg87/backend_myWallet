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

export interface BalanceResponse {
  sumRevenues: {
    tag: string;
    saldo: number;
  };
  sumExpenses: {
    tag: string;
    saldo: number;
  };
  balance: {
    tag: string;
    saldo: number;
  };
}

export interface IUserRepository {
  create: (props: CreateProps) => Promise<CreateResponse>;
  findUserByEmail: (email: string) => Promise<IUSer | null>;
  findUserById: (id: string) => Promise<CreateResponse | null>;
  // findBalance: (user_id: string) => Promise<BalanceResponse>;
}
