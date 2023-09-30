import { Request, Response, Router } from "express";
import { BadRequestError } from "../helpers/apiErros";

const router = Router();

router.get("/teste", (req: Request, res: Response) => {
  throw new BadRequestError("Error testing");
  res.json({ message: "Initial test" });
});

export { router };
