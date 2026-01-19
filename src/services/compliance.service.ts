import apiService from './api.service';
import { API_ENDPOINTS } from '../config/api.config';
import type { ApiResponse } from '../types/api.types';

/**
 * Compliance Service
 * Handles compliance checks for vehicles
 */

export interface ComplianceCheck {
    vehicleId: string;
    isCompliant: boolean;
    requiredDocuments: string[];
    expiredDocuments: string[];
    missingDocuments: string[];
    nextDueDate?: string;
}

export interface BulkComplianceResult {
    total: number;
    compliant: number;
    nonCompliant: number;
    results: ComplianceCheck[];
}

class ComplianceService {
    /**
     * Check compliance for a single vehicle
     */
    async checkCompliance(vehicleId: string): Promise<ApiResponse<ComplianceCheck>> {
        return apiService.get<ComplianceCheck>(API_ENDPOINTS.COMPLIANCE.CHECK, {
            params: { vehicleId }
        });
    }

    /**
     * Bulk compliance check for multiple vehicles
     */
    async bulkCheck(vehicleIds: string[]): Promise<ApiResponse<BulkComplianceResult>> {
        return apiService.post<BulkComplianceResult>(API_ENDPOINTS.COMPLIANCE.BULK_CHECK, {
            vehicleIds
        });
    }
}

const complianceService = new ComplianceService();
export default complianceService;
