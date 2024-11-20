import React from 'react';
import { Search, Filter, Download, MoreVertical, Bell, Wallet, ArrowUpDown,  } from 'lucide-react';
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
    <div className="flex w-full h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white">
        <NavBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-black">Transactions</h1>
              <p className="text-gray-500 text-sm">View all transactions</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreVertical className="w-5 h-5 text-black" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Wallet className="w-5 h-5 text-black"/>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-black">Transactions List</h2>
            <button className="flex items-center gap-2 px-3 py-1 border rounded-lg hover:bg-gray-50">
              <Download className="w-3 h-3" />
              <span className="text-xs">Download</span>
            </button>
          </div>

          {/* First horizontal line */}
          <div className="w-full h-px bg-gray-200 mb-4"></div>

          <div className="mb-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex border rounded-lg overflow-hidden">
                <button className="px-3 py-1 text-xs text-gray-600 border-r hover:bg-gray-100 flex-1">All</button>
                <button className="px-3 py-1 text-xs text-gray-600 border-r hover:bg-gray-100 flex-1">Credit</button>
                <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 flex-1">Debit</button>
              </div>
              <div className="relative flex-grow pr-6">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-9 pr-6 py-2 border rounded-lg w-full text-sm"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filters</span>
              </button>
            </div>
          </div>

          {/* Second horizontal line */}
          <div className="w-full h-px bg-gray-200 mb-4"></div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-200">
                  <th className="pb-4 pr-4">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="pb-4 text-sm text-black font-normal">
                    <div className="flex items-center gap-2">
                      Name/Company
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="pb-4 text-sm text-black font-normal">
                    <div className="flex items-center gap-2">
                      Date
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="pb-4 text-sm text-black font-normal">
                    <div className="flex items-center gap-2">
                      Type
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="pb-4 text-sm text-black font-normal">
                    <div className="flex items-center gap-2">
                      Invoice ID
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="pb-4 text-sm text-black font-normal">
                    <div className="flex items-center gap-2">
                      Fees
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="pb-4 text-sm text-black font-normal">
                    <div className="flex items-center gap-2">
                      Amount
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="pb-4 text-sm text-black font-normal">
                    <div className="flex items-center gap-2">
                      Status
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-200">
                    <td className="py-4 pr-4">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <span className="text-sm text-black">{transaction.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-black">{transaction.date}</td>
                    <td className="py-4 text-sm text-black">{transaction.type}</td>
                    <td className="py-4 text-sm text-black">{transaction.invoiceId}</td>
                    <td className="py-4 text-sm text-black">{transaction.fees}</td>
                    <td className="py-4 text-sm text-black">{transaction.amount}</td>
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