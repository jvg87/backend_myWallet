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
  }: GetTransactionsServiceProps): Promise<Transaction[]> {
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
