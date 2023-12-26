import {Post, sharePost, UpdatePost} from "@/models/Post";
import {post} from "@/stores/post";


import axios from "../api";
import {course} from "@/stores/course";



function createPost(body: Post) {
    let courseId: string | null = localStorage.getItem('courseId')
    return axios.post(`/courses/${courseId}/post`, body)
}

function findPostWithRow() {
    let courseId: string | null = localStorage.getItem('courseId')
    return axios.get(`/courses/${courseId}/post`)
}

function findPostWithRowGroupCourse() {
    const courseId = course().thisCourse.id
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

function getPosts(page?: {page: number, count: number}, groupId?: any, courseId?: any) {
    if(groupId && courseId !== undefined){
        return axios.get(`/post/getPosts?page=1&count=10&groupId=${groupId}&courseId=${courseId}`)
    } else{
        return axios.get(`/post/getPosts?page=${page?.page}&count=${page?.count}`)
    }
}
export default {
    createPost,
    findPostWithRow,
    updatePost,
    deletePost,
    sharePost,
    findPostWithRowGroupCourse,
    getPosts

}