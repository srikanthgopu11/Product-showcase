import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const fetchProducts = (page, search, category) => {
    return axios.get(`${API_URL}/products`, {
        params: { page, search, category, limit: 6 }
    });
};

export const fetchProductById = (id) => {
    return axios.get(`${API_URL}/products/${id}`);
};

export const submitEnquiry = (data) => {
    return axios.post(`${API_URL}/enquiries`, data);
};