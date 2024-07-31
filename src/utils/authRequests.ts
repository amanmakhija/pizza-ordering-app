import axios from "axios"
import { toast } from "react-toastify"

type User = {
    name?: string,
    email: string,
    password: string
}

export const register = async (values: User) => {
    try {
        const { name, email, password } = values
        const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "/auth/register", {
            name, email, password
        })
        return response.data
    } catch (error: any) {
        toast.error(`${error.response.data.message} (${error.response.status})`);
    }
}

export const login = async (values: User) => {
    try {
        const { email, password } = values
        console.log("🚀 ~ login ~ process.env.REACT_APP_BACKEND_URL:", process.env.REACT_APP_BACKEND_URL)
        const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "/auth/login", {
            email, password
        })
        return response.data
    } catch (error: any) {
        toast.error(`${error.response.data.message} (${error.response.status})`);
    }
}