export default function SkeletonTable({ rows = 5 }: { rows?: number }) {
    return (
        <div className="animate-pulse">
            <div className="bg-background-light dark:bg-[#242942] px-6 py-4 flex gap-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-300 dark:bg-gray-600 rounded flex-1"></div>
                ))}
            </div>
            <div className="divide-y divide-[#e7e9f3] dark:divide-[#2a2f45]">
                {[...Array(rows)].map((_, i) => (
                    <div key={i} className="px-6 py-4 flex gap-4">
                        {[...Array(6)].map((_, j) => (
                            <div key={j} className="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
