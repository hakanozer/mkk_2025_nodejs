import axios from "axios";

const apiConfig = axios.create({
    baseURL: "http://localhost:4000/api/v1/",
    timeout: 10000,
    withCredentials: true,
});

export default apiConfig;