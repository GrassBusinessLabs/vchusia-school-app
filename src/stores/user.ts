import {defineStore} from "pinia";

export const users = defineStore('useUser',{
    state: () => ({
        user: [{
            id: 1,
            token: ''
        }]
    })
})