import { axiosJwt } from "./axiosConfig";
import { endpoint } from "./users";

export const getListSurats = async (lastIdSurat) => {
  const data = await axiosJwt.get(`${endpoint}/surat/list/${lastIdSurat}`);
  return data;
};

export const createSurat = async (payload) => {
  const data = await axiosJwt.post(`${endpoint}/surat`, payload);
  return data;
};

export const getDetailSurat = async (idSurat) => {
  const data = await axiosJwt.get(`${endpoint}/surat/${idSurat}`);
  return data;
};

export const deleteSurat = async (idSurat) => {
  const data = await axiosJwt.delete(`${endpoint}/surat/${idSurat}`);
  return data;
};
export const editSurat = async (payload) => {
  const data = await axiosJwt.put(`${endpoint}/surat`, payload);
  return data;
};

export const searchSurat = async (lastIdSurat, query) => {
  const data = await axiosJwt.get(
    `${endpoint}/surat/list/${lastIdSurat}?jenisSurat=${query}`,
  );
  return data;
};
