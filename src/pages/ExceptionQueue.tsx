import { useState } from 'react';
import PageTransition from '../components/PageTransition';
import AnimatedButton from '../components/ui/AnimatedButton';

interface Exception {
    id: string;
    vehicle: string;
    owner: string;
    type: string;
    priority: 'high' | 'medium' | 'low';
    status: 'pending' | 'in_review' | 'resolved' | 'escalated';
    assignedTo: string;
    createdDate: string;
    description: string;
    documents?: string[];
}

export default function ExceptionQueue() {
    const [selectedExceptions, setSelectedExceptions] = useState<Set<string>>(new Set());
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Exception | null>(null);
    const [notes, setNotes] = useState('');

    const [exceptions, setExceptions] = useState<Exception[]>([
        {
            id: 'EXC-9921',
            vehicle: 'PL-582-KN',
            owner: 'Yakubu Gani',
            type: 'Missing Road Worthiness',
            priority: 'high',
            status: 'pending',
            assignedTo: 'Unassigned',
            createdDate: '2024-01-17 10:30 AM',
            description: 'Road worthiness certificate could not be verified with FRSC database. Owner claims to have valid certificate.',
            documents: []
        },
        {
            id: 'EXC-9918',
            vehicle: 'JOS-442-AB',
            owner: 'Sarah Ibrahim',
            type: 'VIN Mismatch',
            priority: 'high',
            status: 'in_review',
            assignedTo: 'Agent Marcus',
            createdDate: '2024-01-17 09:15 AM',
            description: 'VIN on insurance does not match VIN in database. Requires manual verification.',
            documents: ['insurance_scan.pdf', 'vehicle_photo.jpg']
        },
        {
            id: 'EXC-9915',
            vehicle: 'BKK-119-QR',
            owner: 'Emmanuel Pwajok',
            type: 'Duplicate Payment',
            priority: 'medium',
            status: 'pending',
            assignedTo: 'Unassigned',
            createdDate: '2024-01-17 08:45 AM',
            description: 'Customer claims double charge. Transaction log shows two successful charges within 5 minutes.',
            documents: ['receipt_1.pdf', 'receipt_2.pdf']
        },
        {
            id: 'EXC-9910',
            vehicle: 'KRG-902-XP',
            owner: 'Fatima Bala',
            type: 'Name Discrepancy',
            priority: 'low',
            status: 'resolved',
            assignedTo: 'Agent Joy',
            createdDate: '2024-01-16 04:20 PM',
            description: 'Owner name on documents differs from database record. Resolved: Name change after marriage, documents updated.',
            documents: ['marriage_cert.pdf', 'affidavit.pdf']
        },
        {
            id: 'EXC-9907',
            vehicle: 'PL-22-H01',
            owner: 'Daniel Dalyop',
            type: 'Expired Insurance',
            priority: 'medium',
            status: 'escalated',
            assignedTo: 'Supervisor Ruth',
            createdDate: '2024-01-16 02:10 PM',
            description: 'Insurance policy expired 3 months ago but customer insists it was renewed. Escalated to supervisor for insurance company contact.',
            documents: ['old_policy.pdf']
        }
    ]);

    const toggleSelection = (id: string) => {
        const newSet = new Set(selectedExceptions);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedExceptions(newSet);
    };

    const handleAction = (action: string) => {
        if (selectedItem) {
            const updatedExceptions = exceptions.map(exc =>
                exc.id === selectedItem.id
                    ? { ...exc, status: action === 'approve' ? 'resolved' : action === 'reject' ? 'escalated' : exc.status as any }
                    : exc
            );
            setExceptions(updatedExceptions);
            setShowModal(false);
            setSelectedItem(null);
            setNotes('');
        }
    };

    const filteredExceptions = exceptions.filter(exc => {
        const matchesSearch = search === '' ||
            exc.id.toLowerCase().includes(search.toLowerCase()) ||
            exc.vehicle.toLowerCase().includes(search.toLowerCase()) ||
            exc.owner.toLowerCase().includes(search.toLowerCase());
        const matchesPriority = priorityFilter === 'all' || exc.priority === priorityFilter;
        const matchesStatus = statusFilter === 'all' || exc.status === statusFilter;
        return matchesSearch && matchesPriority && matchesStatus;
    });

    const getPriorityConfig = (priority: string) => {
        switch (priority) {
            case 'high':
                return { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', label: 'High Priority' };
            case 'medium':
                return { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400', label: 'Medium' };
            case 'low':
                return { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', label: 'Low' };
            default:
                return { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Unknown' };
        }
    };

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'pending':
                return { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', label: 'Pending' };
            case 'in_review':
                return { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', label: 'In Review' };
            case 'resolved':
                return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', label: 'Resolved' };
            case 'escalated':
                return { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400', label: 'Escalated' };
            default:
                return { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Unknown' };
        }
    };

    return (
        <PageTransition>
            <div className="min-h-screen bg-background-light p-8">
                <div className="max-w-[1400px] mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-black dark:text-white">Exception Management Queue</h1>
                            <p className="text-[#4c599a] mt-1">Review and resolve pending verification requests</p>
                        </div>
                        <a href="/admin" className="px-4 py-2 border border-[#e7e9f3] dark:border-[#2a2f45] rounded-lg text-sm font-medium hover:bg-white dark:hover:bg-[#2a2f45]">
                            <span className="material-symbols-outlined text-sm mr-2 inline-block align-middle">arrow_back</span>
                            Back to Dashboard
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-[#1a1e36] p-5 rounded-xl border border-[#cfd3e7] dark:border-[#2a2f45]">
                            <p className="text-[#4c599a] text-sm font-medium">Total Pending</p>
                            <p className="text-3xl font-black dark:text-white mt-2">{exceptions.filter(e => e.status === 'pending').length}</p>
                        </div>
                        <div className="bg-white dark:bg-[#1a1e36] p-5 rounded-xl border border-[#cfd3e7] dark:border-[#2a2f45]">
                            <p className="text-[#4c599a] text-sm font-medium">In Review</p>
                            <p className="text-3xl font-black text-blue-600 mt-2">{exceptions.filter(e => e.status === 'in_review').length}</p>
                        </div>
                        <div className="bg-white dark:bg-[#1a1e36] p-5 rounded-xl border border-[#cfd3e7] dark:border-[#2a2f45]">
                            <p className="text-[#4c599a] text-sm font-medium">Resolved Today</p>
                            <p className="text-3xl font-black text-green-600 mt-2">{exceptions.filter(e => e.status === 'resolved').length}</p>
                        </div>
                        <div className="bg-white dark:bg-[#1a1e36] p-5 rounded-xl border border-[#cfd3e7] dark:border-[#2a2f45]">
                            <p className="text-[#4c599a] text-sm font-medium">Avg Resolution</p>
                            <p className="text-3xl font-black dark:text-white mt-2">2.4h</p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white dark:bg-[#1a1e36] p-6 rounded-xl border border-[#cfd3e7] dark:border-[#2a2f45]">
                        <div className="flex flex-wrap items-center gap-4">
                            <input
                                type="text"
                                placeholder="Search by ID, vehicle, or owner..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex-1 min-w-[300px] px-4 py-2.5 bg-background-light dark:bg-[#2a2f45] border border-[#e7e9f3] dark:border-[#2a2f45] rounded-lg text-sm"
                            />
                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="px-4 py-2.5 bg-background-light dark:bg-[#2a2f45] border border-[#e7e9f3] dark:border-[#2a2f45] rounded-lg text-sm"
                            >
                                <option value="all">All Priority</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2.5 bg-background-light dark:bg-[#2a2f45] border border-[#e7e9f3] dark:border-[#2a2f45] rounded-lg text-sm"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in_review">In Review</option>
                                <option value="resolved">Resolved</option>
                                <option value="escalated">Escalated</option>
                            </select>
                            {selectedExceptions.size > 0 && (
                                <button className="px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-bold">
                                    Bulk Assign ({selectedExceptions.size})
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Exception Cards */}
                    <div className="space-y-4">
                        {filteredExceptions.map((exc) => {
                            const priorityConfig = getPriorityConfig(exc.priority);
                            const statusConfig = getStatusConfig(exc.status);
                            return (
                                <div
                                    key={exc.id}
                                    className="bg-white dark:bg-[#1a1e36] rounded-xl border border-[#cfd3e7] dark:border-[#2a2f45] overflow-hidden hover:shadow-lg transition-shadow"
                                >
                                    <div className="p-6">
                                        <div className="flex items-start gap-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedExceptions.has(exc.id)}
                                                onChange={() => toggleSelection(exc.id)}
                                                className="mt-1 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary/20"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <h3 className="text-lg font-bold dark:text-white">{exc.type}</h3>
                                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${priorityConfig.bg} ${priorityConfig.text}`}>
                                                                {priorityConfig.label}
                                                            </span>
                                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${statusConfig.bg} ${statusConfig.text}`}>
                                                                {statusConfig.label}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-4 text-sm text-[#4c599a]">
                                                            <span className="font-mono">{exc.id}</span>
                                                            <span>•</span>
                                                            <span className="font-semibold">{exc.vehicle}</span>
                                                            <span>•</span>
                                                            <span>{exc.owner}</span>
                                                            <span>•</span>
                                                            <span>{exc.createdDate}</span>
                                                        </div>
                                                    </div>
                                                    <AnimatedButton
                                                        onClick={() => {
                                                            setSelectedItem(exc);
                                                            setShowModal(true);
                                                        }}
                                                        variant="primary"
                                                        size="md"
                                                    >
                                                        Review
                                                    </AnimatedButton>
                                                </div>
                                                <p className="text-sm text-[#4c599a] dark:text-[#a0a8cc] leading-relaxed mb-3">
                                                    {exc.description}
                                                </p>
                                                <div className="flex items-center gap-4 text-xs">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="material-symbols-outlined text-sm text-[#4c599a]">person</span>
                                                        <span className="text-[#4c599a]">Assigned to: <span className="font-semibold dark:text-white">{exc.assignedTo}</span></span>
                                                    </div>
                                                    {exc.documents && exc.documents.length > 0 && (
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="material-symbols-outlined text-sm text-[#4c599a]">attach_file</span>
                                                            <span className="text-[#4c599a]">{exc.documents.length} document(s)</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredExceptions.length === 0 && (
                        <div className="bg-white dark:bg-[#1a1e36] rounded-xl border border-[#cfd3e7] dark:border-[#2a2f45] p-12 text-center">
                            <span className="material-symbols-outlined text-6xl text-[#4c599a] opacity-30 mb-4">search_off</span>
                            <p className="text-lg font-bold dark:text-white">No exceptions found</p>
                            <p className="text-sm text-[#4c599a] mt-1">Try adjusting your filters or search query</p>
                        </div>
                    )}
                </div>

                {/* Review Modal */}
                {showModal && selectedItem && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-[#1a1e36] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                            <div className="sticky top-0 bg-white dark:bg-[#1a1e36] border-b border-[#e7e9f3] dark:border-[#2a2f45] p-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold dark:text-white">Review Exception</h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-[#2a2f45] rounded-lg"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs font-bold text-[#4c599a] uppercase mb-1">Exception ID</p>
                                        <p className="font-mono dark:text-white">{selectedItem.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[#4c599a] uppercase mb-1">Created</p>
                                        <p className="dark:text-white">{selectedItem.createdDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[#4c599a] uppercase mb-1">Vehicle</p>
                                        <p className="font-semibold dark:text-white">{selectedItem.vehicle}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[#4c599a] uppercase mb-1">Owner</p>
                                        <p className="dark:text-white">{selectedItem.owner}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-bold text-[#4c599a] uppercase mb-2">Description</p>
                                    <p className="text-sm dark:text-white leading-relaxed">{selectedItem.description}</p>
                                </div>

                                {selectedItem.documents && selectedItem.documents.length > 0 && (
                                    <div>
                                        <p className="text-xs font-bold text-[#4c599a] uppercase mb-2">Attached Documents</p>
                                        <div className="space-y-2">
                                            {selectedItem.documents.map((doc, idx) => (
                                                <div key={idx} className="flex items-center gap-3 p-3 bg-background-light dark:bg-[#2a2f45] rounded-lg">
                                                    <span className="material-symbols-outlined text-primary">description</span>
                                                    <span className="text-sm flex-1 dark:text-white">{doc}</span>
                                                    <button className="text-sm text-primary font-bold hover:underline">View</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <p className="text-xs font-bold text-[#4c599a] uppercase mb-2">Add Notes</p>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        className="w-full p-3 border border-[#e7e9f3] dark:border-[#2a2f45] rounded-lg bg-background-light dark:bg-[#2a2f45] text-sm"
                                        rows={4}
                                        placeholder="Enter resolution notes or comments..."
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={() => handleAction('approve')}
                                        className="flex-1 px-5 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined">check_circle</span>
                                        Approve & Resolve
                                    </button>
                                    <button
                                        onClick={() => handleAction('reject')}
                                        className="flex-1 px-5 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined">cancel</span>
                                        Reject & Escalate
                                    </button>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="px-5 py-3 border-2 border-[#e7e9f3] dark:border-[#2a2f45] rounded-lg font-bold hover:bg-background-light dark:hover:bg-[#2a2f45]"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </PageTransition>
    );
}
