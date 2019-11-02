import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

const url: string = process.env.VUE_APP_BACKEND_ENDPOINT;

const HttpClient: AxiosInstance = axios.create({
  baseURL: url,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

HttpClient.interceptors.request.use((config: AxiosRequestConfig) => {
  return config;
}, (error: AxiosError) => {
  return error.response;
});

HttpClient.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, (error: AxiosError) => {
  return error.response;
});

export {HttpClient};
