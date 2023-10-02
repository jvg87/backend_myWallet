import { CategoryRepository } from "../../repository/Category/CategoryRepository";
import { CreateCategoryService } from "../../services/Category/CreateCategory/CreateCategoryService";
import { GetCategoryService } from "../../services/Category/GetCategory/GetCategoryService";
import { UpdateCategoryService } from "../../services/Category/UpdateCategory/UpdateCategoryService";
import { CreateCategoryController } from "./CreateCategory/CreateCategoryController";
import { GetCategoryController } from "./GetCategory/GetCategoryController";
import { UpdateCategoryController } from "./UpdateCategory/UpdateCategoryController";

const categoryRepository = new CategoryRepository();

const createCategoryService = new CreateCategoryService(categoryRepository);
const createCategoryController = new CreateCategoryController(
  createCategoryService
);

const getCategoryService = new GetCategoryService(categoryRepository);
const getCategoryController = new GetCategoryController(getCategoryService);

const updateCategoryService = new UpdateCategoryService(categoryRepository);
const updateCategoryController = new UpdateCategoryController(
  updateCategoryService
);

export {
  createCategoryController,
  getCategoryController,
  updateCategoryController,
};
