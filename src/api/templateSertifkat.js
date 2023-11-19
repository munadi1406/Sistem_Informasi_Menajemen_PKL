import { axiosJwt } from "./axiosConfig";

export const endpoint = import.meta.env.VITE_SOME_ENDPOINT_API;

export const getTemplateSertifikatStat = async () => {
  const data = await axiosJwt.get(`${endpoint}/templateSertifikat/stat`);
  return data;
};

export const getListTemplateSertifikat = async (id, query) => {
  const data = await axiosJwt.get(`${endpoint}/templateSertifikat/list/${id}${query}`);
  return data;
}



export const searchTemplateSertifikat = async (id, query) => {

  const data = await axiosJwt.get(
    `${endpoint}/templateSertifikat/list/${id}?search=${query}`,
  );
  return data;

}

export const storeTemplateSertifkat = async (payload) => {

  const data = await axiosJwt.post(
    `${endpoint}/templateSertifikat`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
  );
  return data;

}
export const updateTemplateSertifkat = async (payload) => {

  const data = await axiosJwt.put(
    `${endpoint}/templateSertifikat`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
  );
  return data;

}
export const detailTemplateSertifikat = async (id) => {

  const data = await axiosJwt.get(
    `${endpoint}/templateSertifikat/${id}`,
  );
  return data;

}
export const deleteTemplateSertifikat = async (id) => {

  const data = await axiosJwt.delete(
    `${endpoint}/templateSertifikat/${id}`,
  );
  return data;

}
