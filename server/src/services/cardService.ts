import { Card } from "../entities/Card";
import { getConnection } from "typeorm";

const getOne = async (
  cardId: string,
  animalId: string,
  clientId: string,
  userId: string
) => {
  return await getConnection()
    .getRepository(Card)
    .findOne(cardId, {
      where: {
        animal: {
          id: animalId,
          client: {
            id: clientId,
            userId,
          },
        },
      },
    });
};

const cardService = {
  getOne,
};

export default cardService;
