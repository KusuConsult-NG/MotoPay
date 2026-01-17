import { Component, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
                    <div className="bg-white dark:bg-[#1a1e36] rounded-xl border border-[#cfd3e7] dark:border-[#2a2f45] p-8 max-w-md text-center">
                        <span className="material-symbols-outlined text-6xl text-red-500 mb-4">error</span>
                        <h2 className="text-2xl font-bold dark:text-white mb-2">Oops! Something went wrong</h2>
                        <p className="text-[#4c599a] dark:text-[#a0a8cc] mb-6">
                            {this.state.error?.message || 'An unexpected error occurred'}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
