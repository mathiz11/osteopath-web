import { Card } from "../entities/Card";
import { CardValues } from "../schemas/cardSchema";
import { fetchManager } from "./globalService";

const create = async (
  clientId: string,
  animalId: string,
  cardValues: CardValues,
  formData: FormData | undefined
): Promise<Response> => {
  let card = { ...cardValues };
  delete card.schema;

  if (formData) {
    const response = await fetchManager({
      url: process.env.REACT_APP_API_URL + "/files",
      options: {
        method: "POST",
        credentials: "include",
      },
      body: formData,
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      card.schemaFilename = jsonResponse.filename;
    }
  }

  return await fetchManager({
    url:
      process.env.REACT_APP_API_URL +
      "/clients/" +
      clientId +
      "/animals/" +
      animalId +
      "/cards",
    options: {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
    body: JSON.stringify(card),
  });
};

const cardService = {
  create,
};

export default cardService;
