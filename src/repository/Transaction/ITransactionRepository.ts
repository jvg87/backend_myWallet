import { Category, Transaction, Type } from "@prisma/client";
import { CreateResponse } from "../User/IUserRepository";

export interface CreateTransactionProps {
  user_id: string;
  type: Type;
  value: number;
  category_id: string;
  description?: string;
  date: Date;
}

export interface ITransactionRepository {
  createTransaction: (props: CreateTransactionProps) => Promise<Transaction>;
  findUserById: (id: string) => Promise<CreateResponse | null>;
  findCategoryById: (id: string) => Promise<Category | null>;
  updateBalance: (user_id: string, newBalance: number) => Promise<void>;
  findTransactions: (
    user_id: string,
    type?: Type,
    category_id?: string,
    newDate?: Date,
    startDate?: Date,
    endDate?: Date
  ) => Promise<Transaction[]>;
}
