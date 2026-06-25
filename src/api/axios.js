import axios from "axios";
 
const API = axios.create({
  baseURL: "https://strive-1-bk1k.onrender.com/api",
});
 
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
 
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
 
  return req;
});
 
export default API;
