import { UpdateSolution } from "@/models/Solution";
import axios from "../api";
import {solution} from "@/stores/solution";


function attachImage() {
    let solutionId = solution().solutionInfo.id
    return axios.post(`/solution/${solutionId}/addImage`, solution().file)
}

function updateStatus(solutionId: number) {
    return axios.put(`/solution/updateStatus/${solutionId}`)
}

function updateSolution(body: UpdateSolution, solutionId: number) {
    return axios.put(`/solution/${solutionId}`, body)
}

function deleteSolution(solutionId: number) {

    return axios.delete(`/solution/${solutionId}`)
}

function deleteImage(imgId: number) {
    return axios.delete(`/solution/${imgId}/deleteImage`)
}

function findSolutionById(solutionId: number) {
    return axios.get(`/solution/${solutionId}`)
}

function findSolutionsUsers(msgId: number) {
    return axios.get(`/solution/messageId/${msgId}`)
}

function findSolutionByMessageId(msgId: number) {
    return axios.get(`/solution/message/${msgId}`)
}

export default {
    attachImage,
    updateStatus,
    updateSolution,
    deleteSolution,
    deleteImage,
    findSolutionById,
    findSolutionsUsers,
    findSolutionByMessageId

}