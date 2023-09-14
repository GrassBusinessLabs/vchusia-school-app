// import axios from "axios";
import {Auth} from "@/models/Auth";
import axios from "../api"
function login (body: Auth) {
    return axios.post('auth/login', body)
}

export default {
    login
}