import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { UpdateCategoryService } from "../../../services/Category/UpdateCategory/UpdateCategoryService";
import { IUserController } from "../../User/protocols";

const bodySchema = z.object({
  name: z.string(),
});

const querySchema = z.object({
  id: z.string(),
});

export class UpdateCategoryController implements IUserController {
  constructor(private readonly updateService: UpdateCategoryService) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const user_id = req.user_id;
    const { name } = bodySchema.parse(req.body);
    const { id } = querySchema.parse(req.query);

    const update = await this.updateService.execute(id, user_id, name);

    return res.status(StatusCodes.OK).json(update);
  }
}
