import { UserValues } from "../schemas/userSchema";
import { fetchManager } from "./globalService";

const get = () => {
  return fetchManager({
    url: process.env.REACT_APP_API_URL + "/users",
    options: {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
};

const edit = async (user: UserValues): Promise<Response> => {
  return fetchManager({
    url: process.env.REACT_APP_API_URL + "/users",
    options: {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
    body: JSON.stringify(user),
  });
};

const userService = {
  get,
  edit,
};

export default userService;
