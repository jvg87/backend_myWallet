import { Category, Transaction } from "@prisma/client";
import prisma from "../../database/prisma";
import { CreateResponse } from "../User/IUserRepository";
import {
  CreateTransactionProps,
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
}
