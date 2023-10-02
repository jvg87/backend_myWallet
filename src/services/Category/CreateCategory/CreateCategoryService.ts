import { Category } from "@prisma/client";
import { BadRequestError, UnauthorizedError } from "../../../helpers/apiErros";
import {
  CategoryProps,
  ICategoryRepository,
} from "../../../repository/Category/ICategoryRepository";
import { ICreateCategoryService } from "./Protocols";

export class CreateCategoryService implements ICreateCategoryService {
  constructor(private readonly categoryRepository: ICategoryRepository) {}
  async execute(props: CategoryProps): Promise<Category> {
    if (!props.user_id) {
      throw new UnauthorizedError("Unauthorized access");
    }

    const categoryAlreadyExists =
      await this.categoryRepository.findCategoryByName(props.name);

    if (categoryAlreadyExists) {
      throw new BadRequestError("Category already exists");
    }

    const newCategory = await this.categoryRepository.createCategory(props);

    return newCategory;
  }
}
