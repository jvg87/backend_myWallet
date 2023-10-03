import { Transaction, Type } from "@prisma/client";
import { BadRequestError, NotFoundError } from "../../../helpers/apiErros";
import { ITransactionRepository } from "../../../repository/Transaction/ITransactionRepository";
import { ICreateTransactionService, TransactionsExecute } from "./Protocols";

export class CreateTransactionService implements ICreateTransactionService {
  constructor(private readonly transactionRepository: ITransactionRepository) {}
  async execute({
    category_id,
    date,
    description,
    type,
    user_id,
    value,
  }: TransactionsExecute): Promise<Transaction> {
    const findUser = await this.transactionRepository.findUserById(user_id);

    if (!findUser) {
      throw new NotFoundError("User not found");
    }

    const findCategory =
      await this.transactionRepository.findCategoryById(category_id);

    if (!findCategory) {
      throw new NotFoundError("Category not found");
    }

    if (
      (type === Type.EXPENSE && findCategory.type !== Type.EXPENSE) ||
      (type === Type.REVENUE && findCategory.type !== Type.REVENUE)
    ) {
      throw new BadRequestError(
        "Invalid transaction type for the selected category"
      );
    }

    if (type === Type.REVENUE) {
      const newBalance = findUser.balance + Number(value);

      await this.transactionRepository.updateBalance(findUser.id, newBalance);
    }

    if (type === Type.EXPENSE) {
      const newBalance = findUser.balance - Number(value);

      await this.transactionRepository.updateBalance(findUser.id, newBalance);
    }

    const newDate = new Date(date);

    const newTransaction = await this.transactionRepository.createTransaction({
      category_id,
      date: newDate,
      description,
      type,
      user_id,
      value,
    });

    return newTransaction;
  }
}
