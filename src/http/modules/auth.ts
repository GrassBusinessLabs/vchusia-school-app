import {Auth, changePassword, Signup} from "@/models/Auth";
import axios from "../api"
function login (body: Auth) {
    return axios.post('auth/login', body)
}

function signup (body: Signup){
    return axios.post('auth/register', body)
}

function logout (){
    return axios.post('auth/logout')
}

function changePassword(body: changePassword) {
    return axios.post('auth/change-pwd', body)
}


export default {
    login,
    signup,
    logout,
    changePassword
}