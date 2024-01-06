import {defineStore} from "pinia";
import {SaveSolution} from "@/models/Solution";
import SolutionApi from "@/http/modules/solution"
interface State {
    gpId: number,
    file: any
}

export const solution = defineStore('solution', {
    state: (): State => ({
        gpId: 0,
        file: null
    }),

    actions: {
        async saveSolution(body: SaveSolution): Promise <void> {
            try {
                const response = await SolutionApi.saveSolution(body)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },

        async attachImage(): Promise <void>{
            try {
                const response = await SolutionApi.attachImage()
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        }
    }
})