interface ErrorStateProps {
    title?: string;
    message: string;
    onRetry?: () => void;
    icon?: 'error' | 'warning' | 'no_data';
}

export default function ErrorState({
    title = 'Something went wrong',
    message,
    onRetry,
    icon = 'error'
}: ErrorStateProps) {
    const icons = {
        error: 'error',
        warning: 'warning',
        no_data: 'inbox'
    };

    const colors = {
        error: 'text-red-500',
        warning: 'text-orange-500',
        no_data: 'text-gray-400'
    };

    return (
        <div className="flex flex-col items-center justify-center p-12 text-center">
            <span className={`material-symbols-outlined text-7xl mb-4 ${colors[icon]} opacity-50`}>
                {icons[icon]}
            </span>
            <h3 className="text-xl font-bold dark:text-white mb-2">{title}</h3>
            <p className="text-[#4c599a] dark:text-[#a0a8cc] mb-6 max-w-md">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                    <span className="material-symbols-outlined">refresh</span>
                    Try Again
                </button>
            )}
        </div>
    );
}
