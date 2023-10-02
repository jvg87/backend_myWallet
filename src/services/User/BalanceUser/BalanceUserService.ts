import { Transaction, Type } from "@prisma/client";
import { UnauthorizedError } from "../../../helpers/apiErros";
import { IUserRepository } from "../../../repository/User/IUserRepository";
import {
  BalanceProps,
  BalanceResponse,
  IBalanceUserService,
} from "./protocols";

interface TransactionProps {
  value: number;
  type: Type;
}

export class BalanceUserService implements IBalanceUserService {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute({
    user_id,
    date,
    month,
    year,
  }: BalanceProps): Promise<BalanceResponse[]> {
    if (user_id) {
      throw new UnauthorizedError("Invalid user");
    }

    const dashboard: BalanceResponse[] = [];

    let findRevenues: Transaction[];
    let findExpenses: Transaction[];

    if (date) {
      const newDate = new Date(date);

      findRevenues = await this.userRepository.findBalance({
        type: Type.REVENUE,
        user_id,
        newDate,
      });

      findExpenses = await this.userRepository.findBalance({
        type: Type.EXPENSE,
        user_id,
        newDate,
      });

      const totalRevenues = findRevenues.reduce(
        (total: number, value: TransactionProps) => {
          return total + value.value;
        },
        0
      );

      const totalExpenses = findExpenses.reduce(
        (total: number, value: TransactionProps) => {
          return total + value.value;
        },
        0
      );

      const sumRevenues = {
        tag: "receita",
        saldo: totalRevenues,
      };

      const sumExpenses = {
        tag: "despesa",
        saldo: totalExpenses,
      };

      const balanceDate = {
        tag: "saldo",
        saldo: totalRevenues - totalExpenses,
      };

      const result: BalanceResponse = {
        sumRevenues: sumRevenues,
        sumExpenses: sumExpenses,
        balance: balanceDate,
      };

      dashboard.push(result);
    }

    return dashboard;
  }
}
