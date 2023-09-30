import { Request, Response, Router } from "express";
import { createUserController } from "../controller/User";

const router = Router();

router.post("/user", async (req: Request, res: Response) => {
  await createUserController.handle(req, res);
});

export { router };
