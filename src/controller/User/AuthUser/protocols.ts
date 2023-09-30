import { Request, Response } from "express";

export interface IAuthUseController {
  handle: (req: Request, res: Response) => Promise<Response>;
}
