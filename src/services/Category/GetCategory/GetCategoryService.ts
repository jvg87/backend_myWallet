import { Category, Type } from "@prisma/client";
import { ICategoryRepository } from "../../../repository/Category/ICategoryRepository";
import { IGetCategoryService } from "./Protocols";

export class GetCategoryService implements IGetCategoryService {
  constructor(private readonly categoryRepository: ICategoryRepository) {}
  async execute(user_id: string, type?: Type): Promise<Category[] | null> {
    const categories = await this.categoryRepository.findAllCategory(
      user_id,
      type
    );

    return categories;
  }
}
