import { axiosJwt } from "./axiosConfig";
import { endpoint } from "./users";

export const storeDataSiswaWithXlsx = async (payload) => {
  const data = await axiosJwt.post(`${endpoint}/siswa/xlx`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
export const storeDataSiswa = async (payload) => {
  console.log(payload);
  const data = await axiosJwt.post(`${endpoint}/siswa`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const getListSiswa = async (lastNis,query) => {
  const data = await axiosJwt.get(`${endpoint}/siswa/list/${lastNis}${query}`);
  return data;
};

export const searchSurat = async (lastIdSurat, query) => {
  const data = await axiosJwt.get(
    `${endpoint}/siswa/list/${lastIdSurat}${query}`,
  );
  return data;
};
