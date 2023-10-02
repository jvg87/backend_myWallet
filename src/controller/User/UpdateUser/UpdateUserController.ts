import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import z from "zod";
import { UpdateUserService } from "../../../services/User/UpdateUser/UpdateUserService";
import { IUserController } from "../protocols";

const bodyRequest = z.object({
  name: z.string().optional(),
  balance: z.number().optional(),
});

export class UpdateUserController implements IUserController {
  constructor(private readonly userService: UpdateUserService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const user_id = req.user_id;

    const { balance, name } = bodyRequest.parse(req.body);

    const updated = await this.userService.execute({ user_id, balance, name });

    return res.status(StatusCodes.OK).json(updated);
  }
}
