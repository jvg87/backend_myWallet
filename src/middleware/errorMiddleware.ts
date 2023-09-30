import { NextFunction, type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { ApiError } from "../helpers/apiErros";

export const errorMiddleware = (
  err: Error | ApiError | ZodError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): Response => {
  if (err instanceof ApiError) {
    const statusCode = err.statusCode;
    const message = err.message;
    return res.status(statusCode).json({ message });
  }

  if (err instanceof ZodError) {
    const errorZod = err.issues;
    const errors: Record<string, string> = {};
    errorZod.forEach((error) => {
      errors[error.path[0]] = error.message;
    });
    return res.status(StatusCodes.BAD_REQUEST).json({ errors });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: "Internal Server Error" });
};
