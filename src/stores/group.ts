import {defineStore} from "pinia";
import {Group, JoinGroup} from "@/models/Group";
import GroupApi from "@/http/modules/group"

interface State {
    items: any,
    createdGroup: any,
    allGroups: any,
    myGroups: any
}

export const group = defineStore('group', {
    state: (): State =>({
        items: [],
        createdGroup: [],
        allGroups: [],
        myGroups: []
    }),

    actions: {
        async createGroup(body: Group){
            try {
                const response = await GroupApi.createGroup(body)
                this.createdGroup.push(response)
                location.reload()
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async joinGroup(body: JoinGroup){
            try{
                const response = await GroupApi.joinGroup(body)
                console.log(response)
                location.reload()

            } catch (e) {
                console.log(e)
            }
        },

        async leaveGroup(id){
            try {
                const response: any = await GroupApi.leaveGroup(id)
                console.log(response)
                location.reload()

            } catch (e) {
                console.log(e)
            }
        },

        async updateGroup(body: Group){
            try {
                const response: any = await GroupApi.updateGroup(body)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async getCreatedGroupsList(){
            try {
                const response: any = await GroupApi.getCreatedGroupsList()
                this.allGroups.push(response.items)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async myGroupsList(){
            try {
                const response: any = await GroupApi.myGroupsList()
                this.myGroups.push(response.items)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async deleteGroup(id){
            try {
                const response: any = await GroupApi.deleteGroup(id)
                console.log(response)
                location.reload()
            } catch (e) {
                console.log(e)
            }
        }
    }
})