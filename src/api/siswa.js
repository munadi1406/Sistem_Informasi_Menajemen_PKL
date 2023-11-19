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
  
  const data = await axiosJwt.post(`${endpoint}/siswa`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const updateSiswa = async (payload) => {
 
  const data = await axiosJwt.put(`${endpoint}/siswa`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const getListSiswa = async (lastNis, query) => {
  const data = await axiosJwt.get(`${endpoint}/siswa/list/${lastNis}${query}`);
  return data;
};

export const searchSiswa = async (lastIdSurat, query) => {
  const data = await axiosJwt.get(
    `${endpoint}/siswa/list/${lastIdSurat}?search=${query}`,
  );
  return data;
};

export const deleteSiswa = async (nis) => {
  const data = await axiosJwt.delete(`${endpoint}/siswa/${nis}`);
  return data;
};

export const detailSiswa = async (nis) => {
  const data = await axiosJwt.get(`${endpoint}/siswa/${nis}`);
  return data;
};

export const countStudent = async ()=>{
  const data = await axiosJwt.get(`${endpoint}/siswa/stat`)
  return data 
}


