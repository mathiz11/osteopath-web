import { ClientValues } from "../schemas/clientSchema";
import { fetchManager } from "./globalService";

const getAll = async (): Promise<Response> => {
  return fetchManager({
    url: process.env.REACT_APP_API_URL + "/clients",
    options: {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
};

const getOne = async (id: number): Promise<Response> => {
  return fetchManager({
    url: process.env.REACT_APP_API_URL + "/clients/" + id,
    options: {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
};

const create = async (client: ClientValues): Promise<Response> => {
  return fetchManager({
    url: process.env.REACT_APP_API_URL + "/clients",
    options: {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
    body: JSON.stringify(client),
  });
};

const edit = async (client: ClientValues): Promise<Response> => {
  return fetchManager({
    url: process.env.REACT_APP_API_URL + "/clients",
    options: {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
    body: JSON.stringify(client),
  });
};

const clientService = { getAll, getOne, create, edit };

export default clientService;
