import apiService from './api.service';
import { API_ENDPOINTS } from '../config/api.config';
import type { ApiResponse } from '../types/api.types';

/**
 * Exception Service
 * Handles exception queue management and resolution
 */

export interface Exception {
    id: string;
    vehicleId: string;
    vehiclePlate: string;
    type: 'DUPLICATE' | 'DATA_MISMATCH' | 'PAYMENT_FAILED' | 'OTHER';
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    description: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'ESCALATED';
    createdAt: string;
    updatedAt: string;
    assignedTo?: string;
    resolution?: string;
}

export interface CreateExceptionData {
    vehicleId: string;
    type: Exception['type'];
    severity: Exception['severity'];
    description: string;
}

export interface ResolveExceptionData {
    resolution: string;
    notes?: string;
}

class ExceptionService {
    /**
     * List all exceptions with filters
     */
    async listExceptions(filters: {
        type?: string;
        severity?: string;
        status?: string;
        page?: number;
        limit?: number;
    } = {}): Promise<ApiResponse<{
        exceptions: Exception[];
        total: number;
        page: number;
        totalPages: number;
    }>> {
        return apiService.get(API_ENDPOINTS.EXCEPTIONS.LIST, {
            params: filters
        });
    }

    /**
     * Get exception details
     */
    async getException(id: string): Promise<ApiResponse<Exception>> {
        return apiService.get(`${API_ENDPOINTS.EXCEPTIONS.LIST}/${id}`);
    }

    /**
     * Create new exception
     */
    async createException(data: CreateExceptionData): Promise<ApiResponse<Exception>> {
        return apiService.post(API_ENDPOINTS.EXCEPTIONS.CREATE, data);
    }

    /**
     * Resolve exception
     */
    async resolveException(id: string, data: ResolveExceptionData): Promise<ApiResponse<Exception>> {
        return apiService.put(API_ENDPOINTS.EXCEPTIONS.RESOLVE(id), data);
    }
}

const exceptionService = new ExceptionService();
export default exceptionService;
