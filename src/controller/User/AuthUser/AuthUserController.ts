import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { AuthUserService } from "../../../services/User/AuthUser/AuthUserService";
import { IAuthUseController } from "./protocols";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export class AuthUserController implements IAuthUseController {
  constructor(private readonly authUserService: AuthUserService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = authSchema.parse(req.body);

    const user = await this.authUserService.execute(email, password);

    return res.status(StatusCodes.OK).json(user);
  }
}
