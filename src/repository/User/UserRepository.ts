import { Transaction } from "@prisma/client";
import prisma from "../../database/prisma";
import { IUSer } from "../../models/User";
import {
  CreateProps,
  CreateResponse,
  FindBalanceProps,
  IUserRepository,
  UpdateUserProps,
} from "./IUserRepository";

export class UserRepository implements IUserRepository {
  async create({
    password,
    name,
    email,
    balance,
  }: CreateProps): Promise<CreateResponse> {
    const user = await prisma.user.create({
      data: {
        name,
        password,
        email,
        balance,
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

  async findUserByEmail(email: string): Promise<IUSer | null> {
    const userAlreadyExists = await prisma.user.findUnique({
      where: { email },
    });

    return userAlreadyExists;
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

  async findBalance(props: FindBalanceProps): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: {
        user_id: props.user_id,
        type: props.type,
        date: props.newDate
          ? props.newDate
          : {
              gte: props.startDate,
              lte: props.endDate,
            },
      },
    });

    return transactions;
  }

  async updateUser(props: UpdateUserProps): Promise<CreateResponse> {
    const updatedUser = await prisma.user.update({
      where: {
        id: props.user_id,
      },
      data: {
        name: props.name,
        balance: props.balance,
      },
      select: {
        id: true,
        name: true,
        email: true,
        balance: true,
      },
    });

    return updatedUser;
  }
}
