import {defineStore} from "pinia";
import {Course} from "@/models/Course";
import CourseApi from "@/http/modules/course";
import {AxiosResponse} from "axios";


const token = localStorage.getItem('token')

console.log(token)

interface State {
    items: any,
    total: number,
    thisCourse: any,
    courseInGroup: any,
}


export const course = defineStore('course', {
    state: (): State => ({
        items: [],
        total: 0,
        thisCourse: [],
        courseInGroup: [],
    }),

    getters: {
        courses: state => state.items
    },

    actions: {
        async createCourse(body: Course) {
            try {
                const response = await CourseApi.createCourse(body)
                console.log(response)
                this.items.push(response)
                console.log(this.items)

            } catch (e) {
                console.log(e)

            }

        },

        async getAllCourse(page?:{page: number, count: number}){
            try {
                const response: any = await CourseApi.getAllCourse(page)
                this.items = response.items
                this.total = response.total
                console.log(response)
            }catch (e) {
                console.log(e)
            }
        },

        async findCourseById(){
            try {
                const response = await CourseApi.findCourseById()
                this.thisCourse.push(response)
                console.log(response)
            }catch (e) {
                console.log(e)
            }
        },

        async deleteCourse(){
            try {
                const response = await CourseApi.deleteCourse()
                console.log(response)
            }catch (e) {
                console.log(e)
            }
        },

        async updateCourse(body: Course){
            try {
                const response = await CourseApi.updateCourse(body)
                console.log(response)
            }catch (e) {
                console.log(e)
            }
        },

        async coursesByGroupId(groupId: any){
            try {
                const response = await CourseApi.coursesByGroupId(groupId)
                this.courseInGroup = response.items
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        }

    },
});