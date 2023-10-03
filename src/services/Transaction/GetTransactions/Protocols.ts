import { Transaction } from "@prisma/client";

export interface IGetTransactionsService {
  execute: (user_id: string) => Promise<Transaction[]>;
}
