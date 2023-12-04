import axios from "../api";
import {Group, JoinGroup} from "@/models/Group";

function createGroup(body: Group) {
    return axios.post('/group', body)
}
function joinGroup(body: JoinGroup) {
    return axios.post('/groups/joinGroup', body)
}

function leaveGroup(id) {
    return axios.delete(`/groups/${id}/leaveGroup`)
}

function updateGroup(body: Group) {
    return axios.put('/group/:groupid', body)
}

function getCreatedGroupsList() {
    return axios.get('/groups?page=1&count=40')
}

function myGroupsList() {
    return axios.get('/users/groups')
}

function deleteGroup(id) {
    return axios.delete(`/group/${id}`)
}
export default {
    createGroup,
    joinGroup,
    leaveGroup,
    updateGroup,
    getCreatedGroupsList,
    myGroupsList,
    deleteGroup
}