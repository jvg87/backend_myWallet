import { Type } from "@prisma/client";
import { NotFoundError } from "../../../helpers/apiErros";
import { ITransactionRepository } from "../../../repository/Transaction/ITransactionRepository";
import { IDeleteTransactionService } from "./Protocols";

export class DeleteTransactionService implements IDeleteTransactionService {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(user_id: string, id: string): Promise<void> {
    const findTransaction =
      await this.transactionRepository.findTransactionById(id);

    if (!findTransaction) {
      throw new NotFoundError("Transaction not found");
    }

    await this.transactionRepository.deleteTransactionById(id);

    const findUser = await this.transactionRepository.findUserById(user_id);

    if (!findUser) {
      throw new NotFoundError("User not found");
    }

    const balanceUpdated =
      findTransaction.type === Type.EXPENSE
        ? (findUser.balance += findTransaction.value)
        : (findUser.balance -= findTransaction.value);

    await this.transactionRepository.updateBalance(user_id, balanceUpdated);

    return;
  }
}
