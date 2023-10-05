import { Transaction } from "@prisma/client";
import { NotFoundError } from "../../../helpers/apiErros";
import { getMonthNumber } from "../../../helpers/getMonth";
import { ITransactionRepository } from "../../../repository/Transaction/ITransactionRepository";
import {
  GetTransactionsServiceProps,
  GetTransactionsServiceResponse,
  IGetTransactionsService,
} from "./Protocols";

export class GetTransactionsService implements IGetTransactionsService {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute({
    skip,
    take,
    user_id,
    id,
    category_id,
    type,
    date,
    year,
    month,
  }: GetTransactionsServiceProps): Promise<
    GetTransactionsServiceResponse | Transaction | null
  > {
    if (id) {
      const transaction =
        await this.transactionRepository.findTransactionById(id);

      if (!transaction) {
        throw new NotFoundError("Transaction not found");
      }

      return transaction;
    }

    let startDate: Date | undefined;
    let endDate: Date | undefined;

    const newDate = date ? new Date(date) : undefined;

    if (month) {
      const monthNumber = Number(getMonthNumber(month));
      const realYear = Number(year || new Date().getFullYear());
      startDate = new Date(realYear, monthNumber - 1, 1);
      endDate = new Date(realYear, monthNumber, 0);
    }

    if (year) {
      const realYear = year || new Date().getFullYear();
      startDate = new Date(`${realYear}-01-01`);
      endDate = new Date(`${realYear}-12-31`);
    }

    const transactions = await this.transactionRepository.findTransactions({
      skip,
      take,
      user_id,
      category_id,
      type,
      endDate,
      newDate,
      startDate,
    });

    return transactions;
  }
}
