import {defineStore} from "pinia";
import {Group, JoinGroup} from "@/models/Group";
import GroupApi from "@/http/modules/group"
import router from "@/router";
import CourseApi from "@/http/modules/course";

interface State {
    items: any,
    createdGroup: any,
    allGroups: any,
    myGroups: any,
    allCourses: any,
    idGroup: number | null
    usersInGroup: any,
}

export const group = defineStore('group', {
    state: (): State =>({
        items: [],
        createdGroup: [],
        allGroups: [JSON.parse(localStorage.getItem('allGroups'))],
        myGroups: [],
        allCourses: [],
        usersInGroup: [],
        idGroup: Number(localStorage.getItem('idGroup')) || null,
    }),


    getters: {
        groupId: state => state.idGroup
    },


    actions: {
        async createGroup(body: Group): Promise <void>{
            try {
                this.allGroups = []
                const response = await GroupApi.createGroup(body)
                this.createdGroup.push(response)
                this.getCreatedGroupsList()
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async joinGroup(body: JoinGroup): Promise <void>{
            try{
                const response = await GroupApi.joinGroup(body)
                console.log(response)

            } catch (e) {
                console.log(e)
            }
        },

        async leaveGroup(id: any): Promise <void>{
            try {
                const response: any = await GroupApi.leaveGroup(id)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async updateGroup(id: any, body: Group): Promise <void>{
            try {
                const response: any = await GroupApi.updateGroup(id, body)
                console.log(response)
                router.replace('/main/groups')
            } catch (e) {
                console.log(e)
            }
        },

        async getCreatedGroupsList(page?: any): Promise <void>{
            try {
                this.allGroups = []
                const response: any = await GroupApi.getCreatedGroupsList(page)
                this.allGroups.push(response.items)
                const pagination = {page: 1, count: 10}
                const allCourseResponse = await CourseApi.getAllCourse(pagination)
                this.allCourses = allCourseResponse.items
                localStorage.setItem('allGroups', JSON.stringify(response.items))
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },



        async myGroupsList(): Promise <void>{
            try {
                const response: any = await GroupApi.myGroupsList()
                this.myGroups = response.items
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async deleteGroup(id: any): Promise <void>{
            try {
                const response: any = await GroupApi.deleteGroup(id)
                console.log(response)
                router.replace('/main/groups')
            } catch (e) {
                console.log(e)
            }
        },

        async getUsersInGroup(id: any): Promise <void>{
            try {
                const response: any = await GroupApi.getUsersInGroup(id)
                this.usersInGroup.push(response.items)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async addCourseToGroup(groupId: any, courseId: any): Promise <void>{
            try {
                const response: any = await GroupApi.addCourseToGroup(groupId, courseId)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async removeCourseFromGroup(groupId: any, courseId: any): Promise <void>{
            try {
                const response: any = await GroupApi.removeCourseFromGroup(groupId, courseId)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },



    }
})

