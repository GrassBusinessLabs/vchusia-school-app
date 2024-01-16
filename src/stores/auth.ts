import {defineStore} from "pinia";
import AuthApi from "../http/modules/auth"
import {Auth, changeMe, changePassword, Signup} from "@/models/Auth";
import router from '../router/index'
import { useToast } from "vue-toastification";

const toast = useToast()
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
        errorLogin(text){
            toast.error(text, {
                position: "top-right",
                timeout: 3048,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
            });
        },

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
                if(e.response.data.error == "Key: 'AuthRequest.Email' Error:Field validation for 'Email' failed on the 'required' tag"){
                    this.errorLogin("Введіть пошту!")
                }
                if (e.response.data.error == "Key: 'AuthRequest.Password' Error:Field validation for 'Password' failed on the 'required' tag"){
                    this.errorLogin("Введіть пароль!")
                }
                if(e.response.data.error == "upper: no more rows in this result set"){
                    this.errorLogin("Ви ввелі невірні дані")
                }
                if (e.response.data.error == "invalid credentials"){
                    this.errorLogin("Ви ввелі невірні дані")
                }
                else{
                    this.errorLogin("Введіть пошту та пароль!")
                }

                console.log(e.response.data)
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
        async getMe(){
          try {
              const response = await AuthApi.getMe()
              this.user.user = response
              console.log(response)
          }  catch (e) {
              console.log(e)
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
                if (e.response.data.error == "invalid credentials"){
                    this.errorLogin('Такий обліковий запис уже зареєстровано!')
                }
                console.log(e)
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
