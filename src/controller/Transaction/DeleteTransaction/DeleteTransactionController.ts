import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { DeleteTransactionService } from "../../../services/Transaction/DeleteTransaction/DeleteTransactionService";
import { IUserController } from "../../User/protocols";

const paramsSchema = z.object({
  id: z.string(),
});

export class DeleteTransactionController implements IUserController {
  constructor(private readonly deleteService: DeleteTransactionService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const user_id = req.user_id;

    const { id } = paramsSchema.parse(req.params);

    await this.deleteService.execute(user_id, id);

    return res.status(StatusCodes.OK).send();
  }
}
