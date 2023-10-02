import { Category, Type } from "@prisma/client";

export interface CategoryProps {
  user_id: string;
  name: string;
  type: Type;
}

export interface ICategoryRepository {
  createCategory: (props: CategoryProps) => Promise<Category>;
  findCategoryByName: (name: string) => Promise<Category | null>;
}
