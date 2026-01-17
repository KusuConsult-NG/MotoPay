import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import AnimatedButton from '../components/ui/AnimatedButton';

export default function VehicleLookup() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [searchType, setSearchType] = useState<'tin' | 'plate'>('plate');
    const [vehicleId, setVehicleId] = useState(searchParams.get('query') || 'PL-582-KN');
    const [showResults, setShowResults] = useState(true);

    const handleVerify = () => {
        setShowResults(true);
        // In a real app, this would fetch vehicle data from an API
    };

    return (
        <PageTransition>
            <div className="max-w-[1280px] mx-auto w-full px-6 py-8">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 mb-6">
                    <a className="text-slate-500 text-sm font-medium hover:text-primary" href="/">Home</a>
                    <span className="text-slate-300 text-sm">/</span>
                    <a className="text-slate-500 text-sm font-medium hover:text-primary" href="#">Renewal</a>
                    <span className="text-slate-300 text-sm">/</span>
                    <span className="text-primary text-sm font-bold">Vehicle Lookup</span>
                </div>

                <div className="mb-8">
                    <h1 className="text-slate-900 text-3xl font-bold tracking-tight">Vehicle Lookup & Compliance Summary</h1>
                    <p className="text-slate-500 mt-2">Verify your vehicle details and check document status for renewal.</p>
                </div>

                {/* Split Screen Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Panel: Vehicle Lookup */}
                    <div className="lg:col-span-5 bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-slate-900 text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">search</span>
                            Vehicle Lookup
                        </h3>

                        <div className="mb-6">
                            <p className="text-slate-600 text-sm mb-3 font-medium">Search by</p>
                            <div className="flex bg-slate-100 p-1 rounded-lg">
                                <label className="flex-1">
                                    <input
                                        checked={searchType === 'tin'}
                                        className="hidden peer"
                                        name="lookupType"
                                        type="radio"
                                        onChange={() => setSearchType('tin')}
                                    />
                                    <div className="text-center py-2 text-sm font-bold cursor-pointer rounded-md transition-all peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm text-slate-500">
                                        TIN
                                    </div>
                                </label>
                                <label className="flex-1">
                                    <input
                                        checked={searchType === 'plate'}
                                        className="hidden peer"
                                        name="lookupType"
                                        type="radio"
                                        onChange={() => setSearchType('plate')}
                                    />
                                    <div className="text-center py-2 text-sm font-bold cursor-pointer rounded-md transition-all peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm text-slate-500">
                                        Plate Number
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="block mb-2">
                                <span className="text-slate-700 text-sm font-semibold">Enter Vehicle Identifier</span>
                                <div className="mt-1 relative">
                                    <input
                                        className="w-full h-14 bg-background-light border-slate-200 rounded-lg px-4 text-slate-900 focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-slate-400"
                                        placeholder={searchType === 'tin' ? 'e.g. 1234567890' : 'e.g. PL-742-JS'}
                                        type="text"
                                        value={vehicleId}
                                        onChange={(e) => setVehicleId(e.target.value)}
                                    />
                                    <span className="material-symbols-outlined absolute right-4 top-4 text-slate-400">directions_car</span>
                                </div>
                            </label>
                            <p className="text-slate-400 text-xs mt-2 italic">
                                {searchType === 'plate' ? 'Format: XX-000-XX for plate numbers' : 'Enter your 10-digit TIN'}
                            </p>
                        </div>

                        <AnimatedButton
                            onClick={handleVerify}
                            variant="primary"
                            size="lg"
                            className="w-full flex items-center justify-center gap-2"
                        >
                            <span>Verify Vehicle</span>
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </AnimatedButton>

                        <div className="mt-8 pt-8 border-t border-slate-100">
                            <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg">
                                <span className="material-symbols-outlined text-primary">info</span>
                                <div className="text-sm text-slate-600">
                                    <span className="font-bold text-slate-800">Tip:</span> Ensure your TIN is linked to your current phone number to receive digital renewal certificates.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Compliance Dashboard */}
                    <div className="lg:col-span-7 space-y-6">
                        {showResults ? (
                            <>
                                {/* Vehicle Summary Header */}
                                <div className="bg-primary p-6 rounded-xl text-white flex justify-between items-center shadow-md">
                                    <div>
                                        <p className="text-primary/70 text-xs uppercase font-bold tracking-widest mb-1">Vehicle Identified</p>
                                        <h2 className="text-2xl font-bold">Toyota Camry (2018)</h2>
                                        <p className="text-sm opacity-90 mt-1">Plate: PL-582-KN | VIN: 4T1B...9210</p>
                                    </div>
                                    <div className="bg-white/20 p-3 rounded-full">
                                        <span className="material-symbols-outlined text-4xl">verified_user</span>
                                    </div>
                                </div>

                                {/* Compliance Status Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Card 1: Vehicle License - Expired */}
                                    <div className="bg-white dark:bg-slate-900 border border-red-100 dark:border-red-900/30 p-5 rounded-xl flex flex-col justify-between shadow-sm relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-1 bg-red-500 h-full"></div>
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg text-red-500">
                                                <span className="material-symbols-outlined">calendar_today</span>
                                            </div>
                                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded">
                                                <span className="material-symbols-outlined text-xs">error</span> Expired
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">Vehicle License</h4>
                                            <p className="text-slate-900 dark:text-white text-lg font-bold mt-1">Renewal Overdue</p>
                                            <p className="text-red-500 text-xs font-medium mt-1">Expired on Oct 12, 2023</p>
                                        </div>
                                    </div>

                                    {/* Card 2: Road Worthiness - Valid */}
                                    <div className="bg-white dark:bg-slate-900 border border-green-100 dark:border-green-900/30 p-5 rounded-xl flex flex-col justify-between shadow-sm relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-1 bg-green-500 h-full"></div>
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg text-green-500">
                                                <span className="material-symbols-outlined">shield</span>
                                            </div>
                                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-500 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded">
                                                <span className="material-symbols-outlined text-xs">check_circle</span> Valid
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">Road Worthiness</h4>
                                            <p className="text-slate-900 dark:text-white text-lg font-bold mt-1">Fully Compliant</p>
                                            <p className="text-green-500 text-xs font-medium mt-1">Expires in 142 days</p>
                                        </div>
                                    </div>

                                    {/* Card 3: Insurance - Expired */}
                                    <div className="bg-white dark:bg-slate-900 border border-red-100 dark:border-red-900/30 p-5 rounded-xl flex flex-col justify-between shadow-sm relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-1 bg-red-500 h-full"></div>
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg text-red-500">
                                                <span className="material-symbols-outlined">description</span>
                                            </div>
                                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded">
                                                <span className="material-symbols-outlined text-xs">warning</span> Expired
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">Insurance</h4>
                                            <p className="text-slate-900 dark:text-white text-lg font-bold mt-1">Third-Party Cover</p>
                                            <p className="text-red-500 text-xs font-medium mt-1">Expired on Jan 05, 2024</p>
                                        </div>
                                    </div>

                                    {/* Card 4: Proof of Ownership - Expired */}
                                    <div className="bg-white dark:bg-slate-900 border border-red-100 dark:border-red-900/30 p-5 rounded-xl flex flex-col justify-between shadow-sm relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-1 bg-red-500 h-full"></div>
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg text-red-500">
                                                <span className="material-symbols-outlined">badge</span>
                                            </div>
                                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded">
                                                <span className="material-symbols-outlined text-xs">error</span> Expired
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">Proof of Ownership</h4>
                                            <p className="text-slate-900 dark:text-white text-lg font-bold mt-1">Certificate Renewal</p>
                                            <p className="text-red-500 text-xs font-medium mt-1">Expired on Dec 30, 2023</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Summary & Action */}
                                <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                                            <span className="material-symbols-outlined text-3xl">notification_important</span>
                                        </div>
                                        <div>
                                            <p className="text-slate-900 font-bold">3 Document Renewals Required</p>
                                            <p className="text-slate-500 text-sm">Estimated Total: ₦32,500.00</p>
                                        </div>
                                    </div>
                                    <AnimatedButton
                                        onClick={() => navigate('/checkout')}
                                        variant="primary"
                                        size="lg"
                                    >
                                        Proceed to Payment
                                    </AnimatedButton>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                                <span className="material-symbols-outlined text-[120px] text-slate-400 mb-6">search</span>
                                <h4 className="text-xl font-bold text-slate-400">Enter vehicle details to see compliance</h4>
                                <p className="text-slate-400">We will fetch real-time data from PSIRS and insurance providers</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* FAQ/Help Footer */}
                <footer className="mt-16 pt-8 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
                    <div className="flex flex-col gap-2">
                        <h5 className="font-bold text-slate-800">Need Help?</h5>
                        <p className="text-sm text-slate-500">Contact the Plateau State Internal Revenue Service Support Desk.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-slate-100 p-2 rounded-lg">
                            <span className="material-symbols-outlined text-slate-600">call</span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Helpline</p>
                            <p className="text-sm font-bold">+234 800-PLATEAU-PAY</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-slate-100 p-2 rounded-lg">
                            <span className="material-symbols-outlined text-slate-600">mail</span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Email Support</p>
                            <p className="text-sm font-bold">support@plateaumotopay.ng</p>
                        </div>
                    </div>
                </footer>
            </div>
        </PageTransition>
    );
}
