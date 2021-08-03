import express, { Response } from "express";
import { User } from "../entities/User";
import { compareSync, hashSync } from "bcrypt";
import { createAccessToken, createRefreshToken } from "../utils/auth";
import { isAuth } from "../middlewares/isAuth";
import { verify } from "jsonwebtoken";
import { body } from "express-validator";
import { checkErrors } from "../middlewares/checkErrors";

let router = express.Router();

router.post(
  "/login",
  body("email").isEmail().isLength({ max: 100 }),
  body("password").isLength({ min: 8, max: 100 }),
  checkErrors,
  async (req, res): Promise<Response<string> | void> => {
    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ email });

      if (user) {
        const valid = compareSync(password, user.password);

        if (valid) {
          res.cookie("access-token", createAccessToken(user), {
            httpOnly: true,
          });
          res.cookie("refresh-token", createRefreshToken(user), {
            httpOnly: true,
          });
          res.json({ message: "log in successfully" });
        } else {
          res.status(403).json({ message: "login or password incorrect" });
        }
      } else {
        res.status(403).json({ message: "login or password incorrect" });
      }
    } else {
      res.status(400).json({ message: "provide email and password" });
    }
  }
);

// Method with refresh token in request

// router.post(
//   "/refresh-token",
//   body("refreshToken").notEmpty(),
//   checkErrors,
//   async (req, res) => {
//     const refreshToken = req.body.refreshToken;

//     try {
//       let payload: any = verify(
//         refreshToken,
//         process.env.REFRESH_TOKEN_SECRET!
//       );

//       const user = await User.findOne({ id: payload.id });

//       if (user) {
//         if (user.tokenVersion === payload.tokenVersion) {
//           res.json({ accessToken: createAccessToken(user) });
//         } else {
//           res.status(406).json({ message: "sorry hacker" });
//         }
//       } else {
//         res.status(500).json({ message: "token is linked to any user" });
//       }
//     } catch (e) {
//       res.status(403).json({ message: "refresh token expired" });
//     }
//   }
// );

router.get("/refresh-token", async (req, res) => {
  const refreshToken = req.cookies["refresh-token"];

  if (refreshToken) {
    try {
      let payload: any = verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      );

      const user = await User.findOne({ id: payload.id });

      if (user) {
        if (user.tokenVersion === payload.tokenVersion) {
          res.cookie("access-token", createAccessToken(user), {
            httpOnly: true,
          });
          res.status(200);
        } else {
          res.status(406).json({ message: "sorry hacker" });
        }
      } else {
        res.status(500).json({ message: "token is linked to any user" });
      }
    } catch (e) {
      res.status(401).json({ message: "refresh token not valid" });
    }
  } else {
    res.status(404);
  }
});

router.get("/logout", (_req, res) => {
  res.clearCookie("access-token");
  res.clearCookie("refresh-token");
  res.json({ message: "log out successfully" });
});

router.post(
  "/generate-password",
  body("password").isLength({ min: 8, max: 100 }),
  checkErrors,
  (req, res) => {
    res.json({
      generatedPassword: hashSync(
        req.body.password,
        parseInt(process.env.SALT_ROUNDS!)
      ),
    });
  }
);

router.get("/is-auth", isAuth, (_req, res) => {
  res.json({ message: "authenticated" });
});

export default router;
