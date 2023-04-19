import api from "./api";

export const listFiles = async (id) => {
  const { data } = await api.get(`/files/${id}`);

  return data;
}

export const createFile = async (id) => {
  const { data } = await api.post(`/files/${id}`);

  return data;
}

export const deleteFile = async (id) => {
  const { data } = await api.delete(`/files/${id}`);

  return data;
}