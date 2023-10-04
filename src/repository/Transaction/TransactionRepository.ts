import { Category, Transaction, Type } from "@prisma/client";
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

  async findTransactions(
    user_id: string,
    type?: Type,
    category_id?: string
  ): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: {
        user_id,
        type: type ? type : undefined,
        category_id: category_id ? category_id : undefined,
      },
    });

    return transactions;
  }

  async findTransactionsByType(
    user_id: string,
    type: Type
  ): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: {
        user_id,
        type,
      },
    });
    return transactions;
  }

  async findTransactionsByCategory(
    category_id: string
  ): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: {
        category_id,
      },
    });

    return transactions;
  }
}
