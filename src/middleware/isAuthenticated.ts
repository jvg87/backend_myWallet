import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UnauthorizedError } from "../helpers/apiErros";

interface Payload {
  sub: string;
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    throw new UnauthorizedError("User not authenticated");
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET ?? "") as Payload;

    req.user_id = sub;

    return next();
  } catch (error) {
    throw new UnauthorizedError("User not authenticated");
  }
};
