import axios from 'axios';

const API_URL = 'http://localhost:5000/products';

export const fetchProducts = async () => axios.get(API_URL);
export const addProduct = async (product) => axios.post(API_URL, product);
export const updateProduct = async (id, product) => axios.put(`${API_URL}/${id}`, product);
export const deleteProduct = async (id) => axios.delete(`${API_URL}/${id}`);
export const fetchLowStock = async () => axios.get(`${API_URL}/low-stock`);
