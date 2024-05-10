import axios from "axios";

export const karnavalApi = axios.create({
  //baseURL: "https://karnaval-plaza-backend.onrender.com/api",
  baseURL: "http://localhost:3000/api",
});
