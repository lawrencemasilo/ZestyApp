import React, { useState } from 'react';
import { Search, Filter, Download, MoreVertical, Bell, Wallet, ArrowUpDown,  } from 'lucide-react';

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
    {
      id: 3,
      name: 'Matrix',
      date: '10/11/2024',
      type: 'Inventory Purchase',
      invoiceId: 'SI002410',
      fees: 'R61.00',
      amount: 'R2,220.00',
      status: 'Complete'
    },
    {
      id: 4,
      name: 'Matrix',
      date: '10/11/2024',
      type: 'Inventory Purchase',
      invoiceId: 'SI002410',
      fees: 'R61.00',
      amount: 'R2,220.00',
      status: 'Complete'
    },
    {
      id: 5,
      name: 'Matrix',
      date: '10/11/2024',
      type: 'Inventory Purchase',
      invoiceId: 'SI002410',
      fees: 'R61.00',
      amount: 'R2,220.00',
      status: 'Complete'
    },
    {
      id: 6,
      name: 'Matrix',
      date: '10/11/2024',
      type: 'Inventory Purchase',
      invoiceId: 'SI002410',
      fees: 'R61.00',
      amount: 'R2,220.00',
      status: 'Complete'
    },
    {
      id: 7,
      name: 'Matrix',
      date: '10/11/2024',
      type: 'Inventory Purchase',
      invoiceId: 'SI002410',
      fees: 'R61.00',
      amount: 'R2,220.00',
      status: 'Complete'
    },
    {
      id: 8,
      name: 'Matrix',
      date: '10/11/2024',
      type: 'Inventory Purchase',
      invoiceId: 'SI002410',
      fees: 'R61.00',
      amount: 'R2,220.00',
      status: 'Complete'
    },
    {
      id: 9,
      name: 'Matrix',
      date: '10/11/2024',
      type: 'Inventory Purchase',
      invoiceId: 'SI002410',
      fees: 'R61.00',
      amount: 'R2,220.00',
      status: 'Complete'
    },
    {
      id: 10,
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
    <div className="flex w-full h-full bg-[#f7f7f7] min-h-[100%]  text-[#333333]">
      {/* Main Content */}
      <div className="flex-1 space-y-[15px]">
        {/* Header Card */}
        <div className="flex justify-between h-[80px] bg-white items-center mb-[15px] rounded-[10px] p-[10px] px-5">
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-semibold ">Transactions</h1>
            <p className="text-gray-500 text-[12px]">View all transactions</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MoreVertical className="" size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Wallet className="" size={20} />
            </button>
            <button className="flex justify-center items-center p-2 hover:bg-gray-100 rounded-full hover:cursor-pointer">
            <div className="w-[7px] h-[7px] absolute bg-[#E74C3C] rounded mt-[-16px] ml-[10px]"></div>
              <Bell className="" size={20} />
            </button>
          </div>
        </div>
          
        {/* Table Card */}
        <div className="bg-white rounded-lg shadow-sm p-5" style={{ height: '85%' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-600 text-l font-medium">Transactions List</h2>
            <button className="flex items-center h-[35px] gap-2 px-3 py-1 hover-item border rounded-lg">
              <Download className="w-3 h-3" />
              <span className="text-xs">Download</span>
            </button>
          </div>

          {/* First horizontal line */}
          <div className="w-full h-px bg-gray-200 mb-4"></div>

          <div className="mb-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex border rounded-lg overflow-hidden">
                <button className="px-3 py-1 text-xs text-gray-600 border-r hover-item flex-1">All</button>
                <button className="px-3 py-1 text-xs text-gray-600 border-r hover-item flex-1">Credit</button>
                <button className="px-3 py-1 text-xs text-gray-600 hover-item flex-1">Debit</button>
              </div>
              <div className="relative flex-grow pr-6">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-9 pr-6 py-2 border rounded-lg w-full text-sm"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover-item">
                <Filter className="w-4 h-4" />
                <span className="text-sm ">Filters</span>
              </button>
            </div>
          </div>

          {/* Second horizontal line */}
          <div className="w-full h-px bg-gray-200 mb-4"></div>

          <div className="h-[360px] scrollbar-container overflow-x-auto overflow-y-auto">
            <div className="relative">
              <table className="w-full">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="text-left text-gray-500 border-b border-gray-200">
                    <th className="pb-4 pr-4">
                      <input type="checkbox" onChange={() => setIsAllSelected((prev) => !prev)} className="rounded hover:cursor-pointer" />
                    </th>
                    <th className={`pb-4 text-sm font-normal ${sortBy === 'name' && 'text-black'}`}>
                      <div className="flex items-center gap-2 hover:cursor-pointer" onClick={() => setSortBy('name')}>
                        Name/Company
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className={`pb-4 text-sm font-normal ${sortBy === 'date' && 'text-black'}`}>
                      <div className="flex items-center gap-2 hover:cursor-pointer" onClick={() => setSortBy('date')}>
                        Date
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className={`pb-4 text-sm font-normal ${sortBy === 'type' && 'text-black'}`}>
                      <div className="flex items-center gap-2 hover:cursor-pointer" onClick={() => setSortBy('type')}>
                        Type
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className={`pb-4 text-sm font-normal ${sortBy === 'invoice' && 'text-black'}`}>
                      <div className="flex items-center gap-2 hover:cursor-pointer" onClick={() => setSortBy('invoice')}>
                        Invoice ID
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className={`pb-4 text-sm font-normal ${sortBy === 'fees' && 'text-black'}`}>
                      <div className="flex items-center gap-2 hover:cursor-pointer" onClick={() => setSortBy('fees')}>
                        Fees
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className={`pb-4 text-sm font-normal ${sortBy === 'amount' && 'text-black'}`}>
                      <div className="flex items-center gap-2 hover:cursor-pointer" onClick={() => setSortBy('amount')}>
                        Amount
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className={`pb-4 text-sm font-normal ${sortBy === 'status' && 'text-black'}`}>
                      <div className="flex items-center gap-2 hover:cursor-pointer" onClick={() => setSortBy('status')}>
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
                        {isAllSelected ?
                        <input type="checkbox" checked={isAllSelected} className="rounded hover:cursor-pointer" />
                        : <input type="checkbox" className="rounded hover:cursor-pointer" />
                        }
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
                              ? "bg-green-100 text-[#388E3C]"
                              : "bg-orange-100 text-[#F57C00]"
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
    </div>
  );
};

export default TransactionsPage;