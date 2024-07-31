import axios from "axios"
import { toast } from "react-toastify"

type Cart = {
    ingredients: number[],
}

type Ingredient = {
    ingredientId: number;
}

export const create = async (values: Cart) => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "/cart", values, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error: any) {
        toast.error(`${error.response.data.message} (${error.response.status})`);
    }
}

export const add = async (values: Cart) => {
    console.log("🚀 ~ add ~ values:", values)
    try {
        const token = localStorage.getItem("token")
        const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "/cart/add", values, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        toast.success('Added to cart');
        return response.data
    } catch (error: any) {
        toast.error(`${error.response.data.message} (${error.response.status})`);
    }
}

export const get = async () => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "/cart", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error: any) {
        toast.error(`${error.response.data.message} (${error.response.status})`);
    }
}

export const remove = async (values: Ingredient) => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "/cart/remove", values, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        toast.success('Removed from cart');
        return response.data
    } catch (error: any) {
        toast.error(`${error.response.data.message} (${error.response.status})`);
    }
}

export const checkout = async () => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.delete(process.env.REACT_APP_BACKEND_URL + "/cart", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error: any) {
        toast.error(`${error.response.data.message} (${error.response.status})`);
    }
}