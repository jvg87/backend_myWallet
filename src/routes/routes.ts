import { Request, Response, Router } from "express";
import { authUserController, createUserController } from "../controller/User";

const router = Router();

router.post("/user", async (req: Request, res: Response) => {
  await createUserController.handle(req, res);
});

router.post("/session", async (req: Request, res: Response) => {
  await authUserController.handle(req, res);
});

export { router };
