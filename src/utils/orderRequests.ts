import axios from "axios"
import { toast } from "react-toastify"

type Order = {
    ingredients: number[],
    total: number,
    paymentMethod: string,
}

export const create = async (values: Order) => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "/order", values, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error: any) {
        toast.error(`${error.response.data.message} (${error.response.status})`);
    }
}

export const getAll = async () => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "/order", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error: any) {
        toast.error(`${error.response.data.message} (${error.response.status})`);
    }
}

export const get = async (id: number) => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "/order/" + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error: any) {
        toast.error(`${error.response.data.message} (${error.response.status})`);
    }
}

export const cancel = async (id: number) => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.put(process.env.REACT_APP_BACKEND_URL + "/order/" + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error: any) {
        toast.error(`${error.response.data.message} (${error.response.status})`);
    }
}