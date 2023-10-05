import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { UpdateTransactionService } from "../../../services/Transaction/UpdateTransaction/UpdateTransactionService";
import { IUserController } from "../../User/protocols";

const bodySchema = z.object({
  value: z.number().optional(),
  category_id: z.string().optional(),
  description: z.string().optional(),
  date: z.string().optional(),
});

const paramsSchema = z.object({
  id: z.string(),
});

export class UpdateTransactionController implements IUserController {
  constructor(private readonly updateService: UpdateTransactionService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const user_id = req.user_id;

    const { id } = paramsSchema.parse(req.params);

    const { category_id, date, description, value } = bodySchema.parse(
      req.body
    );

    await this.updateService.execute({
      id,
      user_id,
      category_id,
      date,
      description,
      value,
    });

    return res.status(StatusCodes.OK).send();
  }
}
