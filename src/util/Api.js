import axios from "axios";

const api = axios.create({
    baseURL: "https://service-center-backend.vercel.app/api/"
})
export default api