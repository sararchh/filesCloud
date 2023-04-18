import api from "./api";

export const getFolders = async () => {
  const { data } = await api.get("/folders");

  return data;
}

export const deleteFolder = async (id) => {
  const { data } = await api.delete(`/folders/${id}`);

  return data;
}

export const updateFolder = async (id, body) => {
  const { data } = await api.put(`/folders/${id}`, body);

  return data;
} 

export const createFolder = async (title) => {
  const { data } = await api.post(`/folders`, title);

  return data;
} 