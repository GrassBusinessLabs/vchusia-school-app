import {defineStore} from "pinia";
import {Post, sharePost, UpdatePost} from "@/models/Post";
import PostApi from "@/http/modules/post"
import { useToast } from 'vue-toastification';
import GroupApi from "@/http/modules/group";
import {watch} from "vue";
import {state} from "vue-tsc/out/shared";
const toast = useToast();


interface State {
    posts: any,
    idPostsNow: any,
    PostInfo: any,
    total: number,
    info: any,
    feedPosts: any,
    rows: number
}


export const post = defineStore('post', {
    state: (): State => ({
        posts: [],
        idPostsNow: [],
        PostInfo: [],
        total: 0,
        info: [],
        feedPosts: [],
        rows: 0
    }),

    getters: {
        task: state => state.posts
    },

    actions: {
        triggerToastSuccess() {
            toast.success("Успішно пошарено!", {
                position: "top-right",
                timeout: 2000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
            });
        },

        triggerToastError() {
            toast.error("Цей пост уже є в стрічці!", {
                position: "top-right",
                timeout: 2000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
            });
        },


        async createPost(body: Post) {
            try {
                const response: any = await PostApi.createPost(body)
                localStorage.setItem('post', JSON.stringify(response))
                console.log(response)
                this.posts.push(response)
                console.log(this.posts)
                console.log(this.idPostsNow)
                this.findPostWithRow()


            } catch (e) {
                console.log(e)
            }
        },

        async findPostWithRow() {
            try {
                const response: any = await PostApi.findPostWithRow()
                console.log(response)
                this.total = response.total
                localStorage.setItem('allPost', JSON.stringify(response))
                this.PostInfo = [...response.items]
            } catch (e) {
                console.log(e)
            }
        },

        async findPostWithRowGroupCourse() {
            try {
                const response: any = await PostApi.findPostWithRowGroupCourse()
                console.log(response)
                this.total = response.total
                localStorage.setItem('allPost', JSON.stringify(response))
                this.PostInfo = [...response.items]
            } catch (e) {
                console.log(e)
            }
        },

        async deletePost() {
            try {
                const response: any = await PostApi.deletePost()
                console.log(response)
                this.findPostWithRow()
            } catch (e) {
                console.log(e)
            }
        },

        async updatePost(body: UpdatePost) {
            try {
                const response: any = await PostApi.updatePost(body)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async sharePost(body: sharePost) {
            try {
                const response: any = await PostApi.sharePost(body)
                this.triggerToastSuccess()
                console.log(response)
            } catch (e) {
                this.triggerToastError()
                console.log(e)
            }
        },

        async getPosts(page?: any, groupId?: any, courseId?: any){
            try {
                const response: any = await PostApi.getPosts(page, groupId, courseId)
                this.feedPosts = [...response.items]
                console.log(response)
                return response.items
            } catch (e) {
                console.log(e)
            }
        },



    },

})





