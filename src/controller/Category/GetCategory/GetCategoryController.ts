import { Type } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { GetCategoryService } from "../../../services/Category/GetCategory/GetCategoryService";
import { IUserController } from "../../User/protocols";

const querySchema = z.object({
  type: z.nativeEnum(Type).optional(),
});

export class GetCategoryController implements IUserController {
  constructor(private readonly getCategoryService: GetCategoryService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const user_id = req.user_id;

    const { type } = querySchema.parse(req.query);

    const categories = await this.getCategoryService.execute(user_id, type);

    return res.status(StatusCodes.OK).json(categories);
  }
}
