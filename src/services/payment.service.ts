/**
 * Payment Service
 * API service for payment-related operations
 */

import { apiService } from './api.service';
import { API_ENDPOINTS } from '../config/api.config';
import type {
    ApiResponse,
    PaymentInitRequest,
    PaymentInitResponse,
    PaymentVerifyResponse,
    Transaction,
} from '../types/api.types';

export const paymentService = {
    /**
     * Initialize a payment
     */
    async initializePayment(data: PaymentInitRequest): Promise<ApiResponse<PaymentInitResponse>> {
        return apiService.post<PaymentInitResponse>(API_ENDPOINTS.PAYMENTS.INITIALIZE, data);
    },

    /**
     * Verify a payment by reference
     */
    async verifyPayment(reference: string): Promise<ApiResponse<PaymentVerifyResponse>> {
        return apiService.post<PaymentVerifyResponse>(API_ENDPOINTS.PAYMENTS.VERIFY(reference));
    },

    /**
     * Get transaction details by ID
     */
    async getTransaction(transactionId: string): Promise<ApiResponse<Transaction>> {
        return apiService.get<Transaction>(API_ENDPOINTS.PAYMENTS.TRANSACTION(transactionId));
    },

    /**
     * Request a refund for a transaction
     */
    async processRefund(transactionId: string, reason?: string): Promise<ApiResponse<Transaction>> {
        return apiService.post<Transaction>(
            API_ENDPOINTS.PAYMENTS.REFUND(transactionId),
            { reason }
        );
    },
};

export default paymentService;
