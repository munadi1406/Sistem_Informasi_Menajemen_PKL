import { axiosJwt } from "./axiosConfig";

export const endpoint = import.meta.env.VITE_SOME_ENDPOINT_API;

export const getListUsers = async (lastIdUsers) => {
  const data = await axiosJwt.get(`${endpoint}/users/list/${lastIdUsers}`);
  return data;
};

export const changeAccountStatus = async (idUsers, status) => {
  const statusIsChange = status === "active" ? "inactive" : "active";
  const data = await axiosJwt.post(`${endpoint}/users/changeAccountStatus`, {
    idUsers,
    status: statusIsChange,
  });
  return data;
};
export const searchUsers = async (username) => {
  const data = await axiosJwt.post(`${endpoint}/users/search`, {
    username,
  });
  return data;
};

export const changeRole = async (idUsers, role) => {
  const data = await axiosJwt.post(`${endpoint}/users/changeRole`, {
    idUsers,
    role: String(role),
  });
  return data;
};

export const countUsers = async () => {
  const data = await axiosJwt.get(`${endpoint}/users/count`);
  return data;
};
export const countThisWeek = async () => {
  const data = await axiosJwt.get(`${endpoint}/users/countthisweek`);
  return data;
};
