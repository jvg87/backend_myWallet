import { Request, Response, Router } from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoryController,
  updateCategoryController,
} from "../controller/Category";
import {
  creteTransactionController,
  getTransactionsController,
} from "../controller/Transaction";
import {
  authUserController,
  balanceController,
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
router.get("/balance", async (req: Request, res: Response) => {
  await balanceController.handle(req, res);
});

// -------TRANSACTION----------

router.post("/transaction", async (req: Request, res: Response) => {
  await creteTransactionController.handle(req, res);
});
router.get("/transaction", async (req: Request, res: Response) => {
  await getTransactionsController.handle(req, res);
});
router.get("/transaction/:id", async (req: Request, res: Response) => {
  await getTransactionsController.handle(req, res);
});

// --------CATEGORY-----------

router.post("/category", async (req: Request, res: Response) => {
  await createCategoryController.handle(req, res);
});
router.get("/category", async (req: Request, res: Response) => {
  await getCategoryController.handle(req, res);
});
router.put("/category", async (req: Request, res: Response) => {
  await updateCategoryController.handle(req, res);
});
router.delete("/category", async (req: Request, res: Response) => {
  await deleteCategoryController.handle(req, res);
});

export { router };
