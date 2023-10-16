import {defineStore} from "pinia";
import {Course} from "@/models/Course";
import CourseApi from "@/http/modules/course";


const token = localStorage.getItem('token')

console.log(token)

interface State {
    items: any,
    total: number
}


export const course = defineStore('course', {
    state: (): State => ({
        items: [],
        total: 0
    }),

    getters: {
        courses: state => state.items
    },

    actions: {
        async createCourse(body: Course) {
            try {
                const response = await CourseApi.createCourse(body)
                console.log("!!!")
                console.log(response)
                this.items.push(response)
                console.log(this.items)

            } catch (e) {
                console.log(e)

            }

        },

        async getAllCourse(page?:{page: number, count: number}){
            try {
                const response = await CourseApi.getAllCourse(page)
                this.items = response.items
                this.total = response.total
                console.log(response)
            }catch (e) {
                console.log(e)
            }
        },

    },
});