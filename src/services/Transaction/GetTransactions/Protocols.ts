import { Transaction, Type } from "@prisma/client";

export interface GetTransactionsServiceProps {
  skip: number;
  take: number;
  user_id: string;
  type?: Type;
  category_id?: string;
  date?: string;
  year?: string;
  month?: string;
}

export interface GetTransactionsServiceResponse {
  total: number;
  totalPages: number;
  transactions: Transaction[];
}

export interface IGetTransactionsService {
  execute: (
    props: GetTransactionsServiceProps
  ) => Promise<GetTransactionsServiceResponse>;
}
