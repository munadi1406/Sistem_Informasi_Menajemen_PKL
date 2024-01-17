import { axiosJwt } from "./axiosConfig";

export const endpoint = import.meta.env.VITE_SOME_ENDPOINT_API;

export const getSertifikatStat = async (query) => {
  const data = await axiosJwt.get(`${endpoint}/sertifikat/grup${query}`);
  return data;
};


export const storeSertifikat = async (payload) => {
  const data = await axiosJwt.post(`${endpoint}/sertifikat`,payload);
  return data;
};


export const getListHistorySertifikat = async (id,query) => {
  const data = await axiosJwt.get(`${endpoint}/sertifikat/list/${id}${query}`);
  return data;
};

