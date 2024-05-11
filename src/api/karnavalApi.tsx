import axios from "axios";

export const karnavalApi = axios.create({
  baseURL: "https://karnaval-plaza-backend-production.up.railway.app/api",
  //baseURL: "http://localhost:3000/api",
});
