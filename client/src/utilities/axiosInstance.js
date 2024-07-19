const axios = require('axios');
console.log("env-------",process.env.NODE_ENV)
const url = process.env.NODE_ENV === "production" ? 
"http://localhost:8000" : "http://localhost:8000";

const axiosInstance = axios.create({
    withCredentials: true,
    credentials: 'include',
    baseURL: url
})

module.exports = {axiosInstance};