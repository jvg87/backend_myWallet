import { Type } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { GetTransactionsService } from "../../../services/Transaction/GetTransactions/GetTransactionsService";
import { IUserController } from "../../User/protocols";

const querySchema = z.object({
  category_id: z.string().optional(),
  type: z.nativeEnum(Type).optional(),
  date: z.string().optional(),
});

export class GetTransactionsController implements IUserController {
  constructor(
    private readonly getTransactionsService: GetTransactionsService
  ) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const user_id = req.user_id;

    const { category_id, type, date } = querySchema.parse(req.query);

    const response = await this.getTransactionsService.execute({
      user_id,
      category_id,
      type,
      date,
    });

    return res.status(StatusCodes.OK).json(response);
  }
}
