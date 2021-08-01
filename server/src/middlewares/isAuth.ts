import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers["authorization"];

  if (authorization) {
    try {
      const token = authorization.split(" ")[1];
      const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      req.user = payload as any;
      next();
    } catch (err) {
      console.error(err);
      res.status(403).send("not authenticated");
    }
  } else {
    res.status(403).send("not authenticated");
  }
};
