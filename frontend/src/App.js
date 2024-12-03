import { Routes, Route, Outlet } from "react-router-dom";
import { Login } from "./pages/Auth/Login";
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
import { SignupSupplier } from "./pages/Auth/SignupSupplier";
import ProfilePage, { Profile } from "./pages/SME/Profile";
import LandingPage from "./pages/Landing/LandingPage";
import { MobileDashboard } from "./pages/SME/Mobile/MobileDashboard";
import MobileCreditPage from "./pages/SME/Mobile/CreditMobile";
import MobileSupplierPage from "./pages/SME/Mobile/SuppliersMobile";
import MobileTransactionsPage from "./pages/SME/Mobile/TransactionsMobile";

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
    <div className="flex justify-center items-center w-full h-screen bg-gray-100">
      <Outlet />
    </div>
  );
}

// Layout for authentication pages
function AuthLayout() {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-100">
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
        <Route index element={<Dashboard />} />
        {isDesktop ? <Route path="dashboard" element={<Dashboard />} />:
          <Route path="dashboard" element={<MobileDashboard />} />
        }
        {isDesktop ? <Route path="transactions" element={<TransactionsPage />} />:
          <Route path="transactions" element={<MobileTransactionsPage />} />
        }
        {isDesktop? <Route path="credit" element={<CreditPage />} />:
          <Route path="credit" element={<MobileCreditPage />} />
        }

        <Route path="settings" element={<Settings />} />
        {isDesktop? <Route path="suppliers" element={<SupplierPage />} />:
          <Route path="suppliers" element={<MobileSupplierPage />} />
        }
        <Route path="profile" element={<ProfilePage />} />
        <Route path="supplier">
          <Route path="dashboard" element={<SupDashboard />} />
          <Route path="transactions" element={<SupTransaction />} />
        </Route>
      </Route>

      {/* Landing Page Layout (without navbar) */}
      {/*<Route path="/" element={<LandingPageLayout />}>
        <Route index element={<LandingPage />} />
      </Route>*/}

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
