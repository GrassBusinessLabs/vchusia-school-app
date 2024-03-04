import {defineStore} from "pinia";
import MessageApi from '../http/modules/message'
import {ShareMessage} from "@/models/Message";
interface State {
    allMessages: any,
    msgId: number,
    thisMessage: any,
}
export const  message = defineStore('message', {
    state: (): State => ({
        allMessages: [],
        msgId: 0,
        thisMessage: [],
    }),

    actions: {
        async shareMessage(body: ShareMessage){
            try {
                const response = await MessageApi.shareMessage(body)
                this.msgId = response.id
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async userMessages(filter: string){
            try {
                const response = await MessageApi.userMessages(filter)
                this.allMessages = [...response.items]
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        }






    }
})
