import {defineStore} from "pinia";
import {Group, JoinGroup} from "@/models/Group";
import GroupApi from "@/http/modules/group"

interface State {
    items: any
}

export const group = defineStore('group', {
    state: (): State =>({
        items: []
    }),

    actions: {
        async createGroup(body: Group){
            try {
                const response = await GroupApi.createGroup(body)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async joinGroup(body: JoinGroup){
            try{
                const response = await GroupApi.joinGroup(body)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        }
    }
})