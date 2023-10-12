import { axiosJwt } from "./axiosConfig";


const endpoint = import.meta.env.VITE_SOME_ENDPOINT_API;

export const getListUsers = async (lastIdUsers) => {
  const data = await axiosJwt.get(`${endpoint}/users/list/${lastIdUsers}`);
  return data;
};


export const changeAccountStatus = async (idUsers, status) => {
  console.log(typeof idUsers)
  const data = await axiosJwt.post(`${endpoint}/users/changeAccountStatus`, {
    idUsers,
    status: status === 'active' ? 'inactive' : 'active'
  });
  return data;
}


