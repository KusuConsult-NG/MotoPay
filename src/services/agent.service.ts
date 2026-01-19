import apiService from './api.service';
import { API_ENDPOINTS } from '../config/api.config';
import type { ApiResponse } from '../types/api.types';

/**
 * Agent Service
 * Handles agent portal dashboard, transactions, and commissions
 */

export interface AgentDashboard {
    todayRenewals: number;
    todayChange: number;
    pendingActions: number;
    monthlyCommission: number;
    commissionChange: number;
}

export interface AgentTransaction {
    id: string;
    vehicle: string;
    vehicleType: string;
    owner: string;
    service: string;
    amount: number;
    status: 'completed' | 'pending';
    date: string;
}

export interface Commission {
    period: string;
    totalAmount: number;
    transactionCount: number;
    breakdown: {
        type: string;
        amount: number;
        count: number;
    }[];
}

class AgentService {
    /**
     * Get agent dashboard data
     */
    async getDashboard(): Promise<ApiResponse<AgentDashboard>> {
        return apiService.get<AgentDashboard>(API_ENDPOINTS.AGENTS.DASHBOARD);
    }

    /**
     * Get agent transactions
     */
    async getTransactions(filters: {
        status?: string;
        startDate?: string;
        endDate?: string;
        page?: number;
        limit?: number;
    } = {}): Promise<ApiResponse<{
        transactions: AgentTransaction[];
        total: number;
        page: number;
        totalPages: number;
    }>> {
        return apiService.get(API_ENDPOINTS.AGENTS.TRANSACTIONS, {
            params: filters
        });
    }

    /**
     * Get commission report
     */
    async getCommissions(period: 'weekly' | 'monthly' | 'yearly' = 'monthly'): Promise<ApiResponse<Commission>> {
        return apiService.get<Commission>(API_ENDPOINTS.AGENTS.COMMISSIONS, {
            params: { period }
        });
    }
}

const agentService = new AgentService();
export default agentService;
