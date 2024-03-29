import {defineStore} from "pinia";
import {MarkSolution, UpdateSolution} from "@/models/Solution";
import SolutionApi from "@/http/modules/solution"
interface State {
    gpId: number,
    file: any,
    solutionId: number,
    solutionInfo: any,
    spId: number,
    solutionsUsers: any,
    imageSolutionSize: object,
    nowPoint: number,
    submittedSolutionsId: any [],
    complettedSolutions: any [],
    draftReturnSolutions: any[],
    nowSolution: any [],
    imageURL: string | null,
    pointsCompletted: any [],
    slImgId: number
}

export const solution = defineStore('solution', {
    state: (): State => ({
        gpId: 0,
        file: null,
        solutionId: 0,
        solutionInfo: [],
        solutionsUsers: [],
        spId: 0,
        imageSolutionSize: {width: 0, height: 0},
        nowPoint: 0,
        submittedSolutionsId: [],
        complettedSolutions: [],
        draftReturnSolutions: [],
        nowSolution: [],
        imageURL: null,
        pointsCompletted: [],
        slImgId: 0
    }),

    actions: {
        async attachImage(): Promise <void>{
            try {
                const response = await SolutionApi.attachImage()
                console.log(response)
                await this.findSolutionById(this.solutionId)
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
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async deleteImage(imgId: number): Promise <void>{
            try {
                const response = await SolutionApi.deleteImage(imgId)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async findSolutionById(solutionId: number): Promise <void>{
            try {
                const response = await SolutionApi.findSolutionById(solutionId)
                this.nowSolution = response
                this.solutionId = response.id
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async findSolutionByIdPoints(solutionId: number): Promise <void> {
            this.pointsCompletted = []
            try {
                const response = await SolutionApi.findSolutionById(solutionId)
                this.pointsCompletted.push(response.points)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },



        async findSolutionsUsers(msgId: number): Promise <void> {
            try {
                const response = await SolutionApi.findSolutionsUsers(msgId)
                this.solutionsUsers = response.solutions
                this.submittedSolutionsId = (this.solutionsUsers.filter(solution => solution.status === 'SUBMITTED'))
                this.complettedSolutions = this.solutionsUsers.filter(solution => solution.status === 'COMPLETED')
                this.draftReturnSolutions = this.solutionsUsers.filter(solution => solution.status === 'DRAFT' || solution.status === 'RETURNED')
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async findSolutionByMessageId(msgId: number): Promise <void> {
            try {
                const response = await SolutionApi.findSolutionByMessageId(msgId)
                this.solutionId = response.id
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async markSolution(solutionId: number, status: string, body: MarkSolution): Promise <void> {
            try {
                const response = await SolutionApi.markSolution(solutionId, status, body)
                console.log(response)
            }
            catch (e) {
                console.log(e)
            }
        }




    }
})