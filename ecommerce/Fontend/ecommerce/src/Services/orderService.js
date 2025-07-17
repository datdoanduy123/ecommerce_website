import axios from "axios";

const API_BASE_URL = "http://localhost:8222/api/v1/orders";

export const createOrder = (orderRequest) => {
  return axios.post(`${API_BASE_URL}`, orderRequest);
};

export const getAllOrders = () => {
  return axios.get(`${API_BASE_URL}`);
};

export const getOrderById = (id) => {
  return axios.get(`${API_BASE_URL}/${id}`);
};

export const getOrdersByCustomerId = (customerId) => {
  return axios.get(`${API_BASE_URL}/customer/${customerId}`);
};
