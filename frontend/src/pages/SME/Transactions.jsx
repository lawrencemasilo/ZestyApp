import React from 'react';
import { Search, Filter, Download, MoreVertical, Bell } from 'lucide-react';
import { NavBar } from '../../components/SME/NavBar';

const TransactionsPage = () => {
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
    {
      id: 2,
      name: 'Matrix',
      date: '10/11/2024',
      type: 'Inventory Purchase',
      invoiceId: 'SI002410',
      fees: 'R61.00',
      amount: 'R2,220.00',
      status: 'Complete'
    }
  ];

  return (
    <div className="flex w-full h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 border-r">
        <NavBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold">Transactions</h1>
              <p className="text-gray-500">View all transactions</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex gap-4 border-b">
              <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600">All</button>
              <button className="px-4 py-2 text-gray-500">Credit</button>
              <button className="px-4 py-2 text-gray-500">Debit</button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border rounded-lg w-64"
              />
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-4">Name/Company</th>
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Type</th>
                  <th className="pb-4">Invoice ID</th>
                  <th className="pb-4">Fees</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <span>{transaction.name}</span>
                      </div>
                    </td>
                    <td className="py-4">{transaction.date}</td>
                    <td className="py-4">{transaction.type}</td>
                    <td className="py-4">{transaction.invoiceId}</td>
                    <td className="py-4">{transaction.fees}</td>
                    <td className="py-4">{transaction.amount}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        transaction.status === 'Complete' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
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