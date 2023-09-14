import {defineStore} from "pinia";
import {AuthApi} from "../http/index"
import {Auth} from "@/models/Auth";

interface State{
    user: any,
    token: string | null
}
export const auth = defineStore('auth',{
    state: (): State => ({
        user: null,
        token: null
    }),

    getters: {

    },

    actions: {
        async login(body: Auth){
            try{
                const response : any = await AuthApi.login(body)
                this.user = response.user
                localStorage.setItem('token', response.token)
                console.log(response)
            }catch (e){
                console.log("Error")
            }
        }
    }
})