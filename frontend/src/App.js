import { Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/Auth/Login";
import { ForgotPassword } from "./pages/Auth/ForgotPassword";
import { Register } from "./pages/Auth/Register";
import { Dashboard } from "./pages/SME/Dashboard";
import CreditPage from "./pages/SME/Credit";
import { Settings } from "./pages/SME/Settings";
import SupplierPage from "./pages/SME/Suppliers";
import TransactionsPage from "./pages/SME/TransactionsPage";
import SupDashboard from "./pages/Supplier/Dashboard";
import SupTransaction from "./pages/Supplier/Transactions";
import { NavBar } from "./components/SME/NavBar";
import useIsDesktop from "./hooks/useIsDesktop";
import { MobileHeader } from "./components/SME/MobileHeader";
import { MobileNavBar } from "./components/SME/MobileNavBar";
import AccountSelection from "./pages/Auth/AccountSelection";
import { SignupSme } from "./pages/Auth/SignupSme";
import SignupSupplier from "./pages/Auth/SignupSupplier";
import ProfilePage, { Profile } from "./pages/SME/Profile";
import LandingPage from "./pages/Landing/LandingPage";
import { MobileDashboard } from "./pages/SME/Mobile/MobileDashboard";
import MobileCreditPage from "./pages/SME/Mobile/CreditMobile";
import MobileSupplierPage from "./pages/SME/Mobile/SuppliersMobile";
import MobileTransactionsPage from "./pages/SME/Mobile/TransactionsMobile";
import ProtectedRoute from './components/ProtectedRoute';

// Layout for non-authenticated and authenticated pages (with navbar)
function Layout() {
  const isDesktop = useIsDesktop();

  return (
    <div className="bg-[#FAFBFC]" style={{ fontFamily: '"Inter", serif' }}>
        <div className="flex flex-row h-screen w-full">
          {isDesktop && <NavBar />}
          <Outlet />
        </div>
    </div>
  );
}

// Layout for the landing page (without navbar)
function LandingPageLayout() {
  return (
    <div className="">
      <Outlet />
    </div>
  );
}

// Layout for authentication pages
function AuthLayout() {
  return (
    <div className="">
      <Outlet />
    </div>
  );
}

function App() {
  const isDesktop = useIsDesktop();
  return (
    <Routes>
      {/* Main Layout with Navbar */}
      <Route path="/" element={<Layout />}>
        {isDesktop ? <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />:
          <Route path="dashboard" element={<ProtectedRoute><MobileDashboard /></ProtectedRoute>} />
        }
        {isDesktop ? <Route path="transactions" element={<ProtectedRoute><TransactionsPage /></ProtectedRoute>} />:
          <Route path="transactions" element={<ProtectedRoute><MobileTransactionsPage /></ProtectedRoute>} />
        }
        {isDesktop? <Route path="credit" element={<ProtectedRoute><CreditPage /></ProtectedRoute>} />:
          <Route path="credit" element={<ProtectedRoute><MobileCreditPage /></ProtectedRoute>} />
        }

        <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        {isDesktop? <Route path="suppliers" element={<ProtectedRoute><SupplierPage /></ProtectedRoute>} />:
          <Route path="suppliers" element={<ProtectedRoute><MobileSupplierPage /></ProtectedRoute>} />
        }
        <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="supplier">
          <Route path="dashboard" element={<SupDashboard />} />
          <Route path="transactions" element={<SupTransaction />} />
        </Route>
      </Route>

      {/* Landing Page Layout (without navbar) */}
      <Route path="/" element={<LandingPageLayout />}>
        <Route index element={<LandingPage />} />
      </Route>

      {/* Auth Layout */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="account-type" element={<AccountSelection />} />
        <Route path="signup-sme" element={<SignupSme />} />
        <Route path="signup-supplier" element={<SignupSupplier />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
}

export default App;
