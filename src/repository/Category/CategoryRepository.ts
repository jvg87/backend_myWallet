import { Category, Type } from "@prisma/client";
import prisma from "../../database/prisma";
import { CategoryProps, ICategoryRepository } from "./ICategoryRepository";

export class CategoryRepository implements ICategoryRepository {
  async createCategory({
    name,
    type,
    user_id,
  }: CategoryProps): Promise<Category> {
    const newCategory = await prisma.category.create({
      data: {
        name,
        type,
        user_id,
      },
    });

    return newCategory;
  }

  async findCategoryByName(name: string): Promise<Category | null> {
    const category = await prisma.category.findFirst({
      where: {
        name,
      },
    });
    return category;
  }

  async findCategoryById(id: string): Promise<Category | null> {
    const category = await prisma.category.findFirst({
      where: {
        id,
      },
    });

    return category;
  }

  async findAllCategory(
    user_id: string,
    type?: Type
  ): Promise<Category[] | null> {
    const categories = await prisma.category.findMany({
      where: {
        user_id,
        type,
      },
    });

    return categories;
  }

  async updateCategory(
    user_id: string,
    name?: string,
    id?: string
  ): Promise<Category> {
    const category = await prisma.category.update({
      where: {
        user_id,
        id,
      },
      data: {
        name,
      },
    });

    return category;
  }
}
