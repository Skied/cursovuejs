import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import { authService } from './auth.service';

const url: string = process.env.VUE_APP_BACKEND_ENDPOINT;

const HttpClient: AxiosInstance = axios.create({
  baseURL: url,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
});

HttpClient.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
  return config;
}, (error: AxiosError) => {
  return error.response;
});

HttpClient.interceptors.response.use((response: AxiosResponse) => {
  return response.data;
}, (error: AxiosError) => {
  if (error && error.response && error.response.status === 401) {
    authService.logout();
  }
  throw error.response;
});

export {HttpClient};
