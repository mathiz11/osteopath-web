import express from "express";
import { body, param } from "express-validator";
import { Animal, AnimalSubtype, AnimalType } from "../entities/Animal";
import { checkErrors } from "../middlewares/checkErrors";
import { isAuth } from "../middlewares/isAuth";
import { getConnection } from "typeorm";
import { Client } from "../entities/Client";

const router = express.Router();

const animalService = {
  getOne: async (animalId: string, clientId: string, userId: string) => {
    return await getConnection()
      .getRepository(Animal)
      .findOne(animalId, {
        where: {
          client: {
            id: clientId,
            userId,
          },
        },
        relations: ["cards"],
      });
  },
};

router.get(
  "/clients/:clientId/animals/:animalId",
  isAuth,
  param("clientId").isInt(),
  param("animalId").isInt(),
  checkErrors,
  async (req, res) => {
    const { clientId, animalId } = req.params;

    try {
      let animal = await animalService.getOne(animalId, clientId, req.user.id);

      if (animal) {
        res.json({ animal });
      } else {
        res.status(404).json({ message: "animal not found" });
      }
    } catch (e) {
      res.status(500).json({ message: "get animal error" });
    }
  }
);

router.post(
  "/clients/:clientId/animals",
  isAuth,
  param("clientId").isInt(),
  body("name").notEmpty().isLength({ max: 100 }),
  body("type").isIn(Object.values(AnimalType)),
  body("subtype").custom((subtype, { req }) =>
    req.body.type === AnimalType.NAC
      ? Object.values(AnimalSubtype).includes(subtype)
      : true
  ),
  body("sex").notEmpty().isLength({ max: 100 }),
  body("breed").notEmpty().isLength({ max: 100 }),
  checkErrors,
  async (req, res) => {
    const { clientId } = req.params;
    const { name, type, subtype, sex, breed } = req.body;

    try {
      const client = await getConnection()
        .getRepository(Client)
        .findOne(clientId, {
          where: {
            userId: req.user.id,
          },
        });

      if (client) {
        const result = await getConnection()
          .getRepository(Animal)
          .insert({
            name,
            type,
            subtype: type === AnimalType.NAC ? subtype : null,
            sex,
            breed,
            clientId,
          });

        res.status(201).json({ animal: result.identifiers.pop() });
      } else {
        res.status(404).json({ message: "client not found" });
      }
    } catch (e) {
      res.status(500).json({ message: "animal creation error" });
    }
  }
);

router.put(
  "/clients/:clientId/animals",
  isAuth,
  param("clientId").isInt(),
  body("id").isInt(),
  body("name").notEmpty().isLength({ max: 100 }),
  body("type").isIn(Object.values(AnimalType)),
  body("subtype").custom((subtype, { req }) =>
    req.body.type === AnimalType.NAC
      ? Object.values(AnimalSubtype).includes(subtype)
      : true
  ),
  body("sex").notEmpty().isLength({ max: 100 }),
  body("breed").notEmpty().isLength({ max: 100 }),
  checkErrors,
  async (req, res) => {
    const { clientId } = req.params;
    const { id, name, type, subtype, sex, breed } = req.body;

    try {
      if (await animalService.getOne(id, clientId, req.user.id)) {
        await getConnection()
          .createQueryBuilder()
          .update(Animal)
          .set({
            name,
            type,
            subtype,
            sex,
            breed,
            clientId,
          })
          .where("id = :id and clientId = :clientId", {
            id,
            clientId,
          })
          .execute();

        res.status(201).json({ message: "animal updated" });
      } else {
        res.status(404).json({ message: "animal not found" });
      }
    } catch (e) {
      res.status(500).json({ message: "animal update error" });
    }
  }
);

router.delete(
  "/clients/:clientId/animals/:animalId",
  isAuth,
  param("clientId").isInt(),
  param("animalId").isInt(),
  checkErrors,
  async (req, res) => {
    const { clientId, animalId } = req.params;

    try {
      if (await animalService.getOne(animalId, clientId, req.user.id)) {
        await getConnection().getRepository(Animal).delete({ id: animalId });

        res.json({ message: "animal deleted" });
      } else {
        res.status(404).json({ message: "animal not found" });
      }
    } catch (e) {
      res.status(500).json({ message: "client deletion error" });
    }
  }
);

export default router;
