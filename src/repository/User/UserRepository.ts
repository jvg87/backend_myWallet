import prisma from "../../database/prisma";
import { IUSer } from "../../models/User";
import { CreateProps, IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
  async create({
    password,
    name,
    email,
    balance,
  }: CreateProps): Promise<Omit<IUSer, "password">> {
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
}
