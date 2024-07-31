import axios from "axios"
import { toast } from "react-toastify"

export const getAll = async () => {
    try {
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "/ingredient")
        return response.data
    } catch (error: any) {
        toast.error(`${error.response.data.message} (${error.response.status})`);
    }
}