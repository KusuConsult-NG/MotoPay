import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import VehicleLookup from './pages/VehicleLookup';
import Checkout from './pages/Checkout';
import PaymentCallback from './pages/PaymentCallback';
import Receipt from './pages/Receipt';
import CommercialCompliance from './pages/CommercialCompliance';
import AgentPortal from './pages/AgentPortal';
import AdminDashboard from './pages/AdminDashboard';
import ExceptionQueue from './pages/ExceptionQueue';
import VehicleResolution from './pages/VehicleResolution';
import PriceConfiguration from './pages/PriceConfiguration';
import Login from './pages/Login';
import ErrorBoundary from './components/ErrorBoundary';
import ToastProvider from './components/ToastProvider';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <ToastProvider />
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
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
