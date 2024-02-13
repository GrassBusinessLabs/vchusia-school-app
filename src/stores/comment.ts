import {Comment} from "@/models/Comment";
import CommentApi from "@/http/modules/comment"
import {defineStore} from "pinia";

interface State {
    commentsMessage: any [],
    commentId: number,
    nowComment: any []
}

export const comment = defineStore('comment', {
    state: (): State => ({
        commentsMessage: [],
        commentId: 0,
        nowComment: []
    }),

    actions: {
        async commentMessage(msgId: number, body: Comment) {
            try {
                const response = await CommentApi.commentMessage(msgId, body)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },
        async commentSolution(solutionId: number, body: Comment) {
            try {
                const response = await CommentApi.commentSolution(solutionId, body)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },
        async updateComment(commentId: number, body: Comment) {
            try {
                const response = await CommentApi.updateComment(commentId, body)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },
        async deleteComment(commentId: number) {
            try {
                const response = await CommentApi.deleteComment(commentId)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },
        async findByMessageId(msgId: number) {
            try {
                const response = await CommentApi.findByMessageId(msgId)
                this.commentsMessage = response.items
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },
        async findBySolutionId(solutionId: number) {
            try {
                const response = await CommentApi.findBySolutionId(solutionId)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },
        async findById(solutionId: number) {
            try {
                const response = await CommentApi.findById(solutionId)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },
    }
})