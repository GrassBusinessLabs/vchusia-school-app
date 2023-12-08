import {defineStore} from "pinia";
import {Post, UpdatePost} from "@/models/Post";
import PostApi from "@/http/modules/post"

interface State {
    posts: any,
    idPostsNow: any,
    PostInfo: any,
    total: number,
    info: any
}

export const post = defineStore('post', {
    state: (): State => ({
        posts: [],
        idPostsNow: [],
        PostInfo: [],
        total: 0,
        info: []
    }),

    getters: {
        task: state => state.posts
    },

    actions:{
        async createPost(body: Post){
            try {
                const response: any = await PostApi.createPost(body)
                localStorage.setItem('post', JSON.stringify(response))
                console.log(response)
                this.posts.push(response)
                console.log(this.posts)
                console.log(this.idPostsNow)
                this.findPostWithRow()


            }catch (e) {
                console.log(e)
            }
        },

        async findPostWithRow(){
            try {
                const response: any = await PostApi.findPostWithRow()
                console.log(response)
                this.total = response.total
                localStorage.setItem('allPost', JSON.stringify(response))
                this.PostInfo = [...response.items]
            }
            catch (e) {
                console.log(e)
            }
        },

        async deletePost(){
            try {
                const response: any = await PostApi.deletePost()
                console.log(response)
                this.findPostWithRow()
            }
            catch (e) {
                console.log(e)
            }
        },

        async updatePost(body: UpdatePost){
            try {
                const response: any = await PostApi.updatePost(body)
                console.log(response)
            }
            catch (e) {
                console.log(e)
            }
        }
    }
})
