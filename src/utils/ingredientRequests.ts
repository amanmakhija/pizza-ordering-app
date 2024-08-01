import { axiosInstance } from "./axios.config"

export const getAll = async () => {
    const query: string = window.location.pathname.split('search/')[1]
    console.log("🚀 ~ getAll ~ query:", query)
    let response
    if (!query) response = await axiosInstance.get('/ingredient')
    else response = await axiosInstance.get(`/ingredient?query=${query}`)
    console.log("🚀 ~ getAll ~ response:", response)
    return response.data
}