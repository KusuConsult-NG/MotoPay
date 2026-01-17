export default function AgentPortal() {
    const transactions = [
        {
            id: 'TXN-77291',
            vehicle: 'JOS-442-AB',
            vehicleType: 'Toyota Hilux',
            owner: 'Alhaji Musa Bello',
            service: 'Annual Road Worthiness',
            amount: 4500,
            status: 'completed'
        },
        {
            id: 'TXN-77304',
            vehicle: 'BKK-119-QR',
            vehicleType: 'Honda Accord',
            owner: 'Sarah Pam',
            service: 'Third Party Insurance',
            amount: 5000,
            status: 'pending'
        },
        {
            id: 'TXN-77318',
            vehicle: 'PL-22-H01',
            vehicleType: 'Bajaj RE',
            owner: 'Emmanuel Duru',
            service: 'Commercial Levy',
            amount: 2200,
            status: 'completed'
        },
        {
            id: 'TXN-77322',
            vehicle: 'KRG-902-XP',
            vehicleType: 'Volkswagen Golf',
            owner: 'Fatima Ibrahim',
            service: 'Hackney Permit',
            amount: 3500,
            status: 'pending'
        }
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark">
            {/* Sidebar Navigation */}
            <aside className="w-64 flex flex-col bg-white dark:bg-[#1a1e36] border-r border-[#e7e9f3] dark:border-[#2a2f45] z-20">
                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary rounded-lg p-2 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white">directions_car</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-[#0d101b] dark:text-white text-base font-bold leading-tight">MotoPay</h1>
                            <p className="text-[#4c599a] dark:text-[#a0a8cc] text-xs font-normal">Plateau State Portal</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2">
                    <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-primary/10 text-primary">
                        <span className="material-symbols-outlined">receipt_long</span>
                        <p className="text-sm font-semibold">My Transactions</p>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-3 rounded-lg text-[#4c599a] hover:bg-background-light dark:hover:bg-[#2d324a] transition-colors cursor-pointer">
                        <span className="material-symbols-outlined">search</span>
                        <p className="text-sm font-medium">New Lookup</p>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-3 rounded-lg text-[#4c599a] hover:bg-background-light dark:hover:bg-[#2d324a] transition-colors cursor-pointer">
                        <span className="material-symbols-outlined">bar_chart</span>
                        <p className="text-sm font-medium">Commission Report</p>
                    </div>
                </nav>

                <div className="p-4 mt-auto border-t border-[#e7e9f3] dark:border-[#2d324a]">
                    <div className="flex items-center gap-3 px-3 py-3 text-[#4c599a] hover:bg-background-light dark:hover:bg-[#2d324a] rounded-lg cursor-pointer">
                        <span className="material-symbols-outlined">help</span>
                        <p className="text-sm font-medium">Support</p>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-y-auto">
                {/* Top Navigation Bar */}
                <header className="sticky top-0 z-10 bg-white/80 dark:bg-[#1a1e36]/80 backdrop-blur-md border-b border-[#e7e9f3] dark:border-[#2d324a] px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 w-1/3">
                        <label className="flex flex-1 items-stretch rounded-lg h-10 bg-[#e7e9f3] dark:bg-[#2d324a]">
                            <div className="text-[#4c599a] flex items-center justify-center pl-4">
                                <span className="material-symbols-outlined text-[20px]">search</span>
                            </div>
                            <input
                                className="w-full border-none bg-transparent focus:ring-0 text-sm placeholder:text-[#4c599a]"
                                placeholder="Search vehicle or owner..."
                                type="text"
                            />
                        </label>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <button className="p-2 rounded-lg bg-[#e7e9f3] dark:bg-[#2d324a] text-[#0d101b] dark:text-white relative">
                                <span className="material-symbols-outlined text-[20px]">notifications</span>
                                <span className="absolute top-2 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a1e36]"></span>
                            </button>
                            <button className="p-2 rounded-lg bg-[#e7e9f3] dark:bg-[#2d324a] text-[#0d101b] dark:text-white">
                                <span className="material-symbols-outlined text-[20px]">settings</span>
                            </button>
                        </div>
                        <div className="h-8 w-[1px] bg-[#e7e9f3] dark:border-[#2d324a]"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-sm font-bold dark:text-white">John Doe</p>
                                <p className="text-[10px] text-primary font-bold uppercase tracking-wider">PM-98234-A</p>
                            </div>
                            <div
                                className="size-10 rounded-full bg-cover bg-center border-2 border-primary/20"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBe4djko_qAAWI5lPyJ2JYpZAzcP70DZ-7o_Smo-uA2rPAnlaXNYZUFD9I1UH9UmQRs7Tev6YXdtSpsP8oNfUPxwIjU7gjykTlHb1XW1uZIKEVLTS04X_QzRyIRqTP-CItWgVR4Ud8axXZJXwra1CyCf2F22FmsmyNQUIss8FihN9QP3Ciw9yONwkHidt5XaV6DuCDUfm7_4517JCi-mEG4wcBvIZq2NyOjZ2sA0zJ3GGAqjNUid7vcFtXPgsyS50_KnSuCLJA8kgw')"
                                }}
                            />
                        </div>
                        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                            Logout
                        </button>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    {/* Page Heading & CTA */}
                    <div className="flex flex-wrap items-center justify-between gap-6 bg-white dark:bg-[#1a1e36] p-8 rounded-xl shadow-sm border border-[#e7e9f3] dark:border-[#2d324a]">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black tracking-tight dark:text-white">Assisted Renewals Dashboard</h2>
                            <p className="text-[#4c599a] dark:text-[#a0a8cc] font-medium">
                                Hello John, you are currently operating as an <span className="text-primary">Authorized Representative</span>.
                            </p>
                        </div>
                        <button className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl text-base font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95">
                            <span className="material-symbols-outlined">add_circle</span>
                            Start New Assisted Renewal
                        </button>
                    </div>

                    {/* Stats Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-[#1a1e36] p-6 rounded-xl border border-[#cfd3e7] dark:border-[#2d324a] flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                                <p className="text-[#4c599a] dark:text-[#a0a8cc] text-sm font-medium">Today's Renewals</p>
                                <span className="material-symbols-outlined text-primary/40">calendar_today</span>
                            </div>
                            <p className="text-[#0d101b] dark:text-white text-3xl font-black">14</p>
                            <div className="flex items-center gap-1 text-[#07883f] text-xs font-bold">
                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                <span>+15% from yesterday</span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-[#1a1e36] p-6 rounded-xl border border-[#cfd3e7] dark:border-[#2d324a] flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                                <p className="text-[#4c599a] dark:text-[#a0a8cc] text-sm font-medium">Pending Actions</p>
                                <span className="material-symbols-outlined text-orange-400">pending_actions</span>
                            </div>
                            <p className="text-[#0d101b] dark:text-white text-3xl font-black">3</p>
                            <p className="text-[#4c599a] dark:text-[#a0a8cc] text-xs font-medium italic">Requires document verification</p>
                        </div>
                        <div className="bg-white dark:bg-[#1a1e36] p-6 rounded-xl border border-[#cfd3e7] dark:border-[#2d324a] flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                                <p className="text-[#4c599a] dark:text-[#a0a8cc] text-sm font-medium">Total Commission (Monthly)</p>
                                <span className="material-symbols-outlined text-green-500">payments</span>
                            </div>
                            <p className="text-[#0d101b] dark:text-white text-3xl font-black">₦12,500.00</p>
                            <div className="flex items-center gap-1 text-[#e73c08] text-xs font-bold">
                                <span className="material-symbols-outlined text-sm">trending_down</span>
                                <span>-2% from last month</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Renewals Table */}
                    <div className="bg-white dark:bg-[#1a1e36] rounded-xl border border-[#e7e9f3] dark:border-[#2d324a] overflow-hidden">
                        <div className="px-6 py-5 border-b border-[#e7e9f3] dark:border-[#2d324a] flex items-center justify-between">
                            <h3 className="text-lg font-bold">Recent Assisted Renewals</h3>
                            <div className="flex gap-2">
                                <button className="text-xs font-bold px-3 py-1.5 rounded-lg border border-[#e7e9f3] dark:border-[#2d324a] hover:bg-background-light dark:hover:bg-[#2d324a]">
                                    View All
                                </button>
                                <button className="text-xs font-bold px-3 py-1.5 rounded-lg border border-[#e7e9f3] dark:border-[#2d324a] hover:bg-background-light dark:hover:bg-[#2d324a] flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">filter_list</span>
                                    Filter
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-background-light dark:bg-[#242942] text-[#4c599a] dark:text-[#a0a8cc] text-xs font-bold uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Transaction ID</th>
                                        <th className="px-6 py-4">Vehicle/Plate</th>
                                        <th className="px-6 py-4">Owner Name</th>
                                        <th className="px-6 py-4">Service Type</th>
                                        <th className="px-6 py-4">Amount</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#e7e9f3] dark:divide-[#2d324a] text-sm">
                                    {transactions.map((txn) => (
                                        <tr key={txn.id} className="hover:bg-background-light/50 dark:hover:bg-[#2d324a]/20 transition-colors">
                                            <td className="px-6 py-4 font-mono text-xs">#{txn.id}</td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold">{txn.vehicle}</div>
                                                <div className="text-[10px] text-[#4c599a]">{txn.vehicleType}</div>
                                            </td>
                                            <td className="px-6 py-4">{txn.owner}</td>
                                            <td className="px-6 py-4">{txn.service}</td>
                                            <td className="px-6 py-4 font-semibold">₦{txn.amount.toLocaleString()}.00</td>
                                            <td className="px-6 py-4">
                                                {txn.status === 'completed' ? (
                                                    <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase">
                                                        <span className="size-1.5 bg-green-500 rounded-full"></span>
                                                        Completed
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-[10px] font-bold uppercase">
                                                        <span className="size-1.5 bg-orange-500 rounded-full"></span>
                                                        Pending
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="text-primary hover:underline font-bold text-xs">
                                                    {txn.status === 'completed' ? 'Receipt' : 'Resolve'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-6 py-4 bg-background-light dark:bg-[#242942] border-t border-[#e7e9f3] dark:border-[#2d324a] flex items-center justify-between">
                            <p className="text-xs text-[#4c599a] font-medium italic">Plateau State Internal Revenue Service - Internal Portal</p>
                            <button className="text-xs font-bold text-primary hover:underline">View Full Audit Log</button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-auto p-8 flex items-center justify-between text-[10px] text-gray-400 uppercase tracking-widest font-bold border-t border-[#e7e9f3] dark:border-[#2d324a]">
                    <p>© 2024 Plateau State Internal Revenue Service</p>
                    <div className="flex items-center gap-4">
                        <span>Technical Support</span>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <span>Agent Portal v2.1</span>
                    </div>
                </footer>
            </main>
        </div>
    );
}
