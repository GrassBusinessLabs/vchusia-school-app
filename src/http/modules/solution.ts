import {SaveSolution} from "@/models/Solution";
import axios from "../api";
import {solution} from "@/stores/solution";



function saveSolution(body: SaveSolution) {
    let gpId: number = solution().gpId
    return axios.post(`/solution/${gpId}`, body)
}

export default {
    saveSolution
}