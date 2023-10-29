import { axiosJwt } from "./axiosConfig"
import { endpoint } from "./users"

export const tandaTangan = async(payload)=>{
    const data = await axiosJwt.post(`${endpoint}/tandaTangan`,payload)
    return data
}