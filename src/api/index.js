import axios from "axios";

const backendUrl = "http://localhost:8080/api";

const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

export default api;
