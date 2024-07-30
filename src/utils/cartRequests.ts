import axios from "axios"
import { toast } from "react-toastify"

type Cart = {
    ingredients: number[],
    total: number
}

export const add = async (values: Cart) => {
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

export const remove = async (id: number) => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.delete(process.env.REACT_APP_BACKEND_URL + "/cart/" + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error: any) {
        toast.error(`${error.response.data.message} (${error.response.status})`);
    }
}