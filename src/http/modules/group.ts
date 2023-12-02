import axios from "../api";
import {Group, JoinGroup} from "@/models/Group";

function createGroup(body: Group) {
    return axios.post('/group', body)
}
function joinGroup(body: JoinGroup) {
    return axios.post('/groups/joinGroup', body)
}

export default {
    createGroup,
    joinGroup
}