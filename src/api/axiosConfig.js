import axios from "axios";

const endpoint = import.meta.env.VITE_SOME_ENDPOINT_API
export const axiosJwt = axios.create()
axiosJwt.interceptors.request.use(
    function (config){
        const accessToken = sessionStorage.getItem('at')
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        return config;
    },
    function (error){
        throw error;
    }
)

axiosJwt.interceptors.response.use(
    function (response){
        return response
    },
    async function (error){
        if(error.response.status === 401){
            await newAccessToken()
            const originalRequest = error.config
            return await axiosJwt(originalRequest)
        }
        throw error;
    }
)




export const newAccessToken = async ()=>{
    const refreshToken = sessionStorage.getItem('rt');
    const {data} =await axios.post(`${endpoint}/new-access-token`,{
        refreshToken
    })
    sessionStorage.setItem('at',data.accessToken);
}
