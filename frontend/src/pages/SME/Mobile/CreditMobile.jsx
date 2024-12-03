import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { 
  TrendingUp, ArrowUpRight, Banknote, CircleGauge, Wallet, BarChart2, Building2, ArrowRightLeft, LayoutDashboard, Download, Bell, LogOut, CreditCardIcon, X, Menu
} from 'lucide-react';
import NotificationsPopover from '../../../components/SME/NotificationsPopover';
import { useSelectedItem } from '../../../context/SelectedItemContext';


const BottomNav = () => {  
  const { selectedItem, setSelectedItem } = useSelectedItem();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden p-0">
      <div className="flex justify-around items-center h-16 w-full p-0">
        <Link to="/dashboard" className="flex h-full" onClick={() => setSelectedItem("dashboard")}>
          <NavItem icon={<LayoutDashboard size={24} />}  text="Dashboard" active={selectedItem === 'dashboard' && true} />
        </Link>
        <Link to="/transactions" className="flex h-full" onClick={() => setSelectedItem('transactions')}>
          <NavItem icon={<ArrowRightLeft size={24} />}  text="Transactions" active={selectedItem === 'transactions' && true} />
        </Link>
        <Link to="/credit" className="flex h-full" onClick={() => setSelectedItem('credit')}>
          <NavItem icon={<CreditCardIcon size={24} />}  text="Credit" active={selectedItem === 'credit' && true} />
        </Link>
        <Link to="/suppliers" className="flex h-full" onClick={() => setSelectedItem('suppliers')}>
          <NavItem icon={<Building2 size={24} />}  text="Suppliers" active={selectedItem === 'suppliers' && true} />
        </Link>
      </div>  
    </div>
  );
}

const NavButton = ({ icon, text, active }) => (
  <button 
    className={`flex flex-col items-center justify-center w-full h-full space-y-1
               ${active ? 'text-blue-600' : 'text-gray-600'}`}
  >
    {icon}
    <span className="text-xs font-medium">{text}</span>
  </button>
);

const Header = () => (
  <div className="sticky top-0 z-10 bg-gray-50">
    {/* Top Bar with Logo, Notifications, and Profile */}
    <div className="flex items-center justify-between p-4 px-0 pt-2 ">
      <h1 className="text-3xl font-bold text-blue-600">Zesty</h1>
      <div className="flex items-center gap-4">
        <NotificationsPopover />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600 text-sm font-medium">NM</span>
          </div>
        </div>
      </div>
    </div>
    
    {/* Sub Header with Page Title and Actions */}
    {/*<div className="flex justify-between items-center p-4">
      <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
      <button className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg bg-white hover:bg-gray-50">
        <Download className="w-4 h-4" />
        <span>Download</span>
      </button>
    </div>*/}
  </div>
);


const NavItem = ({ icon, text, active }) => (
  <div className={`flex flex-col items-center px-4  py-3 rounded-lg cursor-pointer ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
    {icon}
    <span className="text-sm font-medium">{text}</span>
  </div>
);

const MobileCreditPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const creditDetails = {
    availableCredit: 16480.50,
    totalLimit: 50000,
    recentSpend: 3580.20,
    recentPayments: 2500.00,
    currentBalance: 33519.50,
    pastDueAmount: 0,
    paymentDueDate: '2023-06-15',
    creditScore: 780,
    creditUtilization: 0.33,
    paymentHistory: {
      onTime: 92,
      late: 2
    }
  };

  return (
    <div className="flex justify-center w-full bg-gray-50 min-h-screen">
      {/*<Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />*/}
      
      <div className="flex-1 p-8 px-4 pt-0 overflow-y-auto mb-12 mt-2">
        {/* Header */}
        {/*<div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-800">Credit Overview</h1>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <button className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Download
            </button>
            {/*<div className="relative">
              <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
            <NotificationsPopover />
          </div>
        </div>*/}
        <Header />
        <div className="flex justify-between items-center p-4 py-5 px-0">
          <h2 className="text-xl font-semibold text-gray-800">Credit</h2>
          {/*<button className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg bg-white hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>*/}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Available Credit */}
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-700 flex items-center gap-2">
                <CreditCardIcon className="w-5 h-5" />
                Available Credit
              </h3>
            </div>
            <div className="text-2xl font-semibold text-blue-600 mb-2">
              R{creditDetails.availableCredit.toFixed(2)}
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div 
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${(creditDetails.availableCredit / creditDetails.totalLimit) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Balance */}
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-700 flex items-center gap-2">
                <Banknote className="w-5 h-5" />
                Current Balance
              </h3>
            </div>
            <div className="text-2xl font-semibold text-gray-800 mb-2">
              R{creditDetails.currentBalance.toFixed(2)}
            </div>
            {creditDetails.pastDueAmount > 0 && (
              <div className="text-sm text-red-500 mb-2">
                Past Due: R{creditDetails.pastDueAmount.toFixed(2)}
              </div>
            )}
            <div className="text-sm text-gray-500">
              Payment Due: {creditDetails.paymentDueDate}
            </div>
          </div>

          {/* Credit Score */}
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-700 flex items-center gap-2">
                <CircleGauge className="w-5 h-5" />
                Credit Score
              </h3>
            </div>
            <div className="text-2xl font-semibold text-blue-600 mb-2">
              {creditDetails.creditScore}
            </div>
            <div className="text-sm text-gray-500 mb-2">
              {creditDetails.creditScore > 700 ? 'Excellent' : creditDetails.creditScore > 600 ? 'Good' : 'Fair'}
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div 
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${(creditDetails.creditScore / 850) * 100}%` }}
              />
            </div>
          </div>

          {/* Credit Utilization */}
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-700 flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Credit Utilization
              </h3>
            </div>
            <div className="text-2xl font-semibold text-gray-800 mb-2">
              {(creditDetails.creditUtilization * 100).toFixed(2)}%
            </div>
            <div className="text-sm text-gray-500 mb-2">
              Recommended utilization: 30% or less
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div 
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${creditDetails.creditUtilization * 100}%` }}
              />
            </div>
          </div>

          {/* Payment History */}
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-700 flex items-center gap-2">
                <BarChart2 className="w-5 h-5" />
                Payment History
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">On Time</p>
                <p className="text-lg font-semibold">{creditDetails.paymentHistory.onTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Late</p>
                <p className="text-lg font-semibold">{creditDetails.paymentHistory.late}</p>
              </div>
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    </div>
  );
};

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-white border-r border-gray-200 p-6 transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Zesty</h1>
        {isOpen && (
          <button className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300" onClick={onClose}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        )}
      </div>

      <nav className="flex flex-col space-y-2">
        <NavItem icon={<LayoutDashboard size={20} />} text="Dashboard" />
        <NavItem icon={<ArrowRightLeft size={20} />} text="Transactions" />
        <NavItem icon={<CreditCardIcon size={20} />} text="Credit" active />
        <NavItem icon={<Building2 size={20} />} text="Suppliers" />
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600 font-medium">NM</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Neo Masilo</p>
            <p className="text-xs text-gray-500">neolawrencemasilo@gmail.com</p>
          </div>
          <LogOut size={18} className="text-gray-400 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};


export default MobileCreditPage;
