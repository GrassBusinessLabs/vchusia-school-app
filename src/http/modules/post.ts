import {Post} from "@/models/Post";
import axios from "../api";

function createPost(body: Post) {
    let courseId: string | null = localStorage.getItem('courseId')
    return axios.post(`/courses/${courseId}/post`, body)
}

function findPostWithRow() {
    let courseId: string | null = localStorage.getItem('courseId')
    return axios.get(`/courses/${courseId}/post`)

}

export default {
    createPost,
    findPostWithRow
}