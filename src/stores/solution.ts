import {defineStore} from "pinia";
import {SaveSolution, UpdateSolution} from "@/models/Solution";
import SolutionApi from "@/http/modules/solution"
interface State {
    gpId: number,
    file: any,
    solutionId: number,
    solutionInfo: any,
    spId: number
}

export const solution = defineStore('solution', {
    state: (): State => ({
        gpId: 0,
        file: null,
        solutionId: 0,
        solutionInfo: [],
        spId: 0
    }),

    actions: {
        async saveSolution(body: SaveSolution): Promise <void> {
            try {
                const response = await SolutionApi.saveSolution(body)
                this.findSolutionBySharedPostId()
                this.solutionId = response.id
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async attachImage(): Promise <void>{
            try {
                const response = await SolutionApi.attachImage()
                this.findSolutionBySharedPostId()
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
                this.findSolutionBySharedPostId()
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async deleteSolution(solutionId: number): Promise <void>{
            try {
                const response = await SolutionApi.deleteSolution(solutionId)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async deleteImage(imgId: number): Promise <void>{
            try {
                const response = await SolutionApi.deleteImage(imgId)
                this.findSolutionBySharedPostId()
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

        async findSolutionBySharedPostId(): Promise <void>{
            try {
                const response = await SolutionApi.findSolutionBySharedPostId()
                this.solutionInfo = response
                console.log(response)
                return true
            } catch (e) {
                console.log(e)
                return false
            }
        }
    }
})