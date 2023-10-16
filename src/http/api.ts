import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_AXIOS_BASE_URL ?? "localhost"
})

instance.interceptors.request.use((config: any) => {
    let token: string = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config
})

instance.interceptors.response.use((v) => {
    if (v.data?.code === 401) {
        localStorage.removeItem('token')
        return v.data
    }
    if (v.data?.code === 402 || v.data?.code === 403 || v.data?.code === 404 || v.data?.code === 422 || v.data?.code === 500) {
        return Promise.reject(v?.data)
    }


    return v.data
})
export default instance
