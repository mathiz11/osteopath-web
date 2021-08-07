import { Animal } from "../entities/Animal";
import { getConnection } from "typeorm";

const getOne = async (animalId: string, clientId: string, userId: string) => {
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
};

const animalService = {
  getOne,
};

export default animalService;
