import { axiosJwt } from "./axiosConfig";

export const endpoint = import.meta.env.VITE_SOME_ENDPOINT_API;

export const getLogStat = async () => {
  const data = await axiosJwt.get(`${endpoint}/log/stat`);
  return data;
};


export const getListLog = async (id) => {
  const data = await axiosJwt.get(`${endpoint}/log/list/${id}`);
  return data;
};
