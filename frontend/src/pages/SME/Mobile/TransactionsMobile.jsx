import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { 
  Search, Filter,  
  LayoutDashboard, ArrowRightLeft, CreditCardIcon, 
  Building2 
} from 'lucide-react';
import NotificationsPopover from '../../../components/SME/NotificationsPopover';
import { useSelectedItem } from '../../../context/SelectedItemContext';
import axios from '../../../api/axios';

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


const Header = () => {
  const { setSelectedItem } = useSelectedItem();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/auth/profile");
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
    fetchUserProfile();
  }, []);
  return (
    <div className="sticky top-0 z-10 bg-gray-50">
      {/* Top Bar with Logo, Notifications, and Profile */}
      <div className="flex items-center justify-between p-4 px-0 pt-2 ">
        <h1 className="text-3xl font-bold text-blue-600">Zesty</h1>
        <div className="flex items-center gap-4">
          <NotificationsPopover />
          <div className="flex items-center gap-2" onClick={() => setSelectedItem('profile')}>
            <Link to="/profile" >
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">
                {user && user.firstName && user.lastName
                    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
                    : ""}
                </span>
              </div>
            </Link>
          </div>
          </div>
        </div>
    </div>
  )
};


const NavItem = ({ icon, text, active }) => (
    <div className={`flex flex-col items-center px-4  py-3 rounded-lg cursor-pointer ${active ? ' text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
        {icon}
        <span className="text-sm font-medium">{text}</span>
    </div>
);



const MobileTransactionsPage = () => {
  const [isAllSelected, setIsAllSelected] = useState(false);
  

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
    // Add more transactions as needed
  ];

  return (
    <div className="flex min-h-screen w-full h-full bg-gray-50">
      {/* Sidebar for Mobile and Desktop */}
      {/*<Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />*/}

      <div className="flex-1 flex flex-col">
        {/* Mobile Header with Hamburger */}
        {/*<div className="md:hidden p-4 flex justify-between items-center bg-white shadow-sm">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold">Transactions</h1>
          <NotificationsPopover />
        </div>*/}
        <Header />
        <div className="flex justify-between items-center p-4 py-5 px-4">
            <h2 className="text-xl font-semibold text-gray-800">Transactions</h2>
            {/*<button className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg bg-white hover:bg-gray-50">
                <Download className="w-4 h-4" />
                <span>Download</span>
            </button>*/}
        </div>

        <div className="p-4 md:p-8 overflow-y-auto">
          {/* Desktop Header */}
          {/*<div className="hidden md:flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Transactions</h1>
              <p className="text-sm text-gray-500">View and manage your transaction history</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4" />
                Download
              </button>
              <NotificationsPopover />
            </div>
          </div>*/}

          {/* Transactions Table */}
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <div className="mb-4 flex flex-col md:flex-row gap-4 md:justify-between md:items-center">
              <h2 className="text-lg font-semibold text-gray-700">Transactions List</h2>
              
              {/* Responsive Filters */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex border rounded-lg overflow-hidden w-full md:w-auto">
                  <button className="px-3 py-1 text-xs text-gray-600 border-r hover:bg-gray-50 flex-1">All</button>
                  <button className="px-3 py-1 text-xs text-gray-600 border-r hover:bg-gray-50 flex-1">Credit</button>
                  <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-50 flex-1">Debit</button>
                </div>
                
                <div className="relative w-full md:w-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search transactions"
                    className="w-full md:w-auto pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 w-full md:w-auto justify-center">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm">Filter</span>
                </button>
              </div>
            </div>

            {/* Mobile Table View */}
            <div className="block md:hidden">
              {transactions.map((transaction) => (
                <div 
                  key={transaction.id} 
                  className="bg-white border-b py-4 flex flex-col space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <span className="text-sm font-medium">{transaction.name}</span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        transaction.status === "Complete"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{transaction.date}</span>
                    <span>{transaction.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{transaction.type}</span>
                    <span>Invoice: {transaction.invoiceId}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
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
        <BottomNav />
      </div>
    </div>
  );
};

export default MobileTransactionsPage;