import {SaveSolution, UpdateSolution} from "@/models/Solution";
import axios from "../api";
import {solution} from "@/stores/solution";



function saveSolution(body: SaveSolution) {
    let gpId: number = solution().gpId
    return axios.post(`/solution/${gpId}`, body)
}

function attachImage() {
    return axios.post(`/solution/1/addImage`, solution().file)
}

function updateStatus(solutionId: number) {
    return axios.put(`/solution/updateStatus/${solutionId}`)
}

function updateSolution(body: UpdateSolution, solutionId: number) {
    return axios.put(`/solution/${solutionId}`, body)
}
function deleteSolution(solutionId: number){
    return axios.delete(`/solution/${solutionId}`)
}
function deleteImage(imgId: number) {
    return axios.delete(`/solution/${imgId}/deleteImage`)
}
function findSolutionById(solutionId: number) {
    return axios.get(`/solution/${solutionId}`)
}
export default {
    saveSolution,
    attachImage,
    updateStatus,
    updateSolution,
    deleteSolution,
    deleteImage,
    findSolutionById
}