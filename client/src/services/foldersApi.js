import api from "./api";

export const getFolders = async () => {
  const { data } = await api.get("/folders");

  return data;
} 