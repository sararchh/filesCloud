import api from "./api";

export const getFolders = async () => {
  const { data } = await api.get("/folders");

  return data;
} 

export const deleteFolder = async (id) => {
  const { data } = await api.delete(`/folders/id`);

  return data;
} 