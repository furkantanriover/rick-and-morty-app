import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const get = async (endpoint: string, query?: Record<string, string | number>) => {
  try {
    console.log(`Requesting ${endpoint} with query`, query);
    const response = await axiosInstance.get(endpoint, { params: query });
    return response.data;
  } catch (error) {
    console.error('GET request failed:', error);
    throw error;
  }
};

const post = async (endpoint: string, data: any) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('POST request failed:', error);
    throw error;
  }
};

const put = async (endpoint: string, data: any) => {
  try {
    const response = await axiosInstance.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('PUT request failed:', error);
    throw error;
  }
};

const del = async (endpoint: string) => {
  try {
    const response = await axiosInstance.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('DELETE request failed:', error);
    throw error;
  }
};

export { get, post, put, del };
