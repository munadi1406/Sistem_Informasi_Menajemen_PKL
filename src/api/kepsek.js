import { axiosJwt } from "./axiosConfig";
import { endpoint } from "./users";

export const getDetailKepsek = async () => {
  const data = await axiosJwt.get(`${endpoint}/kepsek`);
  return data;
};
export const storeDetailKepsek = async (payload) => {
  const data = await axiosJwt.post(`${endpoint}/kepsek`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
