import { Transaction } from "@prisma/client";
import { ITransactionRepository } from "../../../repository/Transaction/ITransactionRepository";
import { IGetTransactionsService } from "./Protocols";

export class GetTransactionsService implements IGetTransactionsService {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(user_id: string): Promise<Transaction[]> {
    const transactions =
      await this.transactionRepository.findAllTransactions(user_id);

    return transactions;
  }
}
