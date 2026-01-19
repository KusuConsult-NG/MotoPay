import apiService from './api.service';
import { API_ENDPOINTS } from '../config/api.config';
import type { ApiResponse } from '../types/api.types';

/**
 * Admin Service
 * Handles admin dashboard metrics, transactions, and data exports
 */

export interface DashboardMetrics {
    totalRevenue: number;
    totalTransactions: number;
    averageTransaction: number;
    successRate: number;
    revenueChange: number;
    transactionChange: number;
}

export interface TransactionFilters {
    searchQuery?: string;
    status?: 'all' | 'completed' | 'pending' | 'failed';
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
}

export interface AdminTransaction {
    id: string;
    date: string;
    vehicle: string;
    owner: string;
    type: string;
    amount: number;
    status: 'completed' | 'pending' | 'failed';
    method: string;
}

export interface CollectionData {
    date: string;
    revenue: number;
    transactions: number;
}

class AdminService {
    /**
     * Get dashboard metrics
     */
    async getMetrics(timeRange: 'daily' | 'weekly' | 'monthly' = 'daily'): Promise<ApiResponse<DashboardMetrics>> {
        return apiService.get<DashboardMetrics>(API_ENDPOINTS.ADMIN.METRICS, {
            params: { timeRange }
        });
    }

    /**
     * Get transactions with filters
     */
    async getTransactions(filters: TransactionFilters = {}): Promise<ApiResponse<{
        transactions: AdminTransaction[];
        total: number;
        page: number;
        totalPages: number;
    }>> {
        return apiService.get(API_ENDPOINTS.ADMIN.TRANSACTIONS, {
            params: filters
        });
    }

    /**
     * Get revenue collections data
     */
    async getCollections(timeRange: 'daily' | 'weekly' | 'monthly' = 'daily'): Promise<ApiResponse<CollectionData[]>> {
        return apiService.get<CollectionData[]>(API_ENDPOINTS.ADMIN.COLLECTIONS, {
            params: { timeRange }
        });
    }

    /**
     * Export data to CSV
     */
    async exportData(type: 'transactions' | 'collections', filters: any = {}): Promise<ApiResponse<{ url: string }>> {
        return apiService.post(API_ENDPOINTS.ADMIN.EXPORT, {
            type,
            filters
        });
    }
}

const adminService = new AdminService();
export default adminService;
