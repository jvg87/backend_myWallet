import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { GetTransactionsService } from "../../../services/Transaction/GetTransactions/GetTransactionsService";
import { IUserController } from "../../User/protocols";

export class GetTransactionsController implements IUserController {
  constructor(
    private readonly getTransactionsService: GetTransactionsService
  ) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const user_id = req.user_id;

    const response = await this.getTransactionsService.execute(user_id);

    return res.status(StatusCodes.OK).json(response);
  }
}
