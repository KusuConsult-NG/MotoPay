/**
 * Vehicle Service
 * API service for vehicle-related operations
 */

import { apiService } from './api.service';
import { API_ENDPOINTS } from '../config/api.config';
import type {
    ApiResponse,
    Vehicle,
    VehicleLookupRequest,
    VehicleRegistrationRequest,
    VehicleCompliance,
    Transaction,
} from '../types/api.types';

export const vehicleService = {
    /**
     * Look up a vehicle by TIN, Plate Number, or VIN
     */
    async lookupVehicle(data: VehicleLookupRequest): Promise<ApiResponse<Vehicle>> {
        return apiService.post<Vehicle>(API_ENDPOINTS.VEHICLES.LOOKUP, data);
    },

    /**
     * Register a new vehicle
     */
    async registerVehicle(data: VehicleRegistrationRequest): Promise<ApiResponse<Vehicle>> {
        return apiService.post<Vehicle>(API_ENDPOINTS.VEHICLES.REGISTER, data);
    },

    /**
     * Get vehicle details by ID
     */
    async getVehicle(vehicleId: string): Promise<ApiResponse<Vehicle>> {
        return apiService.get<Vehicle>(API_ENDPOINTS.VEHICLES.GET(vehicleId));
    },

    /**
     * Update vehicle information
     */
    async updateVehicle(vehicleId: string, data: Partial<VehicleRegistrationRequest>): Promise<ApiResponse<Vehicle>> {
        return apiService.put<Vehicle>(API_ENDPOINTS.VEHICLES.UPDATE(vehicleId), data);
    },

    /**
     * Get vehicle compliance status
     */
    async getVehicleCompliance(vehicleId: string): Promise<ApiResponse<VehicleCompliance>> {
        const response = await apiService.get<any>(API_ENDPOINTS.VEHICLES.COMPLIANCE(vehicleId));

        if (response.success && response.data) {
            // Transform backend structure to frontend interface
            const backendData = response.data;

            // Helper to map backend data to frontend structure
            const mapComplianceItem = (item: any) => {
                const name = item.complianceItem?.name || item.name || '';
                let type = 'OTHER';

                if (name.includes('Vehicle License') || name.includes('Registration')) type = 'VEHICLE_LICENSE';
                else if (name.includes('Road Worthiness')) type = 'ROAD_WORTHINESS';
                else if (name.includes('Insurance')) type = 'INSURANCE';
                else if (name.includes('Proof of Ownership')) type = 'PROOF_OF_OWNERSHIP';

                return {
                    ...item,
                    type,
                    amount: item.amount || item.complianceItem?.price || 0
                };
            };

            const expired = (backendData.compliance?.expired || []).map(mapComplianceItem);
            const active = (backendData.compliance?.active || []).map(mapComplianceItem);
            const pending = (backendData.compliance?.pending || []).map(mapComplianceItem);

            const documents = [...active, ...expired, ...pending];

            // Calculate total renewal cost from expired items containing amounts
            const totalRenewalCost = expired.reduce((sum: number, doc: any) => sum + (doc.amount || 0), 0);

            // Map keys back to expected structure (if needed) or pass through
            const transformedData: VehicleCompliance = {
                vehicleId: backendData.vehicle?.id || vehicleId,
                vehicle: backendData.vehicle,
                overallStatus: expired.length > 0 ? 'NON_COMPLIANT' : 'COMPLIANT',
                documents: documents,
                requiredRenewals: expired,
                totalRenewalCost: totalRenewalCost,
                lastChecked: new Date().toISOString()
            };

            return {
                ...response,
                data: transformedData
            };
        }

        return response as ApiResponse<VehicleCompliance>;
    },

    /**
     * Get vehicle transaction history
     */
    async getVehicleHistory(vehicleId: string): Promise<ApiResponse<Transaction[]>> {
        return apiService.get<Transaction[]>(API_ENDPOINTS.VEHICLES.HISTORY(vehicleId));
    },
};

export default vehicleService;
