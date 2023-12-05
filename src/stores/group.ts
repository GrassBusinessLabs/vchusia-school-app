import {defineStore} from "pinia";
import {Group, JoinGroup} from "@/models/Group";
import GroupApi from "@/http/modules/group"
import router from "@/router";

interface State {
    items: any,
    createdGroup: any,
    allGroups: any,
    myGroups: any,
    idGroup: number,
    usersInGroup: any
}

export const group = defineStore('group', {
    state: (): State =>({
        items: [],
        createdGroup: [],
        allGroups: [],
        myGroups: [],
        idGroup: 0,
        usersInGroup: []
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

        async updateGroup(id, body: Group){
            try {
                const response: any = await GroupApi.updateGroup(id, body)
                console.log(response)
                router.replace('/main/groups')
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
        },

        async getUsersInGroup(id){
            try {
                const response: any = await GroupApi.getUsersInGroup(id)
                this.usersInGroup.push(response.items)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        }
    }
})