import { Type } from "@prisma/client";
import { NotFoundError } from "../../../helpers/apiErros";
import { ITransactionRepository } from "../../../repository/Transaction/ITransactionRepository";
import { IUpdateTransactionService, UpdateServiceProps } from "./Protocols";

export class UpdateTransactionService implements IUpdateTransactionService {
  constructor(private readonly transactionRepository: ITransactionRepository) {}
  async execute({
    id,
    user_id,
    category_id,
    date,
    description,
    value,
  }: UpdateServiceProps): Promise<void> {
    const findTransaction =
      await this.transactionRepository.findTransactionById(id);

    if (!findTransaction) {
      throw new NotFoundError("Transaction not found");
    }

    const newDate = date ? new Date(date) : undefined;

    await this.transactionRepository.updateTransactionById({
      id,
      category_id,
      date: newDate,
      description,
      value,
    });

    const findUser = await this.transactionRepository.findUserById(user_id);

    if (!findUser) {
      throw new NotFoundError("User not found");
    }

    let balanceUpdated: number;

    if (findTransaction.type === Type.EXPENSE) {
      if (findTransaction.value < Number(value)) {
        const difference = Number(value) - findTransaction.value;
        balanceUpdated = findUser.balance - difference;
      } else if (findTransaction.value > Number(value)) {
        const difference = findTransaction.value - Number(value);
        balanceUpdated = findUser.balance + difference;
      } else {
        balanceUpdated = findUser.balance;
      }
    } else {
      if (findTransaction.value < Number(value)) {
        const difference = Number(value) - findTransaction.value;
        balanceUpdated = findUser.balance += difference;
      } else if (findTransaction.value > Number(value)) {
        const difference = findTransaction.value - Number(value);
        balanceUpdated = findUser.balance -= difference;
      } else {
        balanceUpdated = findUser.balance;
      }
    }

    await this.transactionRepository.updateBalance(user_id, balanceUpdated);
  }
}
