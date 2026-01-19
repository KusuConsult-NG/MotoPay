/**
 * Contact Service
 * API service for contact form submissions
 */

import { apiService } from './api.service';
import type { ApiResponse } from '../types/api.types';

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const contactService = {
    /**
     * Submit contact form
     */
    async submitForm(data: ContactFormData): Promise<ApiResponse<null>> {
        return apiService.post('/contact/submit', data);
    },
};

export default contactService;
