import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import z from "zod";
import { BalanceUserService } from "../../../services/User/BalanceUser/BalanceUserService";
import { IUserController } from "../protocols";

const handleRequest = z.object({
  date: z.string().optional(),
  month: z.string().optional(),
  year: z.string().optional(),
});

export class BalanceUserController implements IUserController {
  constructor(private readonly balanceService: BalanceUserService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const user_id = req.user_id;

    const { date, month, year } = handleRequest.parse(req.params);

    const balance = await this.balanceService.execute({
      user_id,
      date,
      month,
      year,
    });

    return res.status(StatusCodes.OK).json(balance);
  }
}
