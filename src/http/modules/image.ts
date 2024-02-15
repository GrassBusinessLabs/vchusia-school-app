import axios from '../api'

function addOmageOnImage(imgId: number, fileImage: any) {
    return axios.post(`/images/imgOnImg/${imgId}`, fileImage)
}

export default {
    addOmageOnImage
}