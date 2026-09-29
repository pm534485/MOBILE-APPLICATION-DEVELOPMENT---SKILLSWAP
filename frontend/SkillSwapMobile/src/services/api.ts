import axios from 'axios';
import storage from '../utils/storage';

export const API_BASE_URL = 'http://10.0.2.2:5000/api';

// 1. Axios Instance Configuration
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Native Fetch API Helper (demonstrating both Axios and native Fetch per Section 2 spec)
export const fetchApi = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = await storage.getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorData: any = {};
    try {
      errorData = await response.json();
    } catch {
      // response was not JSON
    }
    const error: any = new Error(errorData.message || `HTTP ${response.status} Error`);
    error.status = response.status;
    error.data = errorData;
    throw error;
  }

  if (response.status === 204) {
    return null as unknown as T;
  }

  return response.json();
};

export default apiClient;
