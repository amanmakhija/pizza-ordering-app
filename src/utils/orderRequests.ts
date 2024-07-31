import { axiosInstance } from "./axios.config"

type Order = {
    ingredients: number[],
    total: number,
    paymentMethod: string,
}

export const create = async (values: Order) => {
    const response = await axiosInstance.post("/order", values)
    return response.data
}

export const getAll = async () => {
    const response = await axiosInstance.get("/order")
    return response.data
}

export const get = async (id: number) => {
    const response = await axiosInstance.get("/order/" + id)
    return response.data
}

export const cancel = async (id: number) => {
    const response = await axiosInstance.put("/order/" + id)
    return response.data
}