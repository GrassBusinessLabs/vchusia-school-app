import {Course} from "@/models/Course";
import axios from "../api";

function createCourse(body: Course) {
    return axios.post('/courses', body)
}

function getAllCourse(page?: {page: number, count: number}) {
    if(page){
        return axios.get(`/courses?page=${page.page}&count=${page.count}`)
    }
    return axios.get('/courses?page=1&count=5')
}

function findCourseById(){
    let courseId = localStorage.getItem('courseId')
    return axios.get(`/courses/${courseId}`)
}

function deleteCourse(){
    return axios.delete('/courses')
}

function updateCourse(){
    return axios.put('/courses')

}
export default {
    createCourse,
    getAllCourse,
    findCourseById,
    deleteCourse,
    updateCourse
}