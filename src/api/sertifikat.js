import { axiosJwt } from "./axiosConfig";

export const endpoint = import.meta.env.VITE_SOME_ENDPOINT_API;

export const getSertifikatStat = async () => {
  const data = await axiosJwt.get(`${endpoint}/sertifikat/stat`);
  return data;
};


export const storeSertifikat = async (payload) => {
  const data = await axiosJwt.post(`${endpoint}/sertifikat`,payload);
  return data;
};
