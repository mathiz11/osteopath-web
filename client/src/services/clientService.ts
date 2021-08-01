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

const clientService = { getAll };

export default clientService;
