import { axiosInstance } from "./axios.config"

type Query = {
    query: string
}

export const getAll = async () => {
    const query: string = window.location.pathname.split('search/')[1]
    const params: Query = { query }
    const response = await axiosInstance.get("/ingredient", { params })
    return response.data
}