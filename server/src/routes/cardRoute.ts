import express from "express";
import { body, param } from "express-validator";
import { Card } from "../entities/Card";
import { checkErrors } from "../middlewares/checkErrors";
import { isAuth } from "../middlewares/isAuth";
import { getConnection } from "typeorm";
import animalService from "../services/animalService";
import cardService from "../services/cardService";
import { deleteFile } from "../utils/cloudStorage";

const router = express.Router();

router.post(
  "/clients/:clientId/animals/:animalId/cards",
  isAuth,
  param("clientId").isInt(),
  param("animalId").isInt(),
  body("age")
    .isInt()
    .custom((age) => age > 0 && age < 120),
  body("isCastrated").isBoolean(),
  body("diet").default(null).optional({ nullable: true }).isString(),
  body("score")
    .isInt()
    .custom((score) => score > 0 && score <= 5),
  body("discipline").default(null).optional({ nullable: true }).isString(),
  body("lifestyle").default(null).optional({ nullable: true }).isString(),
  body("antecedent").default(null).optional({ nullable: true }).isString(),
  body("dewormer")
    .default(null)
    .optional({ nullable: true })
    .isString()
    .isLength({ max: 100 }),
  body("vaccine").default(null).optional({ nullable: true }).isString(),
  body("marshal").default(null).optional({ nullable: true }).isString(),
  body("dentistry").default(null).optional({ nullable: true }).isString(),
  body("observation").default(null).optional({ nullable: true }).isString(),
  body("schemaFilename")
    .default(null)
    .optional({ nullable: true })
    .isString()
    .isLength({ max: 255 }),
  body("conclusion").default(null).optional({ nullable: true }).isString(),
  body("treatment").default(null).optional({ nullable: true }).isString(),
  body("restTime")
    .default(null)
    .optional({ nullable: true })
    .isString()
    .isLength({ max: 100 }),
  body("activityRetake")
    .default(null)
    .optional({ nullable: true })
    .isString()
    .isLength({ max: 100 }),
  checkErrors,
  async (req, res) => {
    const { clientId, animalId } = req.params;
    const {
      age,
      isCastrated,
      diet,
      score,
      discipline,
      lifestyle,
      antecedent,
      dewormer,
      vaccine,
      marshal,
      dentistry,
      observation,
      schemaFilename,
      conclusion,
      treatment,
      restTime,
      activityRetake,
    } = req.body;

    try {
      const animal = await animalService.getOne(
        animalId,
        clientId,
        req.user.id
      );

      if (animal) {
        const result = await getConnection()
          .getRepository(Card)
          .insert({
            age,
            isCastrated,
            diet,
            score,
            discipline,
            lifestyle,
            antecedent,
            dewormer,
            vaccine,
            marshal,
            dentistry,
            observation,
            schemaFilename,
            conclusion,
            treatment,
            restTime,
            activityRetake,
            animalId: +animalId,
          });

        const newCard = result.identifiers.pop();

        res.status(201).json({ animal: newCard });
      }
    } catch (e) {
      res.status(500).json({ message: "card creation error" });
    }
  }
);

router.put(
  "/clients/:clientId/animals/:animalId/cards/:cardId",
  isAuth,
  param("clientId").isInt(),
  param("animalId").isInt(),
  body("age")
    .isInt()
    .custom((age) => age > 0 && age < 120),
  body("isCastrated").isBoolean(),
  body("diet").default(null).optional({ nullable: true }).isString(),
  body("score")
    .isInt()
    .custom((score) => score > 0 && score <= 5),
  body("discipline").default(null).optional({ nullable: true }).isString(),
  body("lifestyle").default(null).optional({ nullable: true }).isString(),
  body("antecedent").default(null).optional({ nullable: true }).isString(),
  body("dewormer")
    .default(null)
    .optional({ nullable: true })
    .isString()
    .isLength({ max: 100 }),
  body("vaccine").default(null).optional({ nullable: true }).isString(),
  body("marshal").default(null).optional({ nullable: true }).isString(),
  body("dentistry").default(null).optional({ nullable: true }).isString(),
  body("observation").default(null).optional({ nullable: true }).isString(),
  body("schemaFilename")
    .default(null)
    .optional({ nullable: true })
    .isString()
    .isLength({ max: 255 }),
  body("conclusion").default(null).optional({ nullable: true }).isString(),
  body("treatment").default(null).optional({ nullable: true }).isString(),
  body("restTime")
    .default(null)
    .optional({ nullable: true })
    .isString()
    .isLength({ max: 100 }),
  body("activityRetake")
    .default(null)
    .optional({ nullable: true })
    .isString()
    .isLength({ max: 100 }),
  checkErrors,
  async (req, res) => {
    const { animalId, clientId } = req.params;
    const {
      id,
      age,
      isCastrated,
      diet,
      score,
      discipline,
      lifestyle,
      antecedent,
      dewormer,
      vaccine,
      marshal,
      dentistry,
      observation,
      schemaFilename,
      conclusion,
      treatment,
      restTime,
      activityRetake,
    } = req.body;

    try {
      if (await cardService.getOne(id, animalId, clientId, req.user.id)) {
        await getConnection()
          .createQueryBuilder()
          .update(Card)
          .set({
            age,
            isCastrated,
            diet,
            score,
            discipline,
            lifestyle,
            antecedent,
            dewormer,
            vaccine,
            marshal,
            dentistry,
            observation,
            schemaFilename,
            conclusion,
            treatment,
            restTime,
            activityRetake,
            animalId: +animalId,
          })
          .where("id = :id and animalId= :animalId", {
            id,
            animalId,
          })
          .execute();

        res.status(201).json({ message: "card updated" });
      } else {
        res.status(404).json({ message: "card not found" });
      }
    } catch (e) {
      res.status(500).json({ message: "card update error" });
    }
  }
);

router.delete(
  "/clients/:clientId/animals/:animalId/cards/:cardId/schema",
  isAuth,
  checkErrors,
  async (req, res) => {
    const { clientId, animalId, cardId } = req.params;
    const card = await cardService.getOne(
      cardId,
      animalId,
      clientId,
      req.user.id
    );

    if (card) {
      if (card.schemaFilename) {
        await deleteFile(card.schemaFilename);
      } else {
        res.status(404).json({ message: "schema not found" });
      }
    } else {
      res.status(404).json({ message: "card not found" });
    }
  }
);

export default router;
