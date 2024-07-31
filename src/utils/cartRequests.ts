import { axiosInstance } from "./axios.config";

type Cart = {
    ingredients: number[],
}

type Ingredient = {
    ingredientId: number;
}

export const create = async (values: Cart) => {
    const response = await axiosInstance.post("/cart", values)
    return response.data
}

export const add = async (values: Cart) => {
    const response = await axiosInstance.post("/cart/add", values)
    return response.data
}

export const get = async () => {
    const response = await axiosInstance.get("/cart")
    return response.data
}

export const remove = async (values: Ingredient) => {
    const response = await axiosInstance.post("/cart/remove", values)
    return response.data
}

export const checkout = async () => {
    const response = await axiosInstance.delete(process.env.REACT_APP_BACKEND_URL + "/cart")
    return response.data
}