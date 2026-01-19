/**
 * API Types
 * TypeScript interfaces for API requests and responses
 */

// Generic API Response wrapper
export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}

// API Error
export interface ApiError {
    message: string;
    statusCode?: number;
    errors?: Record<string, string[]>;
}

// User/Auth Types
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    role: 'ADMIN' | 'SUPER_ADMIN' | 'AGENT' | 'GUEST';
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    role?: 'AGENT' | 'GUEST';
}

// Vehicle Types
export interface Vehicle {
    id: string;
    plateNumber: string;
    vin?: string;
    tin?: string;
    make: string;
    model: string;
    year: number;
    color?: string;
    vehicleType: string;
    ownerName: string;
    ownerPhone?: string;
    ownerAddress?: string;
    createdAt: string;
    updatedAt: string;
}

export interface VehicleLookupRequest {
    identifier: string; // Can be TIN, Plate Number, or VIN
    type: 'tin' | 'plate' | 'vin';
}

export interface VehicleRegistrationRequest {
    plateNumber: string;
    vin?: string;
    tin?: string;
    make: string;
    model: string;
    year: number;
    color?: string;
    vehicleType: string;
    ownerName: string;
    ownerPhone?: string;
    ownerAddress?: string;
}

// Compliance Types
export interface ComplianceDocument {
    type: 'VEHICLE_LICENSE' | 'ROAD_WORTHINESS' | 'INSURANCE' | 'PROOF_OF_OWNERSHIP';
    status: 'VALID' | 'EXPIRED' | 'PENDING' | 'NOT_FOUND';
    issuedDate?: string;
    expiryDate?: string;
    documentNumber?: string;
    provider?: string;
    amount?: number;
}

export interface VehicleCompliance {
    vehicleId: string;
    vehicle: Vehicle;
    overallStatus: 'COMPLIANT' | 'NON_COMPLIANT' | 'PARTIALLY_COMPLIANT';
    documents: ComplianceDocument[];
    requiredRenewals: ComplianceDocument[];
    totalRenewalCost: number;
    lastChecked: string;
}

// Payment Types
export interface PaymentInitRequest {
    vehicleId: string;
    items: PaymentItem[];
    email: string;
    phoneNumber?: string;
    metadata?: Record<string, any>;
}

export interface PaymentItem {
    type: 'VEHICLE_LICENSE' | 'ROAD_WORTHINESS' | 'INSURANCE' | 'PROOF_OF_OWNERSHIP' | 'OTHER';
    description: string;
    amount: number;
    quantity?: number;
}

export interface PaymentInitResponse {
    transactionId: string;
    reference: string;
    authorizationUrl: string;
    accessCode: string;
    amount: number;
}

export interface PaymentVerifyResponse {
    transaction: Transaction;
    status: 'SUCCESS' | 'FAILED' | 'PENDING';
}

// Transaction Types
export interface Transaction {
    id: string;
    reference: string;
    vehicleId: string;
    vehicle?: Vehicle;
    amount: number;
    status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
    paymentMethod: string;
    gatewayResponse?: any;
    items: PaymentItem[];
    email: string;
    phoneNumber?: string;
    paidAt?: string;
    createdAt: string;
    updatedAt: string;
}

// Admin Types
export interface DashboardMetrics {
    totalRevenue: number;
    totalTransactions: number;
    successfulTransactions: number;
    pendingTransactions: number;
    totalVehicles: number;
    compliantVehicles: number;
    nonCompliantVehicles: number;
    revenueToday: number;
    revenueThisMonth: number;
    revenueThisYear: number;
}

// Agent Types
export interface AgentDashboard {
    agent: User;
    totalCommission: number;
    pendingCommission: number;
    paidCommission: number;
    totalTransactions: number;
    transactionsThisMonth: number;
    recentTransactions: Transaction[];
}

// Exception Types
export interface Exception {
    id: string;
    vehicleId: string;
    vehicle?: Vehicle;
    type: 'DATA_MISMATCH' | 'MISSING_DOCUMENT' | 'PAYMENT_ISSUE' | 'OTHER';
    description: string;
    status: 'PENDING' | 'RESOLVED' | 'ESCALATED';
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    assignedTo?: string;
    resolvedBy?: string;
    resolvedAt?: string;
    createdAt: string;
    updatedAt: string;
}
