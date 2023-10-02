import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { DeleteCategoryService } from "../../../services/Category/DeleteCategory/DeleteCategoryService";
import { IUserController } from "../../User/protocols";

const querySchema = z.object({
  id: z.string(),
});

export class DeleteCategoryController implements IUserController {
  constructor(private readonly deleteService: DeleteCategoryService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = querySchema.parse(req.query);

    const response = await this.deleteService.execute(id);

    return res.status(StatusCodes.OK).json(response);
  }
}
