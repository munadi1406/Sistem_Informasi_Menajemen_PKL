import { axiosJwt } from "./axiosConfig";

export const endpoint = import.meta.env.VITE_SOME_ENDPOINT_API;

export const getListSuratKeluar = async (id, query) => {
  const data = await axiosJwt.get(`${endpoint}/suratKeluar/list/${id}${query}`);
  return data;
};
export const storeSuratKeluar = async (payload) => {
  const data = await axiosJwt.post(`${endpoint}/suratKeluar`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
export const updateSuratKeluar = async (payload) => {
  const data = await axiosJwt.put(`${endpoint}/suratKeluar`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const detailSuratKeluar = async (id) => {
  const data = await axiosJwt.get(`${endpoint}/suratKeluar/${id}`);
  return data;
};

export const deleteSuratKeluar = async (id) => {
  const data = await axiosJwt.delete(`${endpoint}/suratKeluar/${id}`);
  return data;
};
