import {defineStore} from "pinia";
import MessageApi from '../http/modules/message'
import {ShareMessage} from "@/models/Message";
interface State {
    allMessages: any
}
export const  message = defineStore('message', {
    state: (): State => ({
        allMessages: []
    }),

    actions: {
        async shareMessage(body: ShareMessage){
            try {
                const response = await MessageApi.shareMessage(body)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async userMessages(){
            try {
                const response = await MessageApi.userMessages()
                this.allMessages = [...response.items]
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        }






    }
})
