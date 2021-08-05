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

const userService = {
  get,
};

export default userService;
