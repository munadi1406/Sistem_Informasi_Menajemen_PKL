import { axiosJwt } from "./axiosConfig";
import { endpoint } from "./users";




export const getListTemplate = async (lastIdTemplate) => {
    const data = await axiosJwt.get(`${endpoint}/template/${lastIdTemplate}`);
    return data;
};
export const getTemplateById = async (idTemplate) => {
    const data = await axiosJwt.get(`${endpoint}/templateById/${idTemplate}`);
    return data;
};
export const createTemplate = async (payload) => {
    const data = await axiosJwt.post(`${endpoint}/template`,payload);
    return data;
};
export const editTemplate = async (payload) => {
    const data = await axiosJwt.put(`${endpoint}/template`,payload);
    return data;
};
export const searchTemplate = async (jenisSurat) => {
 
    const data = await axiosJwt.post(`${endpoint}/template/search`, {
     jenisSurat
    });
    return data;
  }