import React, { useState, useEffect } from 'react';
import { 
  Download, Search, Filter, Bell, 
  LayoutDashboard, ArrowRightLeft, CreditCardIcon, 
  Building2, LogOut, Moon, Sun, } from 'lucide-react';
import NotificationsPopover from '../../components/SME/NotificationsPopover';
import axios from '../../api/axios';
import { useTheme } from '../../components/ui/darkmode';

const TransactionsPage = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {       
      try {
        const response = await axios.get('transaction');
        
        // backend transactions match the current UI structure
        const formattedTransactions = response.data.transactions.map(transaction => ({
          id: transaction._id,
          name: transaction.supplier_id ? 'Supplier Transaction' : 'Repayment',
          date: new Date(transaction.createdAt).toLocaleDateString(),
          type: transaction.transaction_type.toUpperCase(),
          invoiceId: transaction.transaction_id,
          fees: 'R0.00',
          amount: `R${transaction.amount.toLocaleString()}.00`,
          status: transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)
        }));

        setTransactions(formattedTransactions);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to fetch transactions');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen text-red-500">
  //       {error}
  //     </div>
  //   );
  // }

  return (
    <div className="flex justify-center w-full bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex-1 p-8 pt-5 overflow-y-auto">
        {/* Header*/}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Transactions</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">View and manage your transaction history</p>
          </div>
          {/* Dark Mode Toggle and Download/Notifications */}
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
            
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 text-sm border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-white">
                <Download className="w-4 h-4" />
                Download
              </button>
              <NotificationsPopover />
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          {/* Table Header */}
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
              Transactions List
            </h2>
            {/* Search and Filter Section*/}
            <div className="flex items-center gap-4">
              <div className="flex border dark:border-gray-700 rounded-lg overflow-hidden">
                <button className="px-3 py-1 text-xs text-gray-600 dark:text-gray-300 border-r dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 flex-1">All</button>
                <button className="px-3 py-1 text-xs text-gray-600 dark:text-gray-300 border-r dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 flex-1">Credit</button>
                <button className="px-3 py-1 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex-1">Debit</button>
              </div>
              
              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions"
                  className="pl-10 pr-4 py-2 border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Filter button */}
              <button className="flex items-center gap-2 px-4 py-2 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filter</span>
              </button>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
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
              
              {/* Table Body */}
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-gray-500 dark:text-gray-400">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  transactions.map((transaction) => (
                    <tr 
                      key={transaction.id} 
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
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
                            transaction.status === "Completed"
                              ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400"
                              : transaction.status === "Pending"
                              ? "bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-400"
                              : "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;