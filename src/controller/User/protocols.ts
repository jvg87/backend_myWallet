import { Request, Response } from "express";

export interface IUserController {
  handle: (req: Request, res: Response) => Promise<Response>;
}
