import axios from "axios";

const axiosClient = axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_PORT}`,
});

export default axiosClient;
