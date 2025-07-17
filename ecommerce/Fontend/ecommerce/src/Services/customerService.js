import axios from "axios";

const API_BASE_URL = "http://localhost:8222/api/v1/customers";

export const createCustomer = (customerRequest) => {
  return axios.post(`${API_BASE_URL}`, customerRequest);
};

export const getAllCustomers = (page = 0, size = 10) => {
  return axios.get(`${API_BASE_URL}?page=${page}&size=${size}`);
};


export const updateCustomerApi = async (data) => {
  const token = localStorage.getItem("token");
  return axios.put(`${API_BASE_URL} `, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCustomerById = (id) => {
  return axios.get(`${API_BASE_URL}/${id}`);
};

export const getCustomerByUserId = (userId) => {
  return axios.get(`${API_BASE_URL}/user/${userId}`);
};

export const deleteCustomer = (id) => {
  const token = localStorage.getItem("token");
  return axios.delete(`${API_BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

