import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './ui/LoadingSpinner';

interface ProtectedRouteProps {
    children: React.ReactNode;
    roles?: ('AGENT' | 'ADMIN' | 'SUPER_ADMIN')[];
    redirectTo?: string;
}

export default function ProtectedRoute({
    children,
    roles,
    redirectTo = '/login'
}: ProtectedRouteProps) {
    const { user, isLoading, isAuthenticated } = useAuth();

    // Show loading spinner while checking authentication
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated || !user) {
        return <Navigate to={redirectTo} replace />;
    }

    // Check role-based access if roles are specified
    if (roles && roles.length > 0) {
        if (!roles.includes(user.role)) {
            // Redirect to appropriate page based on user role
            if (user.role === 'AGENT') {
                return <Navigate to="/agent" replace />;
            } else if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
                return <Navigate to="/admin" replace />;
            } else {
                // PUBLIC or other roles go to home
                return <Navigate to="/" replace />;
            }
        }
    }

    // User is authenticated and authorized
    return <>{children}</>;
}
