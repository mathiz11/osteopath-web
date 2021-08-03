import authService from "./authService";

type FetchOptions = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  credentials?: RequestCredentials;
  headers?: HeadersInit;
};

export type FetchParams = {
  url: string;
  options: FetchOptions;
  body?: BodyInit;
};

export const fetchData = ({
  url,
  options,
  body,
}: FetchParams): Promise<Response> => {
  return fetch(url, { ...options, body });
};

export const fetchManager = async (
  fetchParams: FetchParams
): Promise<Response> => {
  let response = await fetchData(fetchParams);

  if (response.status === 401) {
    const responseNewAccessToken = await authService.getNewAccessToken();

    if (responseNewAccessToken.status === 401) {
      window.location.pathname = "/login";
    } else if (responseNewAccessToken.ok) {
      response = await fetchData(fetchParams);
    }
  } else if (response.status === 404) {
    window.location.pathname = "/login";
  }

  return response;
};
