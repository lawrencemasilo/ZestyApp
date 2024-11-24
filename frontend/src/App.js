// File: src/App.js
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";
import { Login } from "./pages/Auth/Login";
import { ForgotPassword } from "./pages/Auth/ForgotPassword";
import { Register } from "./pages/Auth/Register";
import { Dashboard } from "./pages/SME/Dashboard";
import { Credit } from "./pages/SME/Credit";
import { Settings } from "./pages/SME/Settings";
import { Suppliers } from "./pages/SME/Suppliers";
import TransactionsPage from "./pages/SME/TransactionsPage";
import SupDashboard from "./pages/Supplier/Dashboard";
import SupTransaction from "./pages/Supplier/Transactions";
import { NavBar } from "./components/SME/NavBar";
import useIsDesktop from "./hooks/useIsDesktop";
import { MobileHeader } from "./components/SME/MobileHeader";
import { MobileNavBar } from "./components/SME/MobileNavBar";

function Layout() {
  const isDesktop = useIsDesktop();

  return (
    <div className="bg-[#f7f7f7]" style={{ fontFamily: '"Inter", serif' }}>
      {isDesktop ? (
        <div className="flex flex-row h-screen w-full">
          <div className="w-[310px] bg-[#F0F5F7] opacity-[100%] h-full">
            <NavBar />
          </div>
          <div className="w-full m-[15px]">
            <Outlet />
          </div>
        </div>
      ) : (
        <div className="bg-[#f7f7f7] flex flex-col w-full h-full sm:max-w-[640px] mx-auto">
          <div className="bg-[#171415]">
            <div className="w-full h-[70px]">
              <MobileHeader />
            </div>
            <div className="flex flex-row justify-center items-center my-[20px] w-full h-[60px] bg-[#171415]">
              <MobileNavBar />
            </div>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="credit" element={<Credit />} />
        <Route path="settings" element={<Settings />} />
        <Route path="suppliers" element={<Suppliers />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="supplier">
          <Route path="dashboard" element={<SupDashboard />} />
          <Route path="transactions" element={<SupTransaction />} />
        </Route>
        <Route path="*" element={<div>Page not found</div>} />
      </Route>
    </Routes>
  );
}

export default App;
