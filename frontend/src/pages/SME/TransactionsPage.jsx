import React, { useState } from 'react';
import { 
  Download, Search, Filter, Bell, 
  LayoutDashboard, ArrowRightLeft, CreditCardIcon, 
  Building2, LogOut 
} from 'lucide-react';

const Sidebar = () => (
  <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
    {/* Logo */}
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600">Zesty</h1>
    </div>

    {/* Navigation Links */}
    <nav className="flex-1 px-4 space-y-2">
      <NavItem icon={<LayoutDashboard size={20} />} text="Dashboard" />
      <NavItem icon={<ArrowRightLeft size={20} />} text="Transactions" active />
      <NavItem icon={<CreditCardIcon size={20} />} text="Credit" />
      <NavItem icon={<Building2 size={20} />} text="Suppliers" />
    </nav>

    {/* User Profile */}
    <div className="p-4 border-t border-gray-200">
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

// NavItem Component
const NavItem = ({ icon, text, active }) => (
  <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
    {icon}
    <span className="text-sm font-medium">{text}</span>
  </div>
);

const TransactionsPage = () => {
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
    // ... (rest of the transactions remain the same)
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Transactions</h1>
            <p className="text-sm text-gray-500">View and manage your transaction history</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Download
            </button>
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">Transactions List</h2>
            <div className="flex items-center gap-4">
              <div className="flex border rounded-lg overflow-hidden">
                <button className="px-3 py-1 text-xs text-gray-600 border-r hover:bg-gray-50 flex-1">All</button>
                <button className="px-3 py-1 text-xs text-gray-600 border-r hover:bg-gray-50 flex-1">Credit</button>
                <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-50 flex-1">Debit</button>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions"
                  className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filter</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200 text-gray-500">
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
                  <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 pr-4">
                      <input 
                        type="checkbox" 
                        checked={isAllSelected} 
                        className="rounded hover:cursor-pointer" 
                      />
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <span className="text-sm">{transaction.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm">{transaction.date}</td>
                    <td className="py-4 text-sm">{transaction.type}</td>
                    <td className="py-4 text-sm">{transaction.invoiceId}</td>
                    <td className="py-4 text-sm">{transaction.fees}</td>
                    <td className="py-4 text-sm">{transaction.amount}</td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          transaction.status === "Complete"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
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