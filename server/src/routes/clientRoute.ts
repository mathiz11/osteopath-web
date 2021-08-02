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
    .find({
      where: { userId: req.user.id },
      relations: ["animals"],
    });

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
      res.status(500).json({ message: "client creation error", detail: e });
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

      res.status(200).json({ message: "client updated" });
    } catch (e) {
      res.status(500).json({ message: "client update error", detail: e });
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

    if (
      !(await getConnection()
        .getRepository(Client)
        .findOne(clientId, { where: { userId: req.user.id } }))
    ) {
      res.status(404).json({ message: "client not found" });
    } else {
      try {
        await getConnection()
          .getRepository(Client)
          .delete({ id: clientId, userId: req.user.id });
        res.status(200).json({ message: "client deleted" });
      } catch (e) {
        res.status(500).json({
          message: "client deletion error",
          detail: e,
        });
      }
    }
  }
);

export default router;
