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
    let courseId = localStorage.getItem('courseId')
    return axios.delete(`/courses/${courseId}`)
}

function updateCourse(body: Course){
    let courseId = localStorage.getItem('courseId')
    return axios.put(`/courses/${courseId}`, body)
}

function coursesByGroupId(groupId: any, page?: {page: number, count: number}) {
    if(page){
        return axios.get(`courses/byGroup/${groupId}?page=${page.value.page}&count=${page.value.count}`)
    }
    return axios.get(`courses/byGroup/${groupId}?page=1&count=10`)
}

function groupsByCourseId() {
    let courseId = localStorage.getItem('courseId')
    return axios.get(`/groups/${courseId}`)
}
export default {
    createCourse,
    getAllCourse,
    findCourseById,
    deleteCourse,
    updateCourse,
    coursesByGroupId,
    groupsByCourseId
}