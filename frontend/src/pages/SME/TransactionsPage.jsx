import React, { useState } from 'react';
import { 
  Download, Search, Filter, Bell, 
  LayoutDashboard, ArrowRightLeft, CreditCardIcon, 
  Building2, LogOut ,Moon, Sun, } from 'lucide-react';
import NotificationsPopover from '../../components/SME/NotificationsPopover';
import { useTheme } from '../../components/ui/darkmode';


const Sidebar = () => (
  <div className="w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
    {/* Logo */}
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Zesty</h1>
    </div>

    {/* Navigation Links */}
    <nav className="flex-1 px-4 space-y-2">
      <NavItem icon={<LayoutDashboard size={20} />} text="Dashboard" />
      <NavItem icon={<ArrowRightLeft size={20} />} text="Transactions" active />
      <NavItem icon={<CreditCardIcon size={20} />} text="Credit" />
      <NavItem icon={<Building2 size={20} />} text="Suppliers" />
    </nav>

    {/* User Profile */}
    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-gray-600 dark:text-gray-200 font-medium">NM</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium dark:text-white">Neo Masilo</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">neolawrencemasilo@gmail.com</p>
        </div>
        <LogOut size={18} className="text-gray-400 dark:text-gray-500 cursor-pointer" />
      </div>
    </div>
  </div>
);

const NavItem = ({ icon, text, active }) => (
  <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer ${
    active 
      ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' 
      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
  }`}>
    {icon}
    <span className="text-sm font-medium">{text}</span>
  </div>
);

const TransactionsPage = () => {
   const { darkMode, toggleDarkMode } = useTheme();
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const transactions = [
    {
      id: 1,
      name: 'Sabela',
      date: '11/10/2024',
      type: 'BNPL Repayment',
      invoiceId: 'SI002411',
      fees: 'R150.00',
      amount: 'R1,570.00',
      status: 'Pending'
    },
  ];

  return (
    <div className="flex justify-center w-full bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/*<Sidebar />*/}
      
      <div className="flex-1 p-8 pt-5 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Transactions</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">View and manage your transaction history</p>
          </div>
           {/* Dark Mode Toggle */}
           <div className="flex items-center gap-4">
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-700 bg-gray-800 text-yellow-500' 
                  : 'hover:bg-gray-100 bg-white text-gray-700'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
        </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 text-sm border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-white">
              <Download className="w-4 h-4" />
              Download
            </button>
             {/*<div className="relative">
              <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
            </div>*/}
            <NotificationsPopover />
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Transactions List</h2>
            <div className="flex items-center gap-4">
              <div className="flex border dark:border-gray-700 rounded-lg overflow-hidden">
                <button className="px-3 py-1 text-xs text-gray-600 dark:text-gray-300 border-r dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 flex-1">All</button>
                <button className="px-3 py-1 text-xs text-gray-600 dark:text-gray-300 border-r dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 flex-1">Credit</button>
                <button className="px-3 py-1 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex-1">Debit</button>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions"
                  className="pl-10 pr-4 py-2 border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filter</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                  <th className="pb-4 pr-4">
                    <input 
                      type="checkbox" 
                      onChange={() => setIsAllSelected((prev) => !prev)} 
                      className="rounded hover:cursor-pointer"
                    />
                  </th>
                  <th className="pb-4 text-sm font-medium">Name/Company</th>
                  <th className="pb-4 text-sm font-medium">Date</th>
                  <th className="pb-4 text-sm font-medium">Type</th>
                  <th className="pb-4 text-sm font-medium">Invoice ID</th>
                  <th className="pb-4 text-sm font-medium">Fees</th>
                  <th className="pb-4 text-sm font-medium">Amount</th>
                  <th className="pb-4 text-sm font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-4 pr-4">
                      <input 
                        type="checkbox" 
                        checked={isAllSelected} 
                        className="rounded hover:cursor-pointer" 
                      />
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                        <span className="text-sm dark:text-white">{transaction.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm dark:text-gray-300">{transaction.date}</td>
                    <td className="py-4 text-sm dark:text-gray-300">{transaction.type}</td>
                    <td className="py-4 text-sm dark:text-gray-300">{transaction.invoiceId}</td>
                    <td className="py-4 text-sm dark:text-gray-300">{transaction.fees}</td>
                    <td className="py-4 text-sm dark:text-gray-300">{transaction.amount}</td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          transaction.status === "Complete"
                            ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400"
                            : "bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-400"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;