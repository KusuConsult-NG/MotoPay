import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 3000,
                style: {
                    background: '#fff',
                    color: '#0d101b',
                    borderRadius: '12px',
                    padding: '16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                },
                success: {
                    iconTheme: {
                        primary: '#008751',
                        secondary: '#fff',
                    },
                    style: {
                        border: '2px solid #008751',
                    },
                },
                error: {
                    iconTheme: {
                        primary: '#ef4444',
                        secondary: '#fff',
                    },
                    style: {
                        border: '2px solid #ef4444',
                    },
                },
                loading: {
                    iconTheme: {
                        primary: '#1337ec',
                        secondary: '#fff',
                    },
                },
            }}
        />
    );
}
