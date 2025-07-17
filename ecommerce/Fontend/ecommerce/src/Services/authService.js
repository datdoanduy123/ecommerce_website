import axios from "axios";

export const registerUser = (userData) => {
  return axios.post("http://localhost:8222/api/v1/auth/register", userData);
};

export const loginUser = (userData) => {
  return axios.post("http://localhost:8222/api/v1/auth/login", userData);
}
