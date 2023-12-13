import {Post, sharePost, UpdatePost} from "@/models/Post";
import {post} from "@/stores/post";


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
    let postId: number | null = post().idPostsNow
    return axios.put(`/post/${postId}`, body)
}

function deletePost() {
    let postId: number | null = post().idPostsNow
    return axios.delete(`/post/${postId}`)
}

function sharePost(body: sharePost) {
    let postId: number | null = post().idPostsNow
    return axios.post(`/post/${postId}/group`, body)
}
export default {
    createPost,
    findPostWithRow,
    updatePost,
    deletePost,
    sharePost

}