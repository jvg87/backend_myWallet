import { Request, Response, Router } from "express";
import {
  createCategoryController,
  getCategoryController,
} from "../controller/Category";
import {
  authUserController,
  createUserController,
  detailUserController,
  updateUserController,
} from "../controller/User";
import { isAuthenticated } from "../middleware/isAuthenticated";

const router = Router();

router.post("/user", async (req: Request, res: Response) => {
  await createUserController.handle(req, res);
});
router.post("/session", async (req: Request, res: Response) => {
  await authUserController.handle(req, res);
});

router.use(isAuthenticated);

// --------USER-----------

router.get("/me", async (req: Request, res: Response) => {
  await detailUserController.handle(req, res);
});

router.put("/me", async (req: Request, res: Response) => {
  await updateUserController.handle(req, res);
});

// --------CATEGORY-----------

router.post("/category", async (req: Request, res: Response) => {
  await createCategoryController.handle(req, res);
});
router.get("/category", async (req: Request, res: Response) => {
  await getCategoryController.handle(req, res);
});

export { router };
