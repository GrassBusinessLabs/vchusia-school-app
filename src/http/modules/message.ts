import {ShareMessage} from "@/models/Message";
import axios from '../api';

function shareMessage(body: ShareMessage) {
    return axios.post('/messages/share', body)
}

function userMessages(filter?: string) {
    return axios.get(`/messages/getMessages?orderBy=${filter}`)
}


export default {
    shareMessage,
    userMessages
}