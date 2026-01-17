import { useState } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

export default function AdminDashboard() {
    const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [page, setPage] = useState(1);

    // Mock revenue trend data
    const revenueData = [
        { date: 'Jan 11', revenue: 145000, transactions: 42 },
        { date: 'Jan 12', revenue: 178000, transactions: 51 },
        { date: 'Jan 13', revenue: 192000, transactions: 58 },
        { date: 'Jan 14', revenue: 165000, transactions: 47 },
        { date: 'Jan 15', revenue: 210000, transactions: 63 },
        { date: 'Jan 16', revenue: 225000, transactions: 71 },
        { date: 'Jan 17', revenue: 198000, transactions: 59 }
    ];

    // Transaction type breakdown
    const transactionTypes = [
        { name: 'Private Vehicle', value: 45, color: '#1337ec' },
        { name: 'Commercial', value: 30, color: '#008751' },
        { name: 'Insurance Only', value: 15, color: '#f59e0b' },
        { name: 'Permits', value: 10, color: '#8b5cf6' }
    ];

    // Mock transaction data
    const allTransactions = [
        { id: 'TXN-88721', date: '2024-01-17 14:32', vehicle: 'PL-582-KN', owner: 'Yakubu Gani', type: 'Private Renewal', amount: 17750, status: 'completed', method: 'Card' },
        { id: 'TXN-88719', date: '2024-01-17 14:18', vehicle: 'JOS-442-AB', owner: 'Sarah Ibrahim', type: 'Commercial', amount: 32500, status: 'completed', method: 'Transfer' },
        { id: 'TXN-88715', date: '2024-01-17 13:45', vehicle: 'BKK-119-QR', owner: 'Emmanuel Pwajok', type: 'Insurance', amount: 5000, status: 'pending', method: 'USSD' },
        { id: 'TXN-88712', date: '2024-01-17 13:12', vehicle: 'KRG-902-XP', owner: 'Fatima Bala', type: 'Permit Renewal', amount: 7500, status: 'completed', method: 'Card' },
        { id: 'TXN-88708', date: '2024-01-17 12:55', vehicle: 'PL-22-H01', owner: 'Daniel Dalyop', type: 'Private Renewal', amount: 17750, status: 'failed', method: 'Card' },
        { id: 'TXN-88705', date: '2024-01-17 12:30', vehicle: 'JOS-338-PL', owner: 'Grace Nanmwa', type: 'Commercial', amount: 32500, status: 'completed', method: 'Transfer' },
        { id: 'TXN-88697', date: '2024-01-17 11:42', vehicle: 'ABC-777-XY', owner: 'John Marcus', type: 'Insurance', amount: 5000, status: 'completed', method: 'Card' },
        { id: 'TXN-88691', date: '2024-01-17 11:05', vehicle: 'DEF-111-ZZ', owner: 'Mary Dung', type: 'Private Renewal', amount: 17750, status: 'completed', method: 'Transfer' }
    ];

    const filteredTransactions = allTransactions.filter(txn => {
        const matchesSearch = searchQuery === '' ||
            txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            txn.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            txn.owner.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || txn.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const itemsPerPage = 5;
    const paginatedTransactions = filteredTransactions.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

    const exportToCSV = () => {
        const headers = ['Transaction ID', 'Date', 'Vehicle', 'Owner', 'Type', 'Amount', 'Status', 'Method'];
        const rows = filteredTransactions.map(txn => [
            txn.id, txn.date, txn.vehicle, txn.owner, txn.type, txn.amount, txn.status, txn.method
        ]);
        const csv = [headers, ...rows].map(row => row.join(',')).join('\\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transactions_${format(new Date(), 'yyyy-MM-dd')}.csv`;
        a.click();
    };

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
                    <button className="w-full flex items-center gap-3 px-3 py-3 text-[#4c599a] hover:bg-background-light dark:hover:bg-[#2d324a] rounded-lg">
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
                            <p className="text-3xl font-black dark:text-white">₦1.31M</p>
                            <div className="flex items-center gap-1 text-green-600 text-xs font-bold mt-2">
                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                <span>+12.5% from last {timeRange === 'daily' ? 'day' : timeRange === 'weekly' ? 'week' : 'month'}</span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#1a1e36] p-6 rounded-xl border border-[#cfd3e7] dark:border-[#2a2f45] shadow-sm">
                            <p className="text-[#4c599a] text-sm font-medium mb-2">Total Transactions</p>
                            <p className="text-3xl font-black dark:text-white">391</p>
                            <div className="flex items-center gap-1 text-green-600 text-xs font-bold mt-2">
                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                <span>+8.3% increase</span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#1a1e36] p-6 rounded-xl border border-[#cfd3e7] dark:border-[#2a2f45] shadow-sm">
                            <p className="text-[#4c599a] text-sm font-medium mb-2">Avg Transaction</p>
                            <p className="text-3xl font-black dark:text-white">₦19,450</p>
                            <p className="text-[#4c599a] text-xs mt-2">Per vehicle renewal</p>
                        </div>

                        <div className="bg-white dark:bg-[#1a1e36] p-6 rounded-xl border border-[#cfd3e7] dark:border-[#2a2f45] shadow-sm">
                            <p className="text-[#4c599a] text-sm font-medium mb-2">Success Rate</p>
                            <p className="text-3xl font-black text-green-600">96.2%</p>
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
                                    {paginatedTransactions.map((txn) => (
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
                                Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
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
