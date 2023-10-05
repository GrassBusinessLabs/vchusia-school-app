import {defineStore} from "pinia";
import router from '../router/index'
import {CourseCreate} from "@/models/Course";
import axios from "axios";

const token = localStorage.getItem('token')

console.log(token)
interface State {
    nameCourse: string,
    nameDis: string | null,
    learnClass: number | null,
    ageFrom: number | null,
    ageTo: number | null
}

export const course = defineStore('course', {
    state: (): State => ({
        nameCourse: '',
        nameDis: '',
        learnClass: null,
        ageFrom: null,
        ageTo: null
    }),

    actions: {
        createCourse(body: CourseCreate){
            let data = JSON.stringify({
                "name": body.nameCourse,
                "discipline": body.nameDis,
                "grade": body.learnClass,
                "yearsFrom": body.ageFrom,
                "yearsTo": body.ageTo
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://vchusia.grassbusinesslabs.tk/api/v1/courses',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                data : data
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    },
});