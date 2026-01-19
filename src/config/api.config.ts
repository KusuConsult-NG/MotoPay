/**
 * API Configuration
 * Centralized configuration for API endpoints and settings
 */

export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
    API_VERSION: import.meta.env.VITE_API_VERSION || 'v1',
    TIMEOUT: 30000, // 30 seconds
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000, // 1 second
} as const;

/**
 * Construct full API URL
 */
export const getApiUrl = (endpoint: string): string => {
    const baseUrl = API_CONFIG.BASE_URL;
    const version = API_CONFIG.API_VERSION;
    
    // Remove leading slash from endpoint if present
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    
    return `${baseUrl}/api/${version}/${cleanEndpoint}`;
};

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
    // Health
    HEALTH: 'health',
    
    // Authentication
    AUTH: {
        LOGIN: 'auth/login',
        REGISTER: 'auth/register',
        REFRESH_TOKEN: 'auth/refresh-token',
        ME: 'auth/me',
        LOGOUT: 'auth/logout',
    },
    
    // Vehicles
    VEHICLES: {
        LOOKUP: 'vehicles/lookup',
        REGISTER: 'vehicles/register',
        GET: (id: string) => `vehicles/${id}`,
        UPDATE: (id: string) => `vehicles/${id}`,
        COMPLIANCE: (id: string) => `vehicles/${id}/compliance`,
        HISTORY: (id: string) => `vehicles/${id}/history`,
    },
    
    // Payments
    PAYMENTS: {
        INITIALIZE: 'payments/initialize',
        VERIFY: (reference: string) => `payments/verify/${reference}`,
        WEBHOOK: 'payments/webhook',
        TRANSACTION: (id: string) => `payments/transaction/${id}`,
        REFUND: (id: string) => `payments/refund/${id}`,
    },
    
    // Admin
    ADMIN: {
        METRICS: 'admin/metrics',
        TRANSACTIONS: 'admin/transactions',
        COLLECTIONS: 'admin/collections',
        EXPORT: 'admin/export',
    },
    
    // Agents
    AGENTS: {
        DASHBOARD: 'agents/dashboard',
        TRANSACTIONS: 'agents/transactions',
        COMMISSIONS: 'agents/commissions',
    },
    
    // Compliance
    COMPLIANCE: {
        CHECK: 'compliance/check',
        BULK_CHECK: 'compliance/bulk-check',
    },
    
    // Exceptions
    EXCEPTIONS: {
        LIST: 'exceptions',
        CREATE: 'exceptions',
        RESOLVE: (id: string) => `exceptions/${id}/resolve`,
    },
    
    // Search
    SEARCH: {
        VEHICLES: 'search/vehicles',
        TRANSACTIONS: 'search/transactions',
    },
} as const;

/**
 * Paystack Configuration
 */
export const PAYSTACK_CONFIG = {
    PUBLIC_KEY: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '',
} as const;
