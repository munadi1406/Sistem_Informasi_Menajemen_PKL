import { axiosJwt } from "./axiosConfig";

export const endpoint = import.meta.env.VITE_SOME_ENDPOINT_API;

export const getTemplateSertifikatStat = async () => {
  const data = await axiosJwt.get(`${endpoint}/templateSertifikat/stat`);
  return data;
};
