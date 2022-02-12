import { CardValues } from "../schemas/cardSchema";
import { fetchManager } from "./globalService";

const sendFile = async (
  formData: FormData | undefined,
  card: CardValues
): Promise<CardValues> => {
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

  return card;
};

const deleteFile = async (
  clientId: string,
  animalId: string,
  cardId: string
): Promise<void> => {
  await fetchManager({
    url:
      process.env.REACT_APP_API_URL +
      "/clients/" +
      clientId +
      "/animals/" +
      animalId +
      "/cards/" +
      cardId +
      "/schema",
    options: {
      method: "DELETE",
      credentials: "include",
    },
  });
};

const create = async (
  clientId: string,
  animalId: string,
  cardValues: CardValues,
  formData: FormData | undefined
): Promise<Response> => {
  let card = { ...cardValues };

  if (card.schema) {
    delete card.schema;
  }

  if (formData) {
    card = await sendFile(formData, card);
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

const update = async (
  clientId: string,
  animalId: string,
  cardValues: CardValues,
  formData: FormData | undefined
): Promise<Response> => {
  let card = { ...cardValues };

  if (card.schema) {
    delete card.schema;
  }

  if (card.id && card.schemaFilename && formData) {
    await deleteFile(clientId, animalId, card.id.toLocaleString());
  }

  if (formData) {
    card = await sendFile(formData, card);
  }

  return await fetchManager({
    url:
      process.env.REACT_APP_API_URL +
      "/clients/" +
      clientId +
      "/animals/" +
      animalId +
      "/cards/" +
      cardValues.id,
    options: {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
    body: JSON.stringify(cardValues),
  });
};

const cardService = {
  create,
  update,
};

export default cardService;
