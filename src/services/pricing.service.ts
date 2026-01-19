import apiService from './api.service';
import type { ApiResponse } from '../types/api.types';

/**
 * Pricing Service
 * Handles pricing configuration management
 */

export interface PricingConfig {
    id: string;
    documentType: string;
    vehicleCategory: 'PRIVATE' | 'COMMERCIAL' | 'MOTORCYCLE';
    basePrice: number;
    processingFee: number;
    description: string;
    isActive: boolean;
    lastUpdated: string;
}

export interface UpdatePricingData {
    basePrice?: number;
    processingFee?: number;
    description?: string;
    isActive?: boolean;
}

class PricingService {
    /**
     * Get all pricing configurations
     */
    async getPricing(): Promise<ApiResponse<PricingConfig[]>> {
        return apiService.get<PricingConfig[]>('/admin/pricing');
    }

    /**
     * Update pricing configuration
     */
    async updatePricing(id: string, data: UpdatePricingData): Promise<ApiResponse<PricingConfig>> {
        return apiService.put<PricingConfig>(`/admin/pricing/${id}`, data);
    }

    /**
     * Toggle pricing active status
     */
    async toggleStatus(id: string, isActive: boolean): Promise<ApiResponse<PricingConfig>> {
        return apiService.patch<PricingConfig>(`/admin/pricing/${id}/status`, { isActive });
    }
}

const pricingService = new PricingService();
export default pricingService;
