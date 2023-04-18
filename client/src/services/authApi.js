import api from "./api"

export const SignUp = async (values) => {
  const { data } = await api.post("/sign-up", values);

  localStorage.setItem("@TOKEN", data.token);
  localStorage.setItem("@MAIL", JSON.stringify(data.user));

  return data;
}

export const SignIn = async (values) => {
  const { data } = await api.post("/sign-in", values);

  localStorage.setItem("@TOKEN", data.token);
  localStorage.setItem("@MAIL", JSON.stringify(data.user));

  return data;
} 