/**
 * Core API Service
 * Centralized HTTP client with interceptors for authentication and error handling
 */

import axios, { AxiosError } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import { API_CONFIG } from '../config/api.config';
import type { ApiResponse, ApiError } from '../types/api.types';

/**
 * Token storage keys
 */
const TOKEN_STORAGE_KEY = 'motopay_access_token';
const REFRESH_TOKEN_STORAGE_KEY = 'motopay_refresh_token';

/**
 * Token management
 */
export const tokenManager = {
    getAccessToken: (): string | null => {
        return localStorage.getItem(TOKEN_STORAGE_KEY);
    },

    setAccessToken: (token: string): void => {
        localStorage.setItem(TOKEN_STORAGE_KEY, token);
    },

    getRefreshToken: (): string | null => {
        return localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
    },

    setRefreshToken: (token: string): void => {
        localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, token);
    },

    clearTokens: (): void => {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    },

    setTokens: (accessToken: string, refreshToken: string): void => {
        tokenManager.setAccessToken(accessToken);
        tokenManager.setRefreshToken(refreshToken);
    },
};

/**
 * Create axios instance
 */
const apiClient: AxiosInstance = axios.create({
    baseURL: `${API_CONFIG.BASE_URL}/api/${API_CONFIG.API_VERSION}`,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Request interceptor - Add auth token
 */
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = tokenManager.getAccessToken();

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

/**
 * Response interceptor - Handle errors
 */
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError<ApiError>) => {
        // Network error
        if (!error.response) {
            toast.error('Network error. Please check your internet connection.');
            return Promise.reject({
                message: 'Network error',
                statusCode: 0,
            } as ApiError);
        }

        const { status, data } = error.response;

        // Handle different error status codes
        switch (status) {
            case 401:
                // Unauthorized - Check if this is a login attempt
                const isLoginAttempt = error.config?.url?.includes('/auth/login');

                if (isLoginAttempt) {
                    // Show the actual backend error for login failures
                    toast.error(data?.message || 'Invalid email or password.');
                } else {
                    // Session expired for authenticated requests
                    toast.error('Session expired. Please log in again.');
                    tokenManager.clearTokens();
                    // Optionally redirect to login page
                    // window.location.href = '/login';
                }
                break;

            case 403:
                toast.error('You do not have permission to perform this action.');
                break;

            case 404:
                toast.error(data?.message || 'Resource not found.');
                break;

            case 422:
                // Validation error
                const validationMessage = data?.message || 'Validation error';
                toast.error(validationMessage);
                break;

            case 429:
                toast.error('Too many requests. Please try again later.');
                break;

            case 500:
            case 502:
            case 503:
            case 504:
                toast.error('Server error. Please try again later.');
                break;

            default:
                toast.error(data?.message || 'An unexpected error occurred.');
        }

        return Promise.reject(data || { message: 'An error occurred', statusCode: status });
    }
);

/**
 * API Service
 */
export const apiService = {
    /**
     * GET request
     */
    async get<T = any>(endpoint: string, config?: any): Promise<ApiResponse<T>> {
        try {
            const response = await apiClient.get<ApiResponse<T>>(endpoint, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * POST request
     */
    async post<T = any>(endpoint: string, data?: any, config?: any): Promise<ApiResponse<T>> {
        try {
            const response = await apiClient.post<ApiResponse<T>>(endpoint, data, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * PUT request
     */
    async put<T = any>(endpoint: string, data?: any, config?: any): Promise<ApiResponse<T>> {
        try {
            const response = await apiClient.put<ApiResponse<T>>(endpoint, data, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * DELETE request
     */
    async delete<T = any>(endpoint: string, config?: any): Promise<ApiResponse<T>> {
        try {
            const response = await apiClient.delete<ApiResponse<T>>(endpoint, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * PATCH request
     */
    async patch<T = any>(endpoint: string, data?: any, config?: any): Promise<ApiResponse<T>> {
        try {
            const response = await apiClient.patch<ApiResponse<T>>(endpoint, data, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default apiService;
