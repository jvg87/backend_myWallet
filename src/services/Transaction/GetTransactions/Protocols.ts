import { Transaction, Type } from "@prisma/client";

export interface GetTransactionsServiceProps {
  user_id: string;
  type?: Type;
  category_id?: string;
  date?: string;
  year?: string;
  month?: string;
}

export interface IGetTransactionsService {
  execute: (props: GetTransactionsServiceProps) => Promise<Transaction[]>;
}
