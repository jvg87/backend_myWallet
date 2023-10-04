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
    category_id,
    type,
    date,
    year,
    month,
  }: GetTransactionsServiceProps): Promise<GetTransactionsServiceResponse> {
    if (date) {
      const newDate = new Date(date);

      if (type) {
        const transactions = await this.transactionRepository.findTransactions(
          skip,
          take,
          user_id,
          type,
          undefined,
          newDate
        );
        return transactions;
      }

      if (category_id) {
        const transactions = await this.transactionRepository.findTransactions(
          skip,
          take,
          user_id,
          undefined,
          category_id,
          newDate
        );
        return transactions;
      }
      const transactions = await this.transactionRepository.findTransactions(
        skip,
        take,
        user_id,
        undefined,
        undefined,
        newDate
      );

      return transactions;
    }

    if (month) {
      const monthNumber = Number(getMonthNumber(month));
      const year = new Date().getFullYear();
      const startDate = new Date(year, monthNumber - 1, 1);
      const endDate = new Date(year, monthNumber, 0);

      if (type) {
        const transactions = await this.transactionRepository.findTransactions(
          skip,
          take,
          user_id,
          type,
          undefined,
          undefined,
          startDate,
          endDate
        );
        return transactions;
      }

      if (category_id) {
        const transactions = await this.transactionRepository.findTransactions(
          skip,
          take,
          user_id,
          undefined,
          category_id,
          undefined,
          startDate,
          endDate
        );
        return transactions;
      }
      const transactions = await this.transactionRepository.findTransactions(
        skip,
        take,
        user_id,
        undefined,
        undefined,
        undefined,
        startDate,
        endDate
      );

      return transactions;
    }

    if (year) {
      const realYear = year ? year : new Date().getFullYear();

      const startDate = new Date(`${realYear}-01-01`);
      const endDate = new Date(`${realYear}-12-31`);

      if (type) {
        const transactions = await this.transactionRepository.findTransactions(
          skip,
          take,
          user_id,
          type,
          undefined,
          undefined,
          startDate,
          endDate
        );
        return transactions;
      }

      if (category_id) {
        const transactions = await this.transactionRepository.findTransactions(
          skip,
          take,
          user_id,
          undefined,
          category_id,
          undefined,
          startDate,
          endDate
        );
        return transactions;
      }
      const transactions = await this.transactionRepository.findTransactions(
        skip,
        take,
        user_id,
        undefined,
        undefined,
        undefined,
        startDate,
        endDate
      );

      return transactions;
    }

    if (type) {
      const transactions = await this.transactionRepository.findTransactions(
        skip,
        take,
        user_id,
        type
      );
      return transactions;
    }

    if (category_id) {
      const transactions = await this.transactionRepository.findTransactions(
        skip,
        take,
        user_id,
        undefined,
        category_id
      );
      return transactions;
    }
    const transactions = await this.transactionRepository.findTransactions(
      skip,
      take,
      user_id
    );

    return transactions;
  }
}
