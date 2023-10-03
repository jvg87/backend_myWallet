import { Type } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { CreateTransactionService } from "../../../services/Transaction/CreateTransaction/CreateTransactionService";
import { IUserController } from "../../User/protocols";

const bodySchema = z.object({
  value: z.number(),
  category_id: z.string(),
  date: z.string().optional(),
  type: z.nativeEnum(Type),
  description: z.string().optional(),
});

export class CreateTransactionController implements IUserController {
  constructor(
    private readonly createTransactionService: CreateTransactionService
  ) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const user_id = req.user_id;
    const { category_id, date, type, value, description } = bodySchema.parse(
      req.body
    );

    const transaction = await this.createTransactionService.execute({
      category_id,
      date,
      type,
      value,
      description,
      user_id,
    });

    return res.status(StatusCodes.CREATED).json(transaction);
  }
}
