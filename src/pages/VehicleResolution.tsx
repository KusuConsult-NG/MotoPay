import { useState } from 'react';

interface VehicleRecord {
    source: 'legacy' | 'current';
    plate: string;
    vin: string;
    owner: string;
    make: string;
    model: string;
    year: string;
    color: string;
    engineNumber: string;
    chassisNumber: string;
    lastUpdated: string;
}

export default function VehicleResolution() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchField, setSearchField] = useState('plate');
    const [showResults, setShowResults] = useState(false);
    const [showMergeModal, setShowMergeModal] = useState(false);

    const legacyRecord: VehicleRecord = {
        source: 'legacy',
        plate: 'PL-582-KN',
        vin: '1HGBH41JXMN109186',
        owner: 'YAKUBU GANI MOHAMMED',
        make: 'Toyota',
        model: 'Camry',
        year: '2018',
        color: 'Silver',
        engineNumber: '2AZ-FE-4582917',
        chassisNumber: 'JTDKB20U483051234',
        lastUpdated: '2020-11-15'
    };

    const currentRecord: VehicleRecord = {
        source: 'current',
        plate: 'PL-582-KN',
        vin: '1HGBH41JXMN109186',
        owner: 'YAKUBU GANI',
        make: 'Toyota',
        model: 'CAMRY',
        year: '2018',
        color: 'SILVER',
        engineNumber: '2AZ-FE-4582917',
        chassisNumber: 'JTDKB20U483051234',
        lastUpdated: '2024-01-17'
    };

    const conflicts = [
        { field: 'owner', legacy: legacyRecord.owner, current: currentRecord.owner },
        { field: 'model', legacy: legacyRecord.model, current: currentRecord.model },
        { field: 'color', legacy: legacyRecord.color, current: currentRecord.color }
    ];

    const handleSearch = () => {
        setShowResults(true);
    };

    const handleMerge = () => {
        setShowMergeModal(true);
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark p-8">
            <div className="max-w-[1600px] mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black dark:text-white">Vehicle Record Resolution</h1>
                        <p className="text-[#4c599a] mt-1">Search and merge legacy database records with current system</p>
                    </div>
                    <a href="/admin" className="px-4 py-2 border border-[#e7e9f3] dark:border-[#2a2f45] rounded-lg text-sm font-medium hover:bg-white dark:hover:bg-[#2a2f45]">
                        <span className="material-symbols-outlined text-sm mr-2 inline-block align-middle">arrow_back</span>
                        Back to Dashboard
                    </a>
                </div>

                {/* Search Interface */}
                <div className="bg-white dark:bg-[#1a1e36] p-6 rounded-xl border border-[#cfd3e7] dark:border-[#2a2f45] shadow-sm">
                    <h3 className="text-lg font-bold dark:text-white mb-4">Search Vehicle Records</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <select
                            value={searchField}
                            onChange={(e) => setSearchField(e.target.value)}
                            className="px-4 py-3 bg-background-light dark:bg-[#2a2f45] border border-[#e7e9f3] dark:border-[#2a2f45] rounded-lg"
                        >
                            <option value="plate">Plate Number</option>
                            <option value="vin">VIN</option>
                            <option value="owner">Owner Name</option>
                            <option value="tin">Tax ID (TIN)</option>
                        </select>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={`Enter ${searchField}...`}
                            className="md:col-span-2 px-4 py-3 bg-background-light dark:bg-[#2a2f45] border border-[#e7e9f3] dark:border-[#2a2f45] rounded-lg"
                        />
                        <button
                            onClick={handleSearch}
                            className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined">search</span>
                            Search Both Databases
                        </button>
                    </div>
                </div>

                {showResults && (
                    <>
                        {/* Conflict Summary */}
                        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-900/50 p-6 rounded-xl">
                            <div className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-orange-600 text-3xl">warning</span>
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-orange-900 dark:text-orange-200 mb-2">Record Conflicts Detected</h4>
                                    <p className="text-sm text-orange-800 dark:text-orange-300 mb-3">
                                        Found matching records in both databases with {conflicts.length} field discrepancies. Review and resolve conflicts below.
                                    </p>
                                    <div className="flex gap-2">
                                        {conflicts.map((conflict, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-orange-200 dark:bg-orange-900/50 text-orange-900 dark:text-orange-200 text-xs font-bold rounded-full uppercase">
                                                {conflict.field}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Side-by-Side Comparison */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Legacy Database */}
                            <div className="bg-white dark:bg-[#1a1e36] rounded-xl border-2 border-orange-200 dark:border-orange-900/50 overflow-hidden">
                                <div className="bg-orange-100 dark:bg-orange-900/30 px-6 py-4 border-b border-orange-200 dark:border-orange-900/50">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold dark:text-white">Legacy Database Record</h3>
                                            <p className="text-sm text-[#4c599a]">Last Updated: {legacyRecord.lastUpdated}</p>
                                        </div>
                                        <span className="px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded-full uppercase">Source</span>
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    {Object.entries(legacyRecord).filter(([key]) => key !== 'source' && key !== 'lastUpdated').map(([key, value]) => {
                                        const hasConflict = conflicts.some(c => c.field === key);
                                        return (
                                            <div key={key} className={`p-3 rounded-lg ${hasConflict ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50' : 'bg-gray-50 dark:bg-[#2a2f45]'}`}>
                                                <p className="text-xs font-bold text-[#4c599a] uppercase mb-1">{key}</p>
                                                <p className={`font-semibold ${hasConflict ? 'text-red-600 dark:text-red-400' : 'dark:text-white'}`}>{value}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Current Database */}
                            <div className="bg-white dark:bg-[#1a1e36] rounded-xl border-2 border-green-200 dark:border-green-900/50 overflow-hidden">
                                <div className="bg-green-100 dark:bg-green-900/30 px-6 py-4 border-b border-green-200 dark:border-green-900/50">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold dark:text-white">Current System Record</h3>
                                            <p className="text-sm text-[#4c599a]">Last Updated: {currentRecord.lastUpdated}</p>
                                        </div>
                                        <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full uppercase">Target</span>
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    {Object.entries(currentRecord).filter(([key]) => key !== 'source' && key !== 'lastUpdated').map(([key, value]) => {
                                        const hasConflict = conflicts.some(c => c.field === key);
                                        return (
                                            <div key={key} className={`p-3 rounded-lg ${hasConflict ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50' : 'bg-gray-50 dark:bg-[#2a2f45]'}`}>
                                                <p className="text-xs font-bold text-[#4c599a] uppercase mb-1">{key}</p>
                                                <p className={`font-semibold ${hasConflict ? 'text-red-600 dark:text-red-400' : 'dark:text-white'}`}>{value}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={handleMerge}
                                className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 flex items-center gap-3 shadow-lg"
                            >
                                <span className="material-symbols-outlined text-2xl">merge</span>
                                Merge & Resolve Conflicts
                            </button>
                            <button className="px-8 py-4 bg-white dark:bg-[#2a2f45] border-2 border-[#e7e9f3] dark:border-[#2a2f45] rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-[#2a2f45] flex items-center gap-3">
                                <span className="material-symbols-outlined text-2xl">link_off</span>
                                Create Separate Records
                            </button>
                        </div>
                    </>
                )}

                {!showResults && (
                    <div className="bg-white dark:bg-[#1a1e36] rounded-xl border border-[#cfd3e7] dark:border-[#2a2f45] p-16 text-center">
                        <span className="material-symbols-outlined text-8xl text-[#4c599a] opacity-20 mb-6">search</span>
                        <h3 className="text-xl font-bold dark:text-white">Enter search criteria above</h3>
                        <p className="text-[#4c599a] mt-2">Search for vehicles to compare legacy and current database records</p>
                    </div>
                )}
            </div>

            {/* Merge Preview Modal */}
            {showMergeModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-[#1a1e36] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="sticky top-0 bg-white dark:bg-[#1a1e36] border-b border-[#e7e9f3] dark:border-[#2a2f45] p-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold dark:text-white">Review Merge Preview</h2>
                                <button onClick={() => setShowMergeModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-[#2a2f45] rounded-lg">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/50 p-4 rounded-lg">
                                <p className="text-sm text-blue-900 dark:text-blue-200">
                                    <span className="font-bold">Merge Strategy:</span> Keep current database values for all fields. Legacy data will be archived with reference link.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-bold dark:text-white mb-3">Conflict Resolution</h4>
                                <div className="space-y-3">
                                    {conflicts.map((conflict, idx) => (
                                        <div key={idx} className="p-4 bg-gray-50 dark:bg-[#2a2f45] rounded-lg">
                                            <p className="text-xs font-bold text-[#4c599a] uppercase mb-2">{conflict.field}</p>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-2 bg-white dark:bg-[#1a1e36] rounded border border-red-200">
                                                    <p className="text-[10px] text-red-600 font-bold uppercase mb-1">Legacy (Discarded)</p>
                                                    <p className="text-sm line-through text-gray-500">{conflict.legacy}</p>
                                                </div>
                                                <div className="p-2 bg-white dark:bg-[#1a1e36] rounded border-2 border-green-500">
                                                    <p className="text-[10px] text-green-600 font-bold uppercase mb-1">Current (Kept)</p>
                                                    <p className="text-sm font-bold text-green-600">{conflict.current}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-[#e7e9f3] dark:border-[#2a2f45]">
                                <button
                                    onClick={() => {
                                        setShowMergeModal(false);
                                        alert('Records merged successfully!');
                                    }}
                                    className="flex-1 px-6 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined">check_circle</span>
                                    Confirm Merge
                                </button>
                                <button
                                    onClick={() => setShowMergeModal(false)}
                                    className="px-6 py-4 border-2 border-[#e7e9f3] dark:border-[#2a2f45] rounded-xl font-bold hover:bg-background-light dark:hover:bg-[#2a2f45]"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
