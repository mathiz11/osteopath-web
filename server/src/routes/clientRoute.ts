import express from "express";
import { Client } from "../entities/Client";
import { getConnection } from "typeorm";
import { isAuth } from "../middlewares/isAuth";
import { body, param } from "express-validator";
import { checkErrors } from "../middlewares/checkErrors";

const router = express.Router();

router.get("/", isAuth, async (req, res) => {
  const clients = await getConnection()
    .getRepository(Client)
    .find({ userId: req.user.id });

  res.json({ clients });
});

router.get("/:id", isAuth, param("id").isInt(), async (req, res) => {
  const clientId = req.params.id;

  const client = await getConnection()
    .getRepository(Client)
    .findOne(clientId, {
      where: { userId: req.user.id },
      relations: ["animals"],
    });

  if (client) {
    res.json({ client });
  } else {
    res.status(404).json({ message: "client not found" });
  }
});

router.post(
  "/",
  isAuth,
  body("firstname").notEmpty().isLength({ max: 100 }),
  body("lastname").notEmpty().isLength({ max: 100 }),
  body("email").isEmail().isLength({ max: 100 }),
  body("phone").isLength({ min: 10, max: 10 }),
  body("address").notEmpty(),
  checkErrors,
  async (req, res) => {
    const { firstname, lastname, email, phone, address } = req.body;

    try {
      await getConnection().getRepository(Client).insert({
        firstname,
        lastname,
        email,
        phone,
        address,
        userId: req.user.id,
      });

      res.status(201).json({ message: "client created" });
    } catch (e) {
      res.status(500).json({ message: "client creation error" });
    }
  }
);

router.put(
  "/",
  isAuth,
  body("id").isInt(),
  body("firstname").notEmpty().isLength({ max: 100 }),
  body("lastname").notEmpty().isLength({ max: 100 }),
  body("email").isEmail().isLength({ max: 100 }),
  body("phone").isLength({ min: 10, max: 10 }),
  body("address").notEmpty(),
  checkErrors,
  async (req, res) => {
    const { id, firstname, lastname, email, phone, address } = req.body;

    try {
      await getConnection()
        .createQueryBuilder()
        .update(Client)
        .set({
          firstname,
          lastname,
          email,
          phone,
          address,
        })
        .where("id = :id and userId = :userId", {
          id,
          userId: req.user.id,
        })
        .execute();

      res.json({ message: "client updated" });
    } catch (e) {
      res.status(500).json({ message: "client update error" });
    }
  }
);

router.delete(
  "/:id",
  isAuth,
  param("id").isInt(),
  checkErrors,
  async (req, res) => {
    const clientId = req.params.id;

    try {
      if (
        !(await getConnection()
          .getRepository(Client)
          .findOne(clientId, { where: { userId: req.user.id } }))
      ) {
        res.status(404).json({ message: "client not found" });
      } else {
        await getConnection().getRepository(Client).delete({ id: clientId });
        res.json({ message: "client deleted" });
      }
    } catch (e) {
      res.status(500).json({ message: "client deletion error" });
    }
  }
);

export default router;
