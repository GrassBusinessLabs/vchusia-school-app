import {Post} from "@/models/Post";
import axios from "../api";

function createPost(body: Post) {
    return axios.post('/post', body)
}

export default {
    createPost
}