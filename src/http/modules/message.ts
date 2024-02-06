import {ShareMessage} from "@/models/Message";
import axios from '../api';

function shareMessage(body: ShareMessage) {
    return axios.post('/messages/share', body)
}

function userMessages(courseId?: number, groupId?: number) {
    if (courseId && groupId) {
        return axios.get(`/messages/getMessages?page=1&count=10&courseId=${courseId}&groupId=${groupId}`)
    }
    return axios.get('/messages/getMessages?page=1&count=10')
}


export default {
    shareMessage,
    userMessages
}