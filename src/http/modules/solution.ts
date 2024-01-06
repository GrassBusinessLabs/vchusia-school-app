import {SaveSolution} from "@/models/Solution";
import axios from "../api";
import {solution} from "@/stores/solution";



function saveSolution(body: SaveSolution) {
    let gpId: number = solution().gpId
    return axios.post(`/solution/${gpId}`, body)
}

function attachImage() {
    return axios.post(`/solution/1/addImage`, solution().file)
}

export default {
    saveSolution,
    attachImage
}