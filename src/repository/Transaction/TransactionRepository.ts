import { Category, Transaction } from "@prisma/client";
import prisma from "../../database/prisma";
import { GetTransactionsServiceResponse } from "../../services/Transaction/GetTransactions/Protocols";
import { CreateResponse } from "../User/IUserRepository";
import {
  CreateTransactionProps,
  GetTransactionsProps,
  ITransactionRepository,
} from "./ITransactionRepository";

export class TransactionRepository implements ITransactionRepository {
  async createTransaction(props: CreateTransactionProps): Promise<Transaction> {
    const newTransaction = await prisma.transaction.create({
      data: props,
    });

    return newTransaction;
  }

  async findCategoryById(id: string): Promise<Category | null> {
    const category = await prisma.category.findFirst({
      where: {
        id,
      },
    });

    return category;
  }

  async findUserById(id: string): Promise<CreateResponse | null> {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        balance: true,
      },
    });

    return user;
  }

  async updateBalance(user_id: string, newBalance: number): Promise<void> {
    await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        balance: newBalance,
      },
    });
  }

  async findTransactions({
    skip,
    take,
    user_id,
    category_id,
    endDate,
    newDate,
    startDate,
    type,
  }: GetTransactionsProps): Promise<GetTransactionsServiceResponse> {
    const [transactions, total] = await prisma.$transaction([
      prisma.transaction.findMany({
        where: {
          user_id,
          type: type ? type : undefined,
          category_id: category_id ? category_id : undefined,
          date: newDate
            ? newDate
            : {
                gte: startDate,
                lte: endDate,
              },
        },
        orderBy: {
          date: "desc",
        },
        skip,
        take,
      }),
      prisma.transaction.count({
        where: {
          user_id,
          type: type ? type : undefined,
          category_id: category_id ? category_id : undefined,
          date: newDate
            ? newDate
            : {
                gte: startDate,
                lte: endDate,
              },
        },
      }),
    ]);

    const totalPages = Math.ceil(total / take);

    return { total, totalPages, transactions };
  }
}
