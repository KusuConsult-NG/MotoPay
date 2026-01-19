import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import ToastProvider from './components/ToastProvider';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy-load layout
const MainLayout = lazy(() => import('./layouts/MainLayout'));

// Lazy-load public pages
const Home = lazy(() => import('./pages/Home'));
const VehicleLookup = lazy(() => import('./pages/VehicleLookup'));
const CommercialCompliance = lazy(() => import('./pages/CommercialCompliance'));
const Checkout = lazy(() => import('./pages/Checkout'));
const PaymentCallback = lazy(() => import('./pages/PaymentCallback'));
const Receipt = lazy(() => import('./pages/Receipt'));
const Login = lazy(() => import('./pages/Login'));

// Lazy-load protected pages
const AgentPortal = lazy(() => import('./pages/AgentPortal'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const ExceptionQueue = lazy(() => import('./pages/ExceptionQueue'));
const VehicleResolution = lazy(() => import('./pages/VehicleResolution'));
const PriceConfiguration = lazy(() => import('./pages/PriceConfiguration'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    <LoadingSpinner />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <ToastProvider />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="lookup" element={<VehicleLookup />} />
                <Route path="commercial" element={<CommercialCompliance />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="payment/callback" element={<PaymentCallback />} />
                <Route path="receipt" element={<Receipt />} />
              </Route>
              {/* Login - public route */}
              <Route path="/login" element={<Login />} />

              {/* Agent portal - protected route for AGENT role */}
              <Route
                path="/agent"
                element={
                  <ProtectedRoute roles={['AGENT']}>
                    <AgentPortal />
                  </ProtectedRoute>
                }
              />

              {/* Admin pages - protected routes for ADMIN and SUPER_ADMIN roles */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute roles={['ADMIN', 'SUPER_ADMIN']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/exceptions"
                element={
                  <ProtectedRoute roles={['ADMIN', 'SUPER_ADMIN']}>
                    <ExceptionQueue />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/resolution"
                element={
                  <ProtectedRoute roles={['ADMIN', 'SUPER_ADMIN']}>
                    <VehicleResolution />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/pricing"
                element={
                  <ProtectedRoute roles={['ADMIN', 'SUPER_ADMIN']}>
                    <PriceConfiguration />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
