import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { StaggerContainer, StaggerItem } from '../components/ui/Animations';
import AnimatedButton from '../components/ui/AnimatedButton';

interface ComplianceItem {
    id: string;
    name: string;
    category: string;
    price: number;
    status: 'active' | 'expiring' | 'expired' | 'missing';
    expiryInfo: string;
    isMandatory: boolean;
    isSelected: boolean;
}

export default function CommercialCompliance() {
    const navigate = useNavigate();

    const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([
        {
            id: '1',
            name: 'Statutory Insurance (3rd Party)',
            category: 'Insurance',
            price: 15000,
            status: 'expired',
            expiryInfo: 'Mandatory requirement for renewal',
            isMandatory: true,
            isSelected: true
        },
        {
            id: '2',
            name: 'Hackney Permit (Commercial)',
            category: 'Permit',
            price: 7500,
            status: 'expiring',
            expiryInfo: 'Expires: 22 Nov 2024',
            isMandatory: false,
            isSelected: true
        },
        {
            id: '3',
            name: "Driver's Badge Renewal",
            category: 'Badge',
            price: 3000,
            status: 'active',
            expiryInfo: 'Registered to: Musa Ibrahim',
            isMandatory: false,
            isSelected: false
        },
        {
            id: '4',
            name: "Conductor's Badge",
            category: 'Badge',
            price: 2500,
            status: 'missing',
            expiryInfo: 'Status: Pending Verification',
            isMandatory: false,
            isSelected: true
        },
        {
            id: '5',
            name: 'Road Worthiness Certificate',
            category: 'Certificate',
            price: 5000,
            status: 'active',
            expiryInfo: 'Valid until Oct 2025',
            isMandatory: false,
            isSelected: false
        }
    ]);

    const toggleItemSelection = (id: string) => {
        setComplianceItems(items =>
            items.map(item =>
                item.id === id && !item.isMandatory
                    ? { ...item, isSelected: !item.isSelected }
                    : item
            )
        );
    };

    const selectedItems = complianceItems.filter(item => item.isSelected);
    const subtotal = selectedItems.reduce((sum, item) => sum + item.price, 0);
    const adminFee = subtotal * 0.01;
    const discount = selectedItems.length >= 3 ? adminFee * 0.05 : 0;
    const total = subtotal + adminFee - discount;

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'expired':
                return {
                    bgColor: 'bg-red-100 dark:bg-red-900/30',
                    textColor: 'text-red-700 dark:text-red-400',
                    label: 'Expired'
                };
            case 'expiring':
                return {
                    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
                    textColor: 'text-orange-700 dark:text-orange-400',
                    label: 'Expiring Soon'
                };
            case 'active':
                return {
                    bgColor: 'bg-green-100 dark:bg-green-900/30',
                    textColor: 'text-green-700 dark:text-green-400',
                    label: 'Active'
                };
            case 'missing':
                return {
                    bgColor: 'bg-gray-100 dark:bg-gray-900/30',
                    textColor: 'text-gray-700 dark:text-gray-400',
                    label: 'Missing'
                };
            default:
                return {
                    bgColor: 'bg-gray-100',
                    textColor: 'text-gray-700',
                    label: 'Unknown'
                };
        }
    };

    return (
        <PageTransition>
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
                {/* Breadcrumbs */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <a className="text-[#4c599a] text-sm font-medium hover:text-primary" href="/">Dashboard</a>
                    <span className="text-[#4c599a] text-sm font-medium">/</span>
                    <a className="text-[#4c599a] text-sm font-medium hover:text-primary" href="#">Fleet Management</a>
                    <span className="text-[#4c599a] text-sm font-medium">/</span>
                    <span className="text-[#0d101b] text-sm font-bold">Compliance & Selection</span>
                </div>

                {/* Page Heading */}
                <div className="flex flex-wrap justify-between items-end gap-3 mb-8">
                    <div className="flex min-w-72 flex-col gap-2">
                        <h1 className="text-[#0d101b] text-4xl font-black leading-tight tracking-[-0.033em]">
                            Commercial Compliance & Renewals
                        </h1>
                        <div className="flex items-center gap-3">
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded">PL-998-JOS</span>
                            <p className="text-[#4c599a] text-base font-normal">Sienna XLE (Commercial) • Jos North LGA</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <AnimatedButton variant="secondary" size="md" className="flex items-center gap-2">
                            <span className="material-symbols-outlined">history</span> Transaction History
                        </AnimatedButton>
                        <AnimatedButton variant="primary" size="md" className="flex items-center gap-2">
                            <span className="material-symbols-outlined">directions_car</span> Vehicle Details
                        </AnimatedButton>
                    </div>
                </div>

                {/* Dashboard Stats */}
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <StaggerItem>
                        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white border border-[#cfd3e7] shadow-sm">
                            <p className="text-[#4c599a] text-sm font-medium">Total Compliance Items</p>
                            <p className="text-[#0d101b] text-3xl font-bold">{complianceItems.length}</p>
                            <div className="flex items-center gap-1 text-[#07883f] text-xs font-bold">
                                <span className="material-symbols-outlined text-sm">check_circle</span> All tracked items
                            </div>
                        </div>
                    </StaggerItem>
                    <StaggerItem>
                        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white border border-[#cfd3e7] shadow-sm">
                            <p className="text-[#4c599a] text-sm font-medium">Active Statuses</p>
                            <p className="text-[#07883f] text-3xl font-bold">
                                {complianceItems.filter(item => item.status === 'active').length}
                            </p>
                            <div className="flex items-center gap-1 text-[#07883f] text-xs font-bold">
                                <span className="material-symbols-outlined text-sm">trending_up</span> Good standing
                            </div>
                        </div>
                    </StaggerItem>
                    <StaggerItem>
                        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white border border-[#cfd3e7] shadow-sm border-l-4 border-l-orange-500">
                            <p className="text-[#4c599a] text-sm font-medium">Expired/Pending Action</p>
                            <p className="text-orange-600 text-3xl font-bold">
                                {complianceItems.filter(item => item.status === 'expired' || item.status === 'missing').length}
                            </p>
                            <div className="flex items-center gap-1 text-orange-600 text-xs font-bold">
                                <span className="material-symbols-outlined text-sm">warning</span> Renewals required
                            </div>
                        </div>
                    </StaggerItem>
                </StaggerContainer>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Main Compliance List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl border border-[#cfd3e7] overflow-hidden shadow-sm">
                            <div className="px-6 py-4 border-b border-[#cfd3e7] bg-gray-50 flex justify-between items-center">
                                <h3 className="font-bold text-[#0d101b]">Statutory Levies & Permits</h3>
                                <span className="text-xs text-[#4c599a] font-medium uppercase tracking-wider">Status & Selection</span>
                            </div>

                            <div className="divide-y divide-[#cfd3e7]">
                                {complianceItems.map((item) => {
                                    const statusConfig = getStatusConfig(item.status);
                                    return (
                                        <div
                                            key={item.id}
                                            className={`p-6 flex items-center justify-between transition-colors ${item.isMandatory ? 'bg-primary/5' : 'hover:bg-gray-50'
                                                } ${item.status === 'active' && !item.isSelected ? 'opacity-60' : ''}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    <input
                                                        checked={item.isSelected}
                                                        className={`h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary/20 ${item.isMandatory ? 'cursor-not-allowed' : 'cursor-pointer'
                                                            }`}
                                                        disabled={item.isMandatory}
                                                        type="checkbox"
                                                        onChange={() => toggleItemSelection(item.id)}
                                                    />
                                                    {item.isMandatory && (
                                                        <span className="absolute -top-1 -right-1 bg-white rounded-full">
                                                            <span className="material-symbols-outlined text-[10px] text-primary font-bold">lock</span>
                                                        </span>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-[#0d101b] font-bold text-base">{item.name}</p>
                                                        {item.isMandatory && (
                                                            <div className="group relative">
                                                                <span className="material-symbols-outlined text-primary text-lg cursor-help">info</span>
                                                                <div className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-[#0d101b] text-white text-xs rounded-lg shadow-xl z-10 leading-relaxed">
                                                                    Statutory Insurance is mandatory for all commercial vehicles in Plateau State under Section 12 of the Transport Act.
                                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#0d101b]"></div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-[#4c599a] text-sm">{item.expiryInfo}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                                                    {statusConfig.label}
                                                </span>
                                                <p className="text-[#0d101b] font-bold">₦{item.price.toLocaleString()}.00</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Alert Message */}
                        {selectedItems.length >= 3 && (
                            <div className="flex gap-4 p-4 rounded-lg bg-primary/10 border border-primary/20 text-[#0d101b]">
                                <span className="material-symbols-outlined text-primary">info</span>
                                <div>
                                    <p className="font-bold text-sm">Bulk Renewal Discount</p>
                                    <p className="text-sm opacity-80">
                                        You have selected {selectedItems.length} items. A 5% administrative fee waiver will be applied at checkout.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Summary Sidebar */}
                    <div className="space-y-6 lg:sticky lg:top-24">
                        <div className="bg-white rounded-xl border border-[#cfd3e7] overflow-hidden shadow-lg border-t-4 border-t-primary">
                            <div className="p-6 border-b border-[#cfd3e7]">
                                <h3 className="text-lg font-bold text-[#0d101b]">Payment Summary</h3>
                                <p className="text-[#4c599a] text-sm">Vehicle: PL-998-JOS</p>
                            </div>
                            <div className="p-6 space-y-4">
                                {selectedItems.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-[#4c599a]">{item.name}</span>
                                        <span className="text-[#0d101b] font-medium">₦{item.price.toLocaleString()}.00</span>
                                    </div>
                                ))}
                                {selectedItems.length > 0 && (
                                    <>
                                        <div className="pt-4 border-t border-dashed border-[#cfd3e7] flex justify-between text-sm">
                                            <span className="text-[#4c599a]">Subtotal</span>
                                            <span className="text-[#0d101b] font-medium">₦{subtotal.toLocaleString()}.00</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-[#4c599a]">Admin Charges (1%)</span>
                                            <span className="text-[#0d101b] font-medium">₦{adminFee.toLocaleString()}</span>
                                        </div>
                                        {discount > 0 && (
                                            <div className="flex justify-between text-sm text-[#07883f] font-bold">
                                                <span>Bulk Discount (5% Admin)</span>
                                                <span>- ₦{discount.toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="pt-6 border-t border-[#cfd3e7]">
                                            <div className="flex justify-between items-end mb-6">
                                                <span className="text-[#0d101b] font-bold text-lg">Total Payable</span>
                                                <span className="text-primary font-black text-2xl tracking-tighter">₦{total.toLocaleString()}</span>
                                            </div>
                                            <AnimatedButton
                                                onClick={() => navigate('/checkout')}
                                                variant="primary"
                                                size="lg"
                                                className="w-full flex items-center justify-center gap-2"
                                            >
                                                Proceed to Payment <span className="material-symbols-outlined">arrow_forward</span>
                                            </AnimatedButton>
                                            <p className="text-center text-[10px] text-[#4c599a] mt-4 uppercase font-bold tracking-widest">
                                                Secure Payment Powered by PSIRS
                                            </p>
                                        </div>
                                    </>
                                )}
                                {selectedItems.length === 0 && (
                                    <div className="text-center py-8 text-[#4c599a]">
                                        <span className="material-symbols-outlined text-4xl opacity-30 mb-2">shopping_cart</span>
                                        <p className="text-sm">No items selected</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Help Card */}
                        <div className="bg-gray-100 p-6 rounded-xl border border-[#cfd3e7]">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="material-symbols-outlined text-primary">contact_support</span>
                                <h4 className="font-bold text-[#0d101b]">Need Assistance?</h4>
                            </div>
                            <p className="text-sm text-[#4c599a] mb-4">Unsure about which permits are mandatory for your fleet?</p>
                            <a className="text-primary text-sm font-bold flex items-center gap-1 hover:underline" href="#">
                                Read Compliance Guide <span className="material-symbols-outlined text-sm">open_in_new</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
