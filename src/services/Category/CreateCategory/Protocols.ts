import { Category } from "@prisma/client";
import { CategoryProps } from "../../../repository/Category/ICategoryRepository";

export interface ICreateCategoryService {
  execute: (props: CategoryProps) => Promise<Category>;
}
