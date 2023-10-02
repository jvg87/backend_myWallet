import { Category, Type } from "@prisma/client";

export interface CategoryProps {
  user_id: string;
  name: string;
  type: Type;
}

export interface ICategoryRepository {
  createCategory: (props: CategoryProps) => Promise<Category>;
  findCategoryById: (id: string) => Promise<Category | null>;
  findCategoryByName: (name: string) => Promise<Category | null>;
  findAllCategory: (user_id: string, type?: Type) => Promise<Category[] | null>;
  updateCategory: (
    user_id: string,
    name?: string,
    id?: string
  ) => Promise<Category>;
}
