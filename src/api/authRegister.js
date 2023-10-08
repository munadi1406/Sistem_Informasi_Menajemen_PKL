import axios from "axios";
import { axiosJwt } from "./axiosConfig";

const endpoint = import.meta.env.VITE_SOME_ENDPOINT_API;

export const auth = async (email, password) => {
  const data = await axios.post(`${endpoint}/auth`, {
    email,
    password,
  });
  return data;
};

export const register = async (data) => {
  const { username, email, password, confirmPassword } = data;
  const datas = await axios.post(`${endpoint}/users`, {
    username,
    email,
    password,
    confirmPassword
  });
  return datas;
};


export const logout = async()=>{
  const isLogout = await axiosJwt.put(`${endpoint}/logout`)
  return isLogout
}
