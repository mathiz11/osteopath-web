import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

// Method with access token in headers

// export const isAuth = (req: Request, res: Response, next: NextFunction) => {
//   const authorization = req.headers["authorization"];

//   if (authorization) {
//     try {
//       const token = authorization.split(" ")[1];
//       const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
//       req.user = payload as any;
//       next();
//     } catch (err) {
//       console.error(err);
//       res.status(401).send({ message: "not authenticated" });
//     }
//   } else {
//     res.status(401).send({ message: "not authenticated" });
//   }
// };

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies["access-token"];

  if (accessToken) {
    try {
      const payload = verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
      req.user = payload as any;
      next();
    } catch (err) {
      res.status(401).json({ message: "access token not valid" });
      next("access token not valid");
    }
  } else {
    res.status(404);
    next("access token not found");
  }
};
