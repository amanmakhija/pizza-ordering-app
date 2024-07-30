import axios from "axios"
import { toast } from "react-toastify"

export const getAll = async () => {
    try {
        const response = await axios.get("http://localhost:8000/ingredient")
        return response.data
    } catch (error: any) {
        toast.error(`${error.response.data.message} (${error.response.status})`);
    }
}