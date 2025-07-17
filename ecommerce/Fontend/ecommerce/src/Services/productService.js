import axios from "axios";

const BASE_URL = "http://localhost:8222/api/v1/products";
const BASE_URL_CATEGORIES = "http://localhost:8222/api/v1/categories";

export const createProduct = (productData) => {
  return axios.post(`${BASE_URL}`, productData);
};

export const getAllProducts = (page = 0, size = 10) => {
  return axios.get(`${BASE_URL}`, {
    params: { page, size },
  });
};

export const getProductById = (id) => {
  return axios.get(`${BASE_URL}/${id}`);
};

export const updateProduct = (id, productData) => {
  return axios.put(`${BASE_URL}/${id}`, productData);
};

export const deleteProduct = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

export const getAllCategories = () => {
  return axios.get(`${BASE_URL_CATEGORIES}`);
}

export const createCategory = (categoryData) => {
  return axios.post(`${BASE_URL_CATEGORIES}`, categoryData);
};

