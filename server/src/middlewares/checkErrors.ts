import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const checkErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): Response<any> | void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
