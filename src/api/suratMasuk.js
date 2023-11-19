import { axiosJwt } from "./axiosConfig";

export const endpoint = import.meta.env.VITE_SOME_ENDPOINT_API;

export const getListSuratMasuk = async (id, query) => {
  const data = await axiosJwt.get(`${endpoint}/suratMasuk/list/${id}${query}`);
  return data;
};
export const storeSuratMasuk = async (payload) => {
  const data = await axiosJwt.post(`${endpoint}/suratMasuk`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
export const updateSuratMasuk = async (payload) => {
  const data = await axiosJwt.put(`${endpoint}/suratMasuk`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const searchTemplateSertifikat = async (id, query) => {
  const data = await axiosJwt.get(
    `${endpoint}/templateSertifikat/list/${id}?search=${query}`,
  );
  return data;
};

export const detailSuratMasuk = async (id) => {
  const data = await axiosJwt.get(`${endpoint}/suratMasuk/${id}`);
  return data;
};

export const deleteSuratMasuk = async (id) => {
  const data = await axiosJwt.delete(`${endpoint}/suratMasuk/${id}`);
  return data;
};
