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