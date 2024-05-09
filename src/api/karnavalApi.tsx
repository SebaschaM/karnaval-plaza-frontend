import axios from "axios";

export const karnavalApi = axios.create({
  baseURL: "http://localhost:3000/api",
});
