import express from "express";
import { User } from "../entities/User";
import { isAuth } from "../middlewares/isAuth";
import { getConnection } from "typeorm";

const router = express.Router();

router.get("/", isAuth, async (req, res) => {
  const user = await getConnection()
    .getRepository(User)
    .findOne(req.user.id, {
      select: [
        "id",
        "firstname",
        "lastname",
        "email",
        "numberOA",
        "phone",
        "address",
      ],
    });

  res.json({ user });
});

export default router;
