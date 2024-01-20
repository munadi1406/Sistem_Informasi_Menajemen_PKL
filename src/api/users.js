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

export const getDetailUsers = async () => {
  const data = await axiosJwt.get(`${endpoint}/users`);
  return data;
};

export const changeUsername = async (payload) => {
  const data = await axiosJwt.post(`${endpoint}/users/changeUsername`, payload);
  return data;
};

export const changePassword = async (payload) => {
  const data = await axiosJwt.post(`${endpoint}/users/changePassword`, payload);
  return data;
};
export const changePasswordForAdmin = async (payload) => {
  const data = await axiosJwt.post(
    `${endpoint}/users/changePasswordForAdmin`,
    payload,
  );
  return data;
};

export const logout = async () => {
  const data = await axiosJwt.put(`${endpoint}/logout`);
  return data;
};


export const evaluateUsers = async (filter)=>{
  const data = await axiosJwt.get(`${endpoint}/users/evaluate${filter}`)
  return data 
}