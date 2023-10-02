import { Category, Type } from "@prisma/client";

export interface IGetCategoryService {
  execute: (user_id: string, type?: Type) => Promise<Category[] | null>;
}
