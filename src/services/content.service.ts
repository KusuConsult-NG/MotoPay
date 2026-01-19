/**
 * Content Service
 * API service for dynamic content (Services, About, Help pages)
 */

import { apiService } from './api.service';
import type { ApiResponse } from '../types/api.types';

// Types
export interface Service {
    id: string;
    icon: string;
    title: string;
    description: string;
    features: string[];
    order: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface AboutSection {
    id: string;
    section: string;
    title: string;
    content: string;
    items?: any[];
    order: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface FAQ {
    id: string;
    category: string;
    question: string;
    answer: string;
    order: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface HelpCategory {
    id: string;
    icon: string;
    title: string;
    link: string;
    description: string;
    order: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export const contentService = {
    /**
     * Get all services
     */
    async getServices(): Promise<ApiResponse<Service[]>> {
        return apiService.get('/content/services');
    },

    /**
     * Get about sections
     */
    async getAboutSections(): Promise<ApiResponse<AboutSection[]>> {
        return apiService.get('/content/about');
    },

    /**
     * Get FAQs (optional category filter)
     */
    async getFAQs(category?: string): Promise<ApiResponse<FAQ[]>> {
        const params = category ? `?category=${category}` : '';
        return apiService.get(`/content/faqs${params}`);
    },

    /**
     * Get help categories
     */
    async getHelpCategories(): Promise<ApiResponse<HelpCategory[]>> {
        return apiService.get('/content/help-categories');
    },
};

export default contentService;
