import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {authService} from '@/services/auth.service';

const url: string = process.env.VUE_APP_BACKEND_ENDPOINT;

const HttpClient: AxiosInstance = axios.create({
  baseURL: url,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

HttpClient.interceptors.request.use((config: AxiosRequestConfig) => {
  const token: string | null = localStorage.getItem('token');
  if (token != null && token != '') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error: AxiosError) => {
  return error.response;
});

HttpClient.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, (error: AxiosError) => {
  if (error.response != null && error.response.status === 401) {
    authService.logout();
  }
  return error.response;
});

export {HttpClient};
