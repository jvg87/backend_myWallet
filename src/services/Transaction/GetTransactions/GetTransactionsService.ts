import { Transaction } from "@prisma/client";
import { ITransactionRepository } from "../../../repository/Transaction/ITransactionRepository";
import {
  GetTransactionsServiceProps,
  IGetTransactionsService,
} from "./Protocols";

export class GetTransactionsService implements IGetTransactionsService {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute({
    user_id,
    category_id,
    type,
    date,
  }: GetTransactionsServiceProps): Promise<Transaction[]> {
    if (date) {
      const newDate = new Date(date);

      if (type) {
        const transactions = await this.transactionRepository.findTransactions(
          user_id,
          type,
          undefined,
          newDate
        );
        return transactions;
      }

      if (category_id) {
        const transactions = await this.transactionRepository.findTransactions(
          user_id,
          undefined,
          category_id,
          newDate
        );
        return transactions;
      }
      const transactions = await this.transactionRepository.findTransactions(
        user_id,
        undefined,
        undefined,
        newDate
      );

      return transactions;
    }

    if (type) {
      const transactions = await this.transactionRepository.findTransactions(
        user_id,
        type
      );
      return transactions;
    }

    if (category_id) {
      const transactions = await this.transactionRepository.findTransactions(
        user_id,
        undefined,
        category_id
      );
      return transactions;
    }
    const transactions =
      await this.transactionRepository.findTransactions(user_id);

    return transactions;
  }
}
