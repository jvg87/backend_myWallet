import { CategoryRepository } from "../../repository/Category/CategoryRepository";
import { CreateCategoryService } from "../../services/Category/CreateCategory/CreateCategoryService";
import { GetCategoryService } from "../../services/Category/GetCategory/GetCategoryService";
import { CreateCategoryController } from "./CreateCategory/CreateCategoryController";
import { GetCategoryController } from "./GetCategory/GetCategoryController";

const categoryRepository = new CategoryRepository();

const createCategoryService = new CreateCategoryService(categoryRepository);
const createCategoryController = new CreateCategoryController(
  createCategoryService
);

const getCategoryService = new GetCategoryService(categoryRepository);
const getCategoryController = new GetCategoryController(getCategoryService);

export { createCategoryController, getCategoryController };
