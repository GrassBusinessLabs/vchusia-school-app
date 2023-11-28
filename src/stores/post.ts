import {defineStore} from "pinia";
import {Post, UpdatePost} from "@/models/Post";
import PostApi from "@/http/modules/post"

interface State {
    posts: any,
    idPostsNow: any,
    PostInfo: any,
    total: number
}

export const post = defineStore('post', {
    state: (): State => ({
        posts: [],
        idPostsNow: [],
        PostInfo: [],
        total: 0
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
                this.idPostsNow.push(JSON.stringify(response.id))
                location.reload()
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
                this.PostInfo.push(response.items)
            }
            catch (e) {
                console.log(e)
            }
        },

        async deletePost(){
            try {
                const response: any = await PostApi.deletePost()
                console.log(response)
                location.reload()
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
