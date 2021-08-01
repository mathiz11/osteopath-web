const login = async (email: string, password: string) => {
  console.log(JSON.stringify({ email, password }));
  return await fetch(process.env.REACT_APP_API_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

const authService = {
  login,
};

export default authService;
