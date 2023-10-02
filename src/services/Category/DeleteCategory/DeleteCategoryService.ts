import { NotFoundError } from "../../../helpers/apiErros";
import { ICategoryRepository } from "../../../repository/Category/ICategoryRepository";
import { IDeleteCategoryService } from "./Protocols";

export class DeleteCategoryService implements IDeleteCategoryService {
  constructor(private readonly categoryRepository: ICategoryRepository) {}
  async execute(id: string): Promise<void> {
    const category = await this.categoryRepository.findCategoryById(id);

    if (!category) {
      throw new NotFoundError("Category not found");
    }

    await this.categoryRepository.deleteCategoryById(id);
  }
}
