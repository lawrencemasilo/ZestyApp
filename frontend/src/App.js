import { Routes, Route, Link, Outlet } from 'react-router-dom';
import {Login} from '../src/pages/Auth/Login';
import {ForgotPassword} from '../src/pages/Auth/ForgotPassword';
import {Register} from '../src/pages/Auth/Register';
import {Dashboard} from '../src/pages/SME/Dashboard';
import {Credit} from '../src/pages/SME/Credit';
import {Settings} from '../src/pages/SME/Settings';
import {Suppliers} from '../src/pages/SME/Suppliers';
import Transactions from '../src/pages/SME/Transactions';
import SupDashboard from '../src/pages/Supplier/Dashboard';
import SupTransaction from '../src/pages/Supplier/Transactions';

// Layout component
function Layout() {
  return (
    <>
     
      
    </>
  );
}

function App() {
  return (
    <>
    <Transactions/>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Default/Home route */}
        <Route index element={<Dashboard />} />

        {/* SME Routes */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="credit" element={<Credit />} />
        <Route path="settings" element={<Settings />} />
        <Route path="suppliers" element={<Suppliers />} />

        {/* Auth Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />

        {/* Supplier Routes */}
        <Route path="supplier">
          <Route path="dashboard" element={<SupDashboard />} />
          <Route path="transactions" element={<SupTransaction />} />
        </Route>

        {/* Catch all route for 404 */}
        <Route path="*" element={<div>Page not found</div>} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
