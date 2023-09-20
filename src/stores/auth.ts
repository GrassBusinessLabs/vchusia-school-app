import {defineStore} from "pinia";
import {AuthApi} from "../http/index"
import {Auth, changePassword, Signup} from "@/models/Auth";
import router from '../router/index'
import axios from "axios";

interface State {
    user: any,
    token: string | null
}


export const auth = defineStore('auth', {
    state: (): State => ({
        user: null,
        token: null
    }),
    actions: {
        async login(body: Auth) {
            try {
                const response: any = await AuthApi.login(body)
                localStorage.setItem('token', response.token)
                localStorage.setItem('user', JSON.stringify(response.user))
                console.log(response)
            } catch (e) {
                console.log("Error")
            }
        },

        async logout() {
            try {
                const response: any = await AuthApi.logout()
                this.token = null
                localStorage.clear()
                console.log(response)
                router.replace('/login')
            } catch (e) {
                console.log('Error')
            }

        },

        async signup(body: Signup) {
            try {
                const response: any = await AuthApi.signup(body)
                this.user = response.user
                localStorage.setItem('token', response.token)
                localStorage.setItem('user', JSON.stringify(response.user))
                console.log(response)
            } catch (e) {
                console.log("Error")
            }
        },

         changePassword(body: changePassword){
            const token = localStorage.getItem('token');
            let data = JSON.stringify({
                "oldPassword": body.oldPassword,
                "newPassword": body.newPassword
            });
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://vchusia.grassbusinesslabs.tk/api/v1/auth/change-pwd',
                headers: {
                    'access-control-request-headers': 'authorization,content-type',
                    'access-control-request-method': 'GET',
                    'origin': 'http://192.168.0.111:8100',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                data : data
            };

                console.log(token)
                axios.request(config)
                    .then((response) => {
                        console.log(JSON.stringify(response.data));
                        localStorage.clear();
                        router.replace('/login');
                    })
                    .catch((error) => {
                        console.log(error);
                    });

        }


    }
});
