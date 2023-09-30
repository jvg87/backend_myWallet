import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { DetailUserService } from "../../../services/User/DetailUser/DetailUserService";
import { IUserController } from "../protocols";

export class DetailUserController implements IUserController {
  constructor(private readonly detailUserService: DetailUserService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const user_id = req.user_id;

    const user = await this.detailUserService.execute(user_id);

    return res.status(StatusCodes.OK).json(user);
  }
}
