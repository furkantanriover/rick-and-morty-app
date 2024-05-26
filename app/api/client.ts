import axios from 'axios';
import Toast from 'react-native-toast-message';

const BASE_URL = 'https://rickandmortyapi.com/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const showToast = (message: string) => {
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: message,
  });
};

const get = async (endpoint: string, query?: Record<string, string | number>) => {
  try {
    console.log(`Requesting ${endpoint} with query`, query);
    const response = await axiosInstance.get(endpoint, { params: query });
    return response.data;
  } catch (error) {
    showToast('Character not found.');
    throw error;
  }
};

const post = async (endpoint: string, data: any) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    showToast('transaction failed');
    throw error;
  }
};

const put = async (endpoint: string, data: any) => {
  try {
    const response = await axiosInstance.put(endpoint, data);
    return response.data;
  } catch (error) {
    showToast('transaction failed');
    throw error;
  }
};

const del = async (endpoint: string) => {
  try {
    const response = await axiosInstance.delete(endpoint);
    return response.data;
  } catch (error) {
    showToast('transaction failed');
    throw error;
  }
};

export { get, post, put, del };
