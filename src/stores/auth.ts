import {defineStore} from "pinia";
import {AuthApi} from "../http/index"
import {Auth, Signup} from "@/models/Auth";
import router from '../router/index'
import {body} from "ionicons/icons";

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
                console.log(response)
            } catch (e) {
                console.log("Error")
            }
        }


    }
});
