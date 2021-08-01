import { LoginValues } from "../schemas/loginSchema";
import { fetchData, fetchManager } from "./globalService";

const login = (login: LoginValues): Promise<Response> => {
  return fetchManager({
    url: process.env.REACT_APP_API_URL + "/auth/login",
    options: {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
    body: JSON.stringify(login),
  });
};

const getNewAccessToken = (): Promise<Response> => {
  return fetchData({
    url: process.env.REACT_APP_API_URL + "/auth/refresh-token",
    options: {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
};

const authService = {
  login,
  getNewAccessToken,
};

export default authService;
