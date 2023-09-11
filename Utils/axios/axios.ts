import axios from "axios";

const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000/api": "https://voting-app-pied.vercel.app/api";

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

axiosInstance.interceptors.request.use((request) => {
  
    request.headers!["Authorization"] = `Bearer ${sessionStorage.getItem(
      "access_token",
    )}`;
    return request;
  },
  (err) => Promise.reject(err),
);

export default axiosInstance;
