import axios from "axios";

const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000/api": "https://voting-app-virid.vercel.app/api";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
  "Content-Type": "application/json, charset=utf-8",
};

const axiosInstance = axios.create({
  baseURL,
  headers,
  timeout: 60000,
  withCredentials: false,
});

axiosInstance.interceptors.request.use(  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (err) => Promise.reject(err),
);

export default axiosInstance;
