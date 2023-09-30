import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IUserController } from "../protocols";

export class BalanceUserController implements IUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    return res.status(StatusCodes.OK);
  }
}
