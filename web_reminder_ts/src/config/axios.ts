import axios, { AxiosInstance } from "axios";

const API_URL = "http://localhost:8000";
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
