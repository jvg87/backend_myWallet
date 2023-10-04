import { Type } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { GetTransactionsService } from "../../../services/Transaction/GetTransactions/GetTransactionsService";
import { IUserController } from "../../User/protocols";

const querySchema = z.object({
  skip: z.string().default("0"),
  take: z.string().default("5"),
  category_id: z.string().optional(),
  type: z.nativeEnum(Type).optional(),
  date: z.string().optional(),
  year: z.string().optional(),
  month: z.string().optional(),
});

const paramsSchema = z.object({
  id: z.string().optional(),
});

export class GetTransactionsController implements IUserController {
  constructor(
    private readonly getTransactionsService: GetTransactionsService
  ) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const user_id = req.user_id;

    const { skip, take, category_id, type, date, year, month } =
      querySchema.parse(req.query);

    const { id } = paramsSchema.parse(req.params);

    const response = await this.getTransactionsService.execute({
      skip: Number(skip),
      take: Number(take),
      user_id,
      category_id,
      type,
      date,
      year,
      month,
      id,
    });

    return res.status(StatusCodes.OK).json(response);
  }
}
