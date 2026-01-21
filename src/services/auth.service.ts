/**
 * Authentication Service
 * API service for authentication and user management
 */

import { apiService, tokenManager } from './api.service';
import { API_ENDPOINTS } from '../config/api.config';
import type {
    ApiResponse,
    User,
    LoginRequest,
    LoginResponse,
    RegisterRequest,
} from '../types/api.types';

export const authService = {
    /**
     * Login user
     */
    async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
        const response = await apiService.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data);

        // Store tokens if login successful
        if (response.success && response.data) {
            tokenManager.setTokens(response.data.accessToken, response.data.refreshToken);
        }

        return response;
    },

    /**
     * Register new user
     */
    async register(data: RegisterRequest): Promise<ApiResponse<User>> {
        // Transform the data to match backend schema
        const backendData = {
            email: data.email,
            password: data.password,
            fullName: `${data.firstName} ${data.lastName}`.trim(),
            phoneNumber: data.phoneNumber,
        };

        return apiService.post<User>(API_ENDPOINTS.AUTH.REGISTER, backendData);
    },

    /**
     * Get current authenticated user
     */
    async getCurrentUser(): Promise<ApiResponse<User>> {
        return apiService.get<User>(API_ENDPOINTS.AUTH.ME);
    },

    /**
     * Refresh access token
     */
    async refreshToken(): Promise<ApiResponse<{ accessToken: string }>> {
        const refreshToken = tokenManager.getRefreshToken();

        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await apiService.post<{ accessToken: string }>(
            API_ENDPOINTS.AUTH.REFRESH_TOKEN,
            { refreshToken }
        );

        // Update access token
        if (response.success && response.data) {
            tokenManager.setAccessToken(response.data.accessToken);
        }

        return response;
    },

    /**
     * Logout user
     */
    async logout(): Promise<void> {
        try {
            await apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
        } finally {
            // Always clear tokens even if API call fails
            tokenManager.clearTokens();
        }
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!tokenManager.getAccessToken();
    },
};

export default authService;
