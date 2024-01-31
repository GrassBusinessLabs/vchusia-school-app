import {defineStore} from "pinia";
import {UpdateSolution} from "@/models/Solution";
import SolutionApi from "@/http/modules/solution"
interface State {
    gpId: number,
    file: any,
    solutionId: number,
    solutionInfo: any,
    spId: number,
    solutionsUsers: any
}

export const solution = defineStore('solution', {
    state: (): State => ({
        gpId: 0,
        file: null,
        solutionId: 0,
        solutionInfo: [],
        solutionsUsers: [],
        spId: 0,
    }),

    actions: {
        async attachImage(): Promise <void>{
            try {
                const response = await SolutionApi.attachImage()
                await this.findSolutionBySharedPostId()
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async updateStatus(solutionId: number): Promise <void>{
            try {
                const response = await SolutionApi.updateStatus(solutionId)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async updateSolution(body: UpdateSolution, solutionId: number): Promise <void>{
            try {
                const response = await SolutionApi.updateSolution(body, solutionId)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async deleteSolution(solutionId: number): Promise <void>{
            try {
                const response = await SolutionApi.deleteSolution(solutionId)
                await this.findSolutionBySharedPostId()
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async deleteImage(imgId: number): Promise <void>{
            try {
                const response = await SolutionApi.deleteImage(imgId)
                await this.findSolutionBySharedPostId()
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async findSolutionById(solutionId: number): Promise <void>{
            try {
                const response = await SolutionApi.findSolutionById(solutionId)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },


        async findSolutionsUsers(msgId: number): Promise <void> {
            try {
                const response = await SolutionApi.findSolutionsUsers(msgId)
                this.solutionsUsers = response.items
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async findSolutionByMessageId(msgId: number): Promise <void> {
            try {
                const response = await SolutionApi.findSolutionByMessageId(msgId)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        }




    }
})