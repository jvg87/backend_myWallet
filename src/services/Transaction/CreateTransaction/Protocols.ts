import { Transaction, Type } from "@prisma/client";

export interface TransactionsExecute {
  user_id: string;
  type: Type;
  value: number;
  category_id: string;
  description?: string;
  date?: string;
}

export interface ICreateTransactionService {
  execute: (props: TransactionsExecute) => Promise<Transaction>;
}
