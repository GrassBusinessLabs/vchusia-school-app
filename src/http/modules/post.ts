import {Post, UpdatePost} from "@/models/Post";
import axios from "../api";

function createPost(body: Post) {
    let courseId: string | null = localStorage.getItem('courseId')
    return axios.post(`/courses/${courseId}/post`, body)
}

function findPostWithRow() {
    let courseId: string | null = localStorage.getItem('courseId')
    return axios.get(`/courses/${courseId}/post`)

}

function updatePost(body: UpdatePost) {
    let postId: string | null = localStorage.getItem('idPost')
    return axios.put(`/post/${postId}`, body)
}

function deletePost() {
    let postId: string | null = localStorage.getItem('idPost')
    return axios.delete(`/post/${postId}`)
}
export default {
    createPost,
    findPostWithRow,
    updatePost,
    deletePost

}