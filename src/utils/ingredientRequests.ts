import { axiosInstance } from "./axios.config"

export const getAll = async () => {
    const query: string = window.location.search.split('=')[1]
    let response
    if (!query) response = await axiosInstance.get('/ingredient')
    else response = await axiosInstance.get(`/ingredient?query=${query}`)
    console.log("🚀 ~ getAll ~ response:", response)
    return response.data
}