import express from "express";
import { User } from "../entities/User";
import { isAuth } from "../middlewares/isAuth";
import { getConnection } from "typeorm";
import { body } from "express-validator";
import { checkErrors } from "../middlewares/checkErrors";

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

router.put(
  "/",
  isAuth,
  body("id").isInt(),
  body("firstname").notEmpty().isLength({ max: 100 }),
  body("lastname").notEmpty().isLength({ max: 100 }),
  body("email").isEmail().isLength({ max: 100 }),
  body("numberOA")
    .default(null)
    .optional({ nullable: true })
    .isLength({ max: 30 }),
  body("phone")
    .default(null)
    .optional({ nullable: true })
    .isLength({ min: 10, max: 10 }),
  body("address").default(null).optional({ nullable: true }).isString(),
  checkErrors,
  async (req, res) => {
    const { id, firstname, lastname, email, numberOA, phone, address } =
      req.body;

    try {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({
          firstname,
          lastname,
          email,
          numberOA,
          phone,
          address,
        })
        .where("id = :id", { id })
        .execute();

      res.json({ message: "user updated" });
    } catch (e) {
      res.status(500).json({ message: "user update error" });
    }
  }
);

export default router;
