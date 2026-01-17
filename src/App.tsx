import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import VehicleLookup from './pages/VehicleLookup';
import Checkout from './pages/Checkout';
import Receipt from './pages/Receipt';
import CommercialCompliance from './pages/CommercialCompliance';
import AgentPortal from './pages/AgentPortal';
import AdminDashboard from './pages/AdminDashboard';
import ExceptionQueue from './pages/ExceptionQueue';
import VehicleResolution from './pages/VehicleResolution';
import PriceConfiguration from './pages/PriceConfiguration';
import ErrorBoundary from './components/ErrorBoundary';
import ToastProvider from './components/ToastProvider';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ToastProvider />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="lookup" element={<VehicleLookup />} />
            <Route path="commercial" element={<CommercialCompliance />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="receipt" element={<Receipt />} />
          </Route>
          {/* Agent portal has its own layout */}
          <Route path="/agent" element={<AgentPortal />} />
          {/* Admin pages with their own layouts */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/exceptions" element={<ExceptionQueue />} />
          <Route path="/admin/resolution" element={<VehicleResolution />} />
          <Route path="/admin/pricing" element={<PriceConfiguration />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
