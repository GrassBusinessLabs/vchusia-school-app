import {defineStore} from "pinia";
import ImageApi from '../http/modules/image'

interface State {
    imgId: number,
    nowImageFromTeacher: any
}

export const image = defineStore('image', {
    state: (): State => ({
        imgId: 0,
        nowImageFromTeacher: []
    }),

    actions: {
        async addImageOnImage(imgId: number, fileImage: any) {
            try {
                const response = await ImageApi.addOmageOnImage(imgId, fileImage)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        }
    }
})