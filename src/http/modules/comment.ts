import {Comment} from "@/models/Comment";
import axios from "../api";

function commentMessage(msgId: number, body: Comment)  {
    return axios.post(`/comments/message/${msgId}`, body)
}
function commentSolution(solutionId: number, body: Comment) {
    return axios.post(`/comments/solution/${solutionId}`, body)
}
function updateComment(commentId: number, body: Comment) {
    return axios.put(`/comments/${commentId}`, body)
}
function deleteComment(commentId: number) {
   return axios.delete(`/comments/${commentId}`)
}
function findByMessageId(msgId: number) {
    return axios.get(`/comments/message/${msgId}`)
}
function findBySolutionId(solutionId: number) {
    return axios.get(`/comments/solution/${solutionId}`)
}
function findById(commentId: number) {
    return axios.get(`/comments/${commentId}`)
}

export default {
    commentMessage,
    commentSolution,
    updateComment,
    deleteComment,
    findByMessageId,
    findBySolutionId,
    findById
}