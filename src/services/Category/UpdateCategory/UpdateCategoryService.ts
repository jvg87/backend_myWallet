import { Category } from "@prisma/client";
import { NotFoundError } from "../../../helpers/apiErros";
import { ICategoryRepository } from "../../../repository/Category/ICategoryRepository";
import { IUpdateCategoryService } from "./Protocols";

export class UpdateCategoryService implements IUpdateCategoryService {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(id: string, user_id: string, name: string): Promise<Category> {
    const category = await this.categoryRepository.findCategoryById(id);

    console.log(category);

    if (!category) {
      throw new NotFoundError("Category not found");
    }

    const update = await this.categoryRepository.updateCategory(
      user_id,
      name,
      id
    );

    return update;
  }
}
