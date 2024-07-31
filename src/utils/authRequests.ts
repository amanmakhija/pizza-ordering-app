import { axiosInstance } from "./axios.config"

type User = {
    name?: string,
    email: string,
    password: string
}

export const register = async (values: User) => {
    const response = await axiosInstance.post("/auth/register", values)
    return response.data
}

export const login = async (values: User) => {
    const { email, password } = values
    const response = await axiosInstance.post("/auth/login", { email, password })
    return response.data
}