import { AnimalType } from "../entities/Animal";
import { AnimalValues } from "../schemas/animalSchema";
import { fetchManager } from "./globalService";

const checkAnimalValues = (animal: AnimalValues) => {
  if (animal.type !== AnimalType.NAC && animal.subtype) {
    animal.subtype = null;
  }
  return animal;
};

const getOne = async (
  clientId: number,
  animalId: number
): Promise<Response> => {
  return fetchManager({
    url:
      process.env.REACT_APP_API_URL +
      "/clients/" +
      clientId +
      "/animals/" +
      animalId,
    options: {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
};

const create = async (
  clientId: number,
  animal: AnimalValues
): Promise<Response> => {
  return fetchManager({
    url: process.env.REACT_APP_API_URL + "/clients/" + clientId + "/animals",
    options: {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
    body: JSON.stringify(checkAnimalValues(animal)),
  });
};

const edit = async (
  clientId: number,
  animal: AnimalValues
): Promise<Response> => {
  return fetchManager({
    url: process.env.REACT_APP_API_URL + "/clients/" + clientId + "/animals",
    options: {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
    body: JSON.stringify(checkAnimalValues(animal)),
  });
};

const remove = async (
  clientId: number,
  animalId: number
): Promise<Response> => {
  return fetchManager({
    url:
      process.env.REACT_APP_API_URL +
      "/clients/" +
      clientId +
      "/animals/" +
      animalId,
    options: {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
};

const animalService = {
  getOne,
  create,
  edit,
  remove,
};

export default animalService;
