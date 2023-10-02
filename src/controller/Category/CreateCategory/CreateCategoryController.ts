import { Type } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import z from "zod";
import { CreateCategoryService } from "../../../services/Category/CreateCategory/CreateCategoryService";
import { IUserController } from "../../User/protocols";

const bodySchema = z.object({
  name: z.string().min(3),
  type: z.nativeEnum(Type),
});

export class CreateCategoryController implements IUserController {
  constructor(private readonly categoryService: CreateCategoryService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const user_id = req.user_id;
    const { name, type } = bodySchema.parse(req.body);

    const category = await this.categoryService.execute({
      user_id,
      name,
      type,
    });

    return res.status(StatusCodes.CREATED).json(category);
  }
}
