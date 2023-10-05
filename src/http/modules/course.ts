import {CourseCreate} from "@/models/Course";
import axios from "../api";

export function createCourse(body: CourseCreate) {
    return axios.post('/courses', body)
}

export default {
    createCourse
}