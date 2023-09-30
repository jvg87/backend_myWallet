import { hash } from "bcryptjs";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { CreateUserService } from "../../../services/User/CreateUser/CreateUserService";
import { IUserController } from "../protocols";

const createSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  balance: z.number().default(0).optional(),
});

export class CreateUserController implements IUserController {
  constructor(private readonly createUserService: CreateUserService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, name, password, balance = 0 } = createSchema.parse(req.body);

    const passwordHash = await hash(password, 8);

    const createUser = await this.createUserService.execute({
      email,
      name,
      password: passwordHash,
      balance,
    });

    return res.status(StatusCodes.CREATED).json(createUser);
  }
}
