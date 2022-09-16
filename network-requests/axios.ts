import axios from "axios";

export default axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    // headers: {
    //     "Content-type": "application/json",
    // },
    // withCredentials: true
})