import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import adminService, { type DashboardMetrics, type AdminTransaction, type CollectionData } from '../services/admin.service';
import { authService } from '../services/auth.service';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
    const [revenueData, setRevenueData] = useState<CollectionData[]>([]);
    const [allTransactions, setAllTransactions] = useState<AdminTransaction[]>([]);
    const [totalTransactions, setTotalTransactions] = useState(0);

    // Transaction type breakdown - could also come from API
    const transactionTypes = [
        { name: 'Private Vehicle', value: 45, color: '#1337ec' },
        { name: 'Commercial', value: 30, color: '#008751' },
        { name: 'Insurance Only', value: 15, color: '#f59e0b' },
        { name: 'Permits', value: 10, color: '#8b5cf6' }
    ];

    useEffect(() => {
        loadDashboardData();
    }, [timeRange]);

    useEffect(() => {
        loadTransactions();
    }, [page, searchQuery, statusFilter]);

    const loadDashboardData = async () => {
        setIsLoading(true);
        try {
            // Load metrics
            const metricsResponse = await adminService.getMetrics(timeRange);
            if (metricsResponse.success && metricsResponse.data) {
                setMetrics(metricsResponse.data);
            }

            // Load revenue collections
            const collectionsResponse = await adminService.getCollections(timeRange);
            if (collectionsResponse.success && collectionsResponse.data) {
                setRevenueData(collectionsResponse.data);
            }
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
            toast.error('Failed to load dashboard data');
        } finally {
            setIsLoading(false);
        }
    };

    const loadTransactions = async () => {
        try {
            const response = await adminService.getTransactions({
                searchQuery,
                status: statusFilter as any,
                page,
                limit: 5
            });
            if (response.success && response.data) {
                setAllTransactions(response.data.transactions);
                setTotalTransactions(response.data.total);
            }
        } catch (error) {
            console.error('Failed to load transactions:', error);
        }
    };

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    const exportToCSV = async () => {
        try {
            const response = await adminService.exportData('transactions', { searchQuery, status: statusFilter });
            if (response.success && response.data?.url) {
                window.open(response.data.url, '_blank');
                toast.success('Export initiated!');
            }
        } catch (error) {
            // Fallback to client-side CSV generation
            const headers = ['Transaction ID', 'Date', 'Vehicle', 'Owner', 'Type', 'Amount', 'Status', 'Method'];
            const rows = allTransactions.map(txn => [
                txn.id, txn.date, txn.vehicle, txn.owner, txn.type, txn.amount, txn.status, txn.method
            ]);
            const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `transactions_${format(new Date(), 'yyyy-MM-dd')}.csv`;
            a.click();
            toast.success('CSV downloaded!');
        }
    };

    const itemsPerPage = 5;
    const totalPages = Math.ceil(totalTransactions / itemsPerPage);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark">
            {/* Sidebar */}
            <aside className="w-64 flex flex-col bg-white dark:bg-[#1a1e36] border-r border-[#e7e9f3] dark:border-[#2a2f45]">
                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary rounded-lg p-2">
                            <span className="material-symbols-outlined text-white">admin_panel_settings</span>
                        </div>
                        <div>
                            <h1 className="text-base font-bold dark:text-white">PSIRS Admin</h1>
                            <p className="text-[#4c599a] text-xs">Internal Portal</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-primary/10 text-primary">
                        <span className="material-symbols-outlined">dashboard</span>
                        <p className="text-sm font-semibold">Dashboard</p>
                    </div>
                    <a href="/admin/exceptions" className="flex items-center gap-3 px-3 py-3 rounded-lg text-[#4c599a] hover:bg-background-light dark:hover:bg-[#2d324a] transition-colors">
                        <span className="material-symbols-outlined">warning</span>
                        <p className="text-sm font-medium">Exceptions</p>
                    </a>
                    <a href="/admin/resolution" className="flex items-center gap-3 px-3 py-3 rounded-lg text-[#4c599a] hover:bg-background-light dark:hover:bg-[#2d324a] transition-colors">
                        <span className="material-symbols-outlined">merge</span>
                        <p className="text-sm font-medium">Vehicle Resolution</p>
                    </a>
                    <a href="/admin/pricing" className="flex items-center gap-3 px-3 py-3 rounded-lg text-[#4c599a] hover:bg-background-light dark:hover:bg-[#2d324a] transition-colors">
                        <span className="material-symbols-outlined">edit_note</span>
                        <p className="text-sm font-medium">Price Configuration</p>
                    </a>
                </nav>

                <div className="p-4 border-t border-[#e7e9f3] dark:border-[#2d324a]">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-3 text-[#4c599a] hover:bg-background-light dark:hover:bg-[#2d324a] rounded-lg"
                    >
                        <span className="material-symbols-outlined">logout</span>
                        <p className="text-sm font-medium">Logout</p>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-y-auto">
                {/* Header */}
                <header className="sticky top-0 z-10 bg-white/80 dark:bg-[#1a1e36]/80 backdrop-blur-md border-b border-[#e7e9f3] dark:border-[#2a2f45] px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold dark:text-white">Revenue Dashboard</h2>
                            <p className="text-sm text-[#4c599a]">Real-time analytics and transaction monitoring</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="px-4 py-2 bg-white dark:bg-[#2d324a] border border-[#e7e9f3] dark:border-[#2a2f45] rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#2a2f45]">
                                <span className="material-symbols-outlined text-sm mr-2 inline-block align-middle">refresh</span>
                                Refresh
                            </button>
                            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90">
                                <span className="material-symbols-outlined text-sm mr-2 inline-block align-middle">download</span>
                                Generate Report
                            </button>
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white dark:bg-[#1a1e36] p-6 rounded-xl border border-[#cfd3e7] dark:border-[#2a2f45] shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-[#4c599a] text-sm font-medium">Total Revenue</p>
                                <div className="flex gap-1">
                                    {['daily', 'weekly', 'monthly'].map((range) => (
                                        <button
                                            key={range}
                                            onClick={() => setTimeRange(range as any)}
                                            className={`px-2 py-1 text-[10px] font-bold uppercase rounded ${timeRange === range
                                                ? 'bg-primary text-white'
                                                : 'text-[#4c599a] hover:bg-gray-100 dark:hover:bg-[#2a2f45]'
                                                }`}
                                        >
                                            {range[0]}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <p className="text-3xl font-black dark:text-white">₦{((metrics?.totalRevenue || 0) / 1000000).toFixed(2)}M</p>
                            <div className="flex items-center gap-1 text-green-600 text-xs font-bold mt-2">
                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                <span>+{metrics?.revenueChange || 0}% from last {timeRange === 'daily' ? 'day' : timeRange === 'weekly' ? 'week' : 'month'}</span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#1a1e36] p-6 rounded-xl border border-[#cfd3e7] dark:border-[#2a2f45] shadow-sm">
                            <p className="text-[#4c599a] text-sm font-medium mb-2">Total Transactions</p>
                            <p className="text-3xl font-black dark:text-white">{metrics?.totalTransactions || 0}</p>
                            <div className="flex items-center gap-1 text-green-600 text-xs font-bold mt-2">
                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                <span>+{metrics?.transactionChange || 0}% increase</span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#1a1e36] p-6 rounded-xl border border-[#cfd3e7] dark:border-[#2a2f45] shadow-sm">
                            <p className="text-[#4c599a] text-sm font-medium mb-2">Avg Transaction</p>
                            <p className="text-3xl font-black dark:text-white">₦{metrics?.averageTransaction?.toLocaleString() || '0'}</p>
                            <p className="text-[#4c599a] text-xs mt-2">Per vehicle renewal</p>
                        </div>

                        <div className="bg-white dark:bg-[#1a1e36] p-6 rounded-xl border border-[#cfd3e7] dark:border-[#2a2f45] shadow-sm">
                            <p className="text-[#4c599a] text-sm font-medium mb-2">Success Rate</p>
                            <p className="text-3xl font-black text-green-600">{metrics?.successRate?.toFixed(1) || '0'}%</p>
                            <div className="flex items-center gap-1 text-red-600 text-xs font-bold mt-2">
                                <span className="material-symbols-outlined text-sm">trending_down</span>
                                <span>-1.2% from target</span>
                            </div>
                        </div>
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Revenue Trend */}
                        <div className="lg:col-span-2 bg-white dark:bg-[#1a1e36] p-6 rounded-xl border border-[#cfd3e7] dark:border-[#2a2f45] shadow-sm">
                            <h3 className="text-lg font-bold dark:text-white mb-4">Revenue Trend (7 Days)</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e7e9f3" />
                                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="revenue" stroke="#1337ec" strokeWidth={2} name="Revenue (₦)" />
                                    <Line type="monotone" dataKey="transactions" stroke="#008751" strokeWidth={2} name="Transactions" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Transaction Breakdown */}
                        <div className="bg-white dark:bg-[#1a1e36] p-6 rounded-xl border border-[#cfd3e7] dark:border-[#2a2f45] shadow-sm">
                            <h3 className="text-lg font-bold dark:text-white mb-4">Type Breakdown</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={transactionTypes}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {transactionTypes.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="mt-4 space-y-2">
                                {transactionTypes.map((type) => (
                                    <div key={type.name} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }}></div>
                                            <span className="text-[#4c599a]">{type.name}</span>
                                        </div>
                                        <span className="font-bold dark:text-white">{type.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Transaction Table */}
                    <div className="bg-white dark:bg-[#1a1e36] rounded-xl border border-[#cfd3e7] dark:border-[#2a2f45] shadow-sm">
                        <div className="px-6 py-4 border-b border-[#e7e9f3] dark:border-[#2a2f45]">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <h3 className="text-lg font-bold dark:text-white">Recent Transactions</h3>
                                <div className="flex flex-wrap items-center gap-3">
                                    <input
                                        type="text"
                                        placeholder="Search by ID, vehicle, or owner..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="px-4 py-2 bg-background-light dark:bg-[#2a2f45] border border-[#e7e9f3] dark:border-[#2a2f45] rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary/20"
                                    />
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="px-4 py-2 bg-background-light dark:bg-[#2a2f45] border border-[#e7e9f3] dark:border-[#2a2f45] rounded-lg text-sm focus:ring-2 focus:ring-primary/20"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="completed">Completed</option>
                                        <option value="pending">Pending</option>
                                        <option value="failed">Failed</option>
                                    </select>
                                    <button
                                        onClick={exportToCSV}
                                        className="px-4 py-2 bg-plateau-green text-white rounded-lg text-sm font-bold hover:bg-plateau-green/90"
                                    >
                                        <span className="material-symbols-outlined text-sm mr-1 inline-block align-middle">download</span>
                                        Export CSV
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-background-light dark:bg-[#242942] text-[#4c599a] text-xs font-bold uppercase">
                                    <tr>
                                        <th className="px-6 py-4 text-left">Transaction ID</th>
                                        <th className="px-6 py-4 text-left">Date & Time</th>
                                        <th className="px-6 py-4 text-left">Vehicle</th>
                                        <th className="px-6 py-4 text-left">Owner</th>
                                        <th className="px-6 py-4 text-left">Type</th>
                                        <th className="px-6 py-4 text-right">Amount</th>
                                        <th className="px-6 py-4 text-center">Status</th>
                                        <th className="px-6 py-4 text-center">Method</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#e7e9f3] dark:divide-[#2a2f45] text-sm">
                                    {allTransactions.map((txn) => (
                                        <tr key={txn.id} className="hover:bg-background-light/50 dark:hover:bg-[#2a2f45]/20">
                                            <td className="px-6 py-4 font-mono text-xs text-primary">{txn.id}</td>
                                            <td className="px-6 py-4 text-[#4c599a]">{txn.date}</td>
                                            <td className="px-6 py-4 font-semibold dark:text-white">{txn.vehicle}</td>
                                            <td className="px-6 py-4">{txn.owner}</td>
                                            <td className="px-6 py-4 text-[#4c599a]">{txn.type}</td>
                                            <td className="px-6 py-4 text-right font-bold dark:text-white">₦{txn.amount.toLocaleString()}.00</td>
                                            <td className="px-6 py-4 text-center">
                                                {txn.status === 'completed' && (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase">
                                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                                        Completed
                                                    </span>
                                                )}
                                                {txn.status === 'pending' && (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-[10px] font-bold uppercase">
                                                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                                                        Pending
                                                    </span>
                                                )}
                                                {txn.status === 'failed' && (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-[10px] font-bold uppercase">
                                                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                                                        Failed
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">{txn.method}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 border-t border-[#e7e9f3] dark:border-[#2a2f45] flex items-center justify-between">
                            <p className="text-sm text-[#4c599a]">
                                Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, totalTransactions)} of {totalTransactions} transactions
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setPage(Math.max(1, page - 1))}
                                    disabled={page === 1}
                                    className="px-3 py-1.5 rounded-lg border border-[#e7e9f3] dark:border-[#2a2f45] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background-light dark:hover:bg-[#2a2f45]"
                                >
                                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                                </button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setPage(i + 1)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-bold ${page === i + 1
                                            ? 'bg-primary text-white'
                                            : 'border border-[#e7e9f3] dark:border-[#2a2f45] hover:bg-background-light dark:hover:bg-[#2a2f45]'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                                    disabled={page === totalPages}
                                    className="px-3 py-1.5 rounded-lg border border-[#e7e9f3] dark:border-[#2a2f45] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background-light dark:hover:bg-[#2a2f45]"
                                >
                                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
