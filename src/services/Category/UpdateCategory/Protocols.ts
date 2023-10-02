import { Category } from "@prisma/client";

export interface IUpdateCategoryService {
  execute: (id: string, user_id: string, name: string) => Promise<Category>;
}
