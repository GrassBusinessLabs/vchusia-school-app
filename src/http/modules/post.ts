import {Post} from "@/models/Post";
import axios from "../api";

function createPost(body: Post) {
    let courseId = localStorage.getItem('courseId')
    return axios.post(`/courses/${courseId}/post`, body)
}

export default {
    createPost
}