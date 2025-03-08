import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://islamic-5frn.onrender.com", // production
  timeout: 30000,
});

export default axiosInstance;
