import { CategoryRepository } from "../../../repository/Category/CategoryRepository";
import { CreateCategoryService } from "../../../services/Category/CreateCategory/CreateCategoryService";
import { CreateCategoryController } from "./CreateCategoryController";

const categoryRepository = new CategoryRepository();

const createCategoryService = new CreateCategoryService(categoryRepository);
const createCategoryController = new CreateCategoryController(
  createCategoryService
);

export { createCategoryController };
