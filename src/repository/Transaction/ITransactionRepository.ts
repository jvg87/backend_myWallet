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
  findAllTransactions: (user_id: string) => Promise<Transaction[]>;
  findTransactionsByType: (
    user_id: string,
    type: Type
  ) => Promise<Transaction[]>;
  findTransactionsByCategory: (category_id: string) => Promise<Transaction[]>;
}
