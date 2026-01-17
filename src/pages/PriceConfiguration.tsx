import { useState } from 'react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import PageTransition from '../components/PageTransition';
import AnimatedButton from '../components/ui/AnimatedButton';

interface PriceItem {
    id: string;
    category: string;
    service: string;
    vehicleType: 'private' | 'commercial' | 'special';
    price: number;
    effectiveDate: string;
    lastModified: string;
    modifiedBy: string;
}

interface AuditLog {
    id: string;
    timestamp: string;
    user: string;
    action: string;
    service: string;
    oldPrice: number;
    newPrice: number;
}

export default function PriceConfiguration() {
    const [activeTab, setActiveTab] = useState<'private' | 'commercial' | 'special'>('private');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');

    const [priceItems, setPriceItems] = useState<PriceItem[]>([
        {
            id: '1',
            category: 'Vehicle License',
            service: 'Annual Private License',
            vehicleType: 'private',
            price: 12500,
            effectiveDate: '2024-01-01',
            lastModified: '2024-01-10',
            modifiedBy: 'Admin Ruth'
        },
        {
            id: '2',
            category: 'Insurance',
            service: 'Third Party Insurance',
            vehicleType: 'private',
            price: 5000,
            effectiveDate: '2024-01-01',
            lastModified: '2024-01-10',
            modifiedBy: 'Admin Ruth'
        },
        {
            id: '3',
            category: 'Processing',
            service: 'Platform Fee',
            vehicleType: 'private',
            price: 250,
            effectiveDate: '2024-01-01',
            lastModified: '2024-01-10',
            modifiedBy: 'Admin Ruth'
        },
        {
            id: '4',
            category: 'Vehicle License',
            service: 'Commercial License',
            vehicleType: 'commercial',
            price: 25000,
            effectiveDate: '2024-01-01',
            lastModified: '2024-01-10',
            modifiedBy: 'Admin Ruth'
        },
        {
            id: '5',
            category: 'Permits',
            service: 'Hackney Permit',
            vehicleType: 'commercial',
            price: 7500,
            effectiveDate: '2024-01-01',
            lastModified: '2024-01-10',
            modifiedBy: 'Admin Ruth'
        },
        {
            id: '6',
            category: 'Badges',
            service: "Driver's Badge",
            vehicleType: 'commercial',
            price: 3000,
            effectiveDate: '2024-01-01',
            lastModified: '2024-01-10',
            modifiedBy: 'Admin Ruth'
        }
    ]);

    const auditLogs: AuditLog[] = [
        {
            id: 'A-101',
            timestamp: '2024-01-15 14:30',
            user: 'Admin Ruth',
            action: 'Price Increase',
            service: 'Annual Private License',
            oldPrice: 12000,
            newPrice: 12500
        },
        {
            id: 'A-100',
            timestamp: '2024-01-10 09:15',
            user: 'Supervisor John',
            action: 'Price Adjustment',
            service: 'Third Party Insurance',
            oldPrice: 4500,
            newPrice: 5000
        },
        {
            id: 'A-099',
            timestamp: '2024-01-05 16:45',
            user: 'Admin Ruth',
            action: 'New Price Entry',
            service: 'Platform Fee',
            oldPrice: 0,
            newPrice: 250
        }
    ];

    const filteredPrices = priceItems.filter(item => item.vehicleType === activeTab);

    const startEditing = (item: PriceItem) => {
        setEditingId(item.id);
        setEditValue(item.price.toString());
    };

    const saveEdit = (id: string) => {
        const newPrice = parseInt(editValue);
        if (isNaN(newPrice) || newPrice <= 0) {
            toast.error('Please enter a valid price');
            return;
        }

        const item = priceItems.find(i => i.id === id);
        setPriceItems(items =>
            items.map(item =>
                item.id === id
                    ? {
                        ...item,
                        price: newPrice,
                        lastModified: format(new Date(), 'yyyy-MM-dd'),
                        modifiedBy: 'Current User'
                    }
                    : item
            )
        );
        setEditingId(null);
        setEditValue('');
        toast.success(`Price updated for ${item?.service}`);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditValue('');
        toast('Edit cancelled', { icon: 'ℹ️' });
    };

    return (
        <PageTransition>
            <div className="min-h-screen bg-background-light p-8">
                <div className="max-w-[1400px] mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-black dark:text-white">Levy & Price Configuration</h1>
                            <p className="text-[#4c599a] mt-1">Manage pricing for all vehicle services and permits</p>
                        </div>
                        <div className="flex gap-3">
                            <a href="/admin" className="px-4 py-2 border border-[#e7e9f3] dark:border-[#2a2f45] rounded-lg text-sm font-medium hover:bg-white dark:hover:bg-[#2a2f45]">
                                <span className="material-symbols-outlined text-sm mr-2 inline-block align-middle">arrow_back</span>
                                Back to Dashboard
                            </a>
                            <AnimatedButton variant="primary" size="md" className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">add</span>
                                Add New Price Item
                            </AnimatedButton>
                        </div>
                    </div>

                    {/* Warning Banner */}
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/50 p-4 rounded-xl flex gap-4">
                        <span className="material-symbols-outlined text-amber-600 text-2xl">lock</span>
                        <div>
                            <p className="font-bold text-amber-900 dark:text-amber-200">Administrator Access Required</p>
                            <p className="text-sm text-amber-800 dark:text-amber-300">Price changes require approval workflow. All modifications are logged for audit purposes.</p>
                        </div>
                    </div>

                    {/* Price Table Section */}
                    <div className="bg-white dark:bg-[#1a1e36] rounded-xl border border-[#cfd3e7] dark:border-[#2a2f45] shadow-sm">
                        {/* Tabs */}
                        <div className="border-b border-[#e7e9f3] dark:border-[#2a2f45]">
                            <div className="flex gap-1 p-2">
                                {(['private', 'commercial', 'special'] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors ${activeTab === tab
                                            ? 'bg-primary text-white'
                                            : 'text-[#4c599a] hover:bg-background-light dark:hover:bg-[#2a2f45]'
                                            }`}
                                    >
                                        {tab} Vehicles
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-background-light dark:bg-[#242942] text-[#4c599a] text-xs font-bold uppercase">
                                    <tr>
                                        <th className="px-6 py-4 text-left">Category</th>
                                        <th className="px-6 py-4 text-left">Service Description</th>
                                        <th className="px-6 py-4 text-right">Current Price (₦)</th>
                                        <th className="px-6 py-4 text-left">Effective Date</th>
                                        <th className="px-6 py-4 text-left">Last Modified</th>
                                        <th className="px-6 py-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#e7e9f3] dark:divide-[#2a2f45]">
                                    {filteredPrices.map((item) => (
                                        <tr key={item.id} className="hover:bg-background-light/50 dark:hover:bg-[#2a2f45]/20">
                                            <td className="px-6 py-4 font-semibold dark:text-white">{item.category}</td>
                                            <td className="px-6 py-4 text-[#4c599a]">{item.service}</td>
                                            <td className="px-6 py-4 text-right">
                                                {editingId === item.id ? (
                                                    <input
                                                        type="number"
                                                        value={editValue}
                                                        onChange={(e) => setEditValue(e.target.value)}
                                                        className="w-32 px-3 py-2 border-2 border-primary rounded-lg text-right font-bold focus:ring-2 focus:ring-primary/20"
                                                        autoFocus
                                                    />
                                                ) : (
                                                    <span className="text-lg font-black text-primary">
                                                        ₦{item.price.toLocaleString()}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#4c599a]">{item.effectiveDate}</td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm">
                                                    <p className="text-[#4c599a]">{item.lastModified}</p>
                                                    <p className="text-xs text-[#4c599a]">by {item.modifiedBy}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    {editingId === item.id ? (
                                                        <>
                                                            <button
                                                                onClick={() => saveEdit(item.id)}
                                                                className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                                                title="Save"
                                                            >
                                                                <span className="material-symbols-outlined text-sm">check</span>
                                                            </button>
                                                            <button
                                                                onClick={cancelEdit}
                                                                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                                                title="Cancel"
                                                            >
                                                                <span className="material-symbols-outlined text-sm">close</span>
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => startEditing(item)}
                                                                className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                                                                title="Edit"
                                                            >
                                                                <span className="material-symbols-outlined text-sm">edit</span>
                                                            </button>
                                                            <button
                                                                className="p-2 bg-gray-200 dark:bg-[#2a2f45] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-[#2a2f45]/80"
                                                                title="View History"
                                                            >
                                                                <span className="material-symbols-outlined text-sm">history</span>
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Audit Log */}
                    <div className="bg-white dark:bg-[#1a1e36] rounded-xl border border-[#cfd3e7] dark:border-[#2a2f45] shadow-sm">
                        <div className="px-6 py-4 border-b border-[#e7e9f3] dark:border-[#2a2f45]">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold dark:text-white">Recent Price Changes (Audit Log)</h3>
                                <button className="text-sm text-primary font-bold hover:underline">View Full History</button>
                            </div>
                        </div>
                        <div className="divide-y divide-[#e7e9f3] dark:divide-[#2a2f45]">
                            {auditLogs.map((log) => (
                                <div key={log.id} className="p-4 hover:bg-background-light/50 dark:hover:bg-[#2a2f45]/20 flex items-center gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="font-mono text-xs text-[#4c599a]">{log.id}</span>
                                            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-bold rounded uppercase">
                                                {log.action}
                                            </span>
                                        </div>
                                        <p className="font-semibold dark:text-white">{log.service}</p>
                                        <p className="text-sm text-[#4c599a]">{log.timestamp} • Modified by {log.user}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-2">
                                            <span className="text-red-600 line-through">₦{log.oldPrice.toLocaleString()}</span>
                                            <span className="material-symbols-outlined text-xs text-[#4c599a]">arrow_forward</span>
                                            <span className="text-green-600 font-bold text-lg">₦{log.newPrice.toLocaleString()}</span>
                                        </div>
                                        <p className="text-xs text-[#4c599a] mt-1">
                                            {log.newPrice > log.oldPrice ? '+' : ''}
                                            {((log.newPrice - log.oldPrice) / log.oldPrice * 100).toFixed(1)}% change
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
