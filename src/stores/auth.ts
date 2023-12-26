import {defineStore} from "pinia";
import AuthApi from "../http/modules/auth"
import {Auth, changeMe, changePassword, Signup} from "@/models/Auth";
import router from '../router/index'

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
                this.user = response
                this.token = response.token
                const userData = JSON.parse(localStorage.getItem('user'));
                if (userData.role === "TEACHER") {
                    router.replace('/main/courses')
                } else {
                    router.replace('/main/feed-student')
                }
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async logout() {
            try {
                const response = await AuthApi.logout()
                console.log(response)
                localStorage.clear()
                router.replace('/auth/start')
            } catch (e) {
                localStorage.clear()
                router.replace('/auth/start')
            }

        },

        async signup(body: Signup) {
            try {
                const response: any = await AuthApi.signup(body)
                this.user = response.user
                localStorage.setItem('token', response.token)
                localStorage.setItem('user', JSON.stringify(response.user))
                console.log(response)
                if (response.user.role === "TEACHER") {
                    router.replace('/main/courses')
                } else {
                    router.replace('/main/courses')

                }
            } catch (e) {
                console.log("Error")
            }
        },

        async changePassword(body: changePassword) {
            try {
                const response: any = await AuthApi.changePassword(body)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async changeMe(body: changeMe){
            try {
                const response = await AuthApi.changeMe(body)
                console.log(response)
            }catch (e) {
                console.log(e)
            }
        },
        async deleteAccount(){
            try {
                const response = await AuthApi.deleteAccount()
                localStorage.clear()
                router.push('/auth/start')
                console.log(response)
            }catch (e) {
                console.log(e)
            }
        }


    }
});
