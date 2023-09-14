import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://vchusia.grassbusinesslabs.tk/api/v1/'
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
    if (v.status === 200) {
        return v.data
    }

    return Promise.reject(v)
})
export default instance
