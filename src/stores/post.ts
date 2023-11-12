import {defineStore} from "pinia";
import {Post} from "@/models/Post";
import PostApi from "@/http/modules/post"

interface State {
    posts: any,
}

export const post = defineStore('post', {
    state: (): State => ({
        posts: [],
    }),

    getters: {
        task: state => state.posts
    },

    actions:{
        async createPost(body: Post){
            try {
                const response = await PostApi.createPost(body)
                console.log(response)
                this.posts.push(response)
                console.log(this.posts)
            }catch (e) {
                console.log(e)
            }
        }
    }
})
