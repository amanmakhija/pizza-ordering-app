import { axiosInstance } from "./axios.config"

export const getAll = async () => {
    const response = await axiosInstance.get("/ingredient")
    return response.data
}