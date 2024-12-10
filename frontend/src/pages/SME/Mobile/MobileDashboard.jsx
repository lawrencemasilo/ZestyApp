import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Bell, Download, CreditCard, TrendingUp, Clock, ArrowUpRight, ArrowDownRight, 
         LayoutDashboard, ArrowRightLeft, CreditCardIcon, Building2, ChevronRight, LogOut,
         PlusCircle, X, DollarSign, Calendar, Search, Filter, Menu } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
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

const Header = () => {
  const { selectedItem, setSelectedItem } = useSelectedItem();

  return (
  <div className="sticky top-0 z-10 bg-gray-50">
    {/* Top Bar with Logo, Notifications, and Profile */}
    <div className="flex items-center justify-between p-4 px-0 ">
      <h1 className="text-3xl font-bold text-blue-600">Zesty</h1>
      <div className="flex items-center gap-4">
        <NotificationsPopover />
          <div className="flex items-center gap-2" onClick={() => setSelectedItem('profile')}>
          <Link to="/profile" >
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">NM</span>
            </div>
          </Link>
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
  )
};

const Sheet = ({ children, open, onOpenChange }) => {
  if (!open) return null;
  
  return (
    <>
      <div 
        className="fixed inset-0 bg-black/20 z-40"
        onClick={() => onOpenChange(false)}
      />
      {children}
    </>
  );
};

const SheetContent = ({ children, onClose }) => (
  <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 animate-in slide-in-from-left">
    <button 
      onClick={onClose}
      className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-lg"
    >
      <X className="w-5 h-5" />
    </button>
    {children}
  </div>
);

const MobileNav = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setOpen(true)} 
        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
      >
        <Menu className="w-6 h-6" />
      </button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent onClose={() => setOpen(false)}>
          {children}
        </SheetContent>
      </Sheet>
    </>
  );
};


// NavItem Component remains the same
const NavItem = ({ icon, text, active }) => (
  <div className={`flex flex-col items-center px-4  py-3 rounded-lg cursor-pointer ${active ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
    {icon}
    <span className="text-sm font-medium">{text}</span>
  </div>
);

const CreditApplicationModal = ({ isOpen, onClose }) => {
  const [term, setTerm] = useState(30);
  const [amount, setAmount] = useState('');
  const maxCredit = 50000;
  const availableCredit = maxCredit - 16480.50;
  
  const getInterestRate = (term) => {
    const rates = {
      30: 12.5,
      60: 14.5,
      90: 16.5
    };
    return rates[term];
  };

  const calculateMonthlyPayment = () => {
    const principal = parseFloat(amount);
    const rate = getInterestRate(term) / 100 / 12;
    const months = term / 30;
    if (!principal) return 0;
    return (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-blue-600" />
            Apply for Credit
          </DialogTitle>
          <DialogDescription>
            Apply for additional credit based on your current standing
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Available Credit</label>
            <div className="text-2xl font-semibold text-gray-900">
              R{availableCredit.toFixed(2)}
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div 
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${(1 - availableCredit/maxCredit) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Amount</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                max={availableCredit}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter amount"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Term (Days)</label>
            <div className="grid grid-cols-3 gap-4">
              {[30, 60, 90].map((days) => (
                <button
                  key={days}
                  onClick={() => setTerm(days)}
                  className={`py-2 px-4 rounded-lg border ${
                    term === days 
                      ? 'bg-blue-50 border-blue-600 text-blue-600' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {days} days
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Interest Rate</span>
              <span className="font-medium">{getInterestRate(term)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Monthly Payment</span>
              <span className="font-medium">R{calculateMonthlyPayment().toFixed(2)}</span>
            </div>
          </div>

          <button
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                       transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!amount || amount > availableCredit}
          >
            Submit Application
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const EnhancedCreditScore = () => {
  const score = 75;
  const history = [65, 68, 72, 75];
  
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-gray-700 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Credit Score
        </h3>
        <div className="text-right">
          <div className="text-3xl font-bold text-blue-600">{score}</div>
          <div className="text-sm text-gray-500">out of 100</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative pt-4">
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full 
                         transition-all duration-500"
              style={{ width: `${score}%` }}
            />
          </div>
          <div className="absolute top-0 left-0 w-full flex justify-between text-xs text-gray-400">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpRight className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-500">+{score - history[history.length-2]} points this month</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Payment History</div>
            <div className="text-lg font-semibold text-gray-700">98%</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Credit Usage</div>
            <div className="text-lg font-semibold text-gray-700">32%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ metric, onSelect, selected }) => {
  const data = {
    'Repayment History': {
      current: 98,
      previous: 95,
      trend: 'up',
      color: 'green',
      detail: 'Consistent on-time payments'
    },
    'External Credit': {
      current: 45,
      previous: 48,
      trend: 'down',
      color: 'red',
      detail: 'Recent credit inquiries affected score'
    },
    'Credit Usage': {
      current: 32,
      previous: 28,
      trend: 'up',
      color: 'green',
      detail: 'Well below 50% threshold'
    },
    'Cash Flow': {
      current: 85,
      previous: 82,
      trend: 'up',
      color: 'green',
      detail: 'Strong positive cash flow'
    }
  };

  const metricData = data[metric.name];

  return (
    <div 
      onClick={() => onSelect(metric.name)}
      className={`p-4 bg-white rounded-xl shadow-sm cursor-pointer transition-all
                 ${selected ? 'ring-2 ring-blue-600' : 'hover:shadow-md'}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">{metric.name}</span>
        {metricData.trend === 'up' ? (
          <ArrowUpRight className={`w-4 h-4 text-${metricData.color}-500`} />
        ) : (
          <ArrowDownRight className={`w-4 h-4 text-${metricData.color}-500`} />
        )}
      </div>
      
      <div className="text-2xl font-bold mb-1">{metricData.current}%</div>
      
      <div className={`text-xs text-${metricData.color}-500 flex items-center gap-1`}>
        {metricData.trend === 'up' ? '+' : ''}{metricData.current - metricData.previous}%
      </div>
      
      {selected && (
        <div className="mt-4 text-sm text-gray-500">{metricData.detail}</div>
      )}
    </div>
  );
};


const TransactionsList = () => {
  const transactions = [
    {
      id: 1,
      merchant: "Pick n Pay",
      date: "7 Nov 2024",
      amount: -1220.40,
      category: "Groceries",
      status: "completed",
      logo: "PnP"
    },
    {
      id: 2,
      merchant: "Takealot",
      date: "6 Nov 2024",
      amount: -2150.00,
      category: "Shopping",
      status: "completed",
      logo: "TL"
    },
    {
      id: 3,
      merchant: "Salary Credit",
      date: "1 Nov 2024",
      amount: 25000.00,
      category: "Income",
      status: "completed",
      logo: "SC"
    },
    {
      id: 4,
      merchant: "Netflix",
      date: "1 Nov 2024",
      amount: -199.00,
      category: "Entertainment",
      status: "pending",
      logo: "NF"
    },
    {
      id: 5,
      merchant: "Woolworths",
      date: "31 Oct 2024",
      amount: -850.30,
      category: "Groceries",
      status: "completed",
      logo: "WW"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm mt-6">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <div className="flex items-center gap-4">
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

        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-medium text-gray-600">
                  {transaction.logo}
                </div>
                <div>
                  <p className="font-medium">{transaction.merchant}</p>
                  <p className="text-sm text-gray-500">{transaction.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                  R{Math.abs(transaction.amount).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CreditCardComponent = ({ onApplyClick }) => {
  const cardDetails = {
    cardNumber: "**** **** **** 0321",
    cardHolder: "Neo Masilo",
    expiryDate: "09/26",
    availableCredit: 16480.50,
    totalLimit: 50000,
    recentActivity: {
      spent: 3580.20,
      payments: 2500.00
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl text-white">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg">Zesty Pay</h3>
        <button 
          onClick={onApplyClick}
          className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span className="text-sm">Apply</span>
        </button>
      </div>

      <div className="mb-6">
        <p className="text-sm opacity-75 mb-1">Available Credit</p>
        <p className="text-2xl font-semibold">R{cardDetails.availableCredit.toFixed(2)}</p>
        <div className="w-full h-1 bg-white/20 rounded-full mt-2">
          <div 
            className="h-full bg-white/50 rounded-full"
            style={{ width: `${(cardDetails.availableCredit / cardDetails.totalLimit) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm opacity-75 mb-1">Recent Spend</p>
          <p className="font-semibold">R{cardDetails.recentActivity.spent.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm opacity-75 mb-1">Recent Payments</p>
          <p className="font-semibold">R{cardDetails.recentActivity.payments.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs opacity-75 mb-1">Card Number</p>
          <p className="text-sm opacity-90">{cardDetails.cardNumber}</p>
        </div>
        <div className="flex space-x-2">
          <div className="w-8 h-8 bg-red-500 mr-[-13px] rounded-full opacity-90"></div>
          <div className="w-8 h-8 bg-orange-400 rounded-full opacity-75"></div>
        </div>
      </div>
    </div>
  );
};

export const MobileDashboard = () => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(null);
  
  const metrics = [
    { name: 'Repayment History', trend: 'up', color: 'green' },
    { name: 'External Credit', trend: 'down', color: 'red' },
    { name: 'Credit Usage', trend: 'up', color: 'green' },
    { name: 'Cash Flow', trend: 'up', color: 'green' }
  ];

  return (
    <div className="flex w-full bg-gray-50 min-h-screen">
      {/*<Sidebar />*/}
      
      <div className="flex-1 p-4 pt-0 pb-20 lg:p-8 overflow-y-auto">
        {/* Header */}
        {/*<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="lg:hidden">
              <MobileNav>
              </MobileNav>
                <Sidebar />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back, <span className="text-blue-600">Neo Masilo</span></p>
            </div>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
            <button className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
            <NotificationsPopover />
          </div>
        </div>*/}
        <Header />
        <div className="flex justify-between items-center p-4 py-5 px-0">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          {/*<button className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg bg-white hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>*/}
        </div>
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 ">
          <CreditCardComponent onApplyClick={() => setIsApplyModalOpen(true)} />
          <EnhancedCreditScore />
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-700 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Quick Stats
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <p className="text-gray-500">Monthly Spend</p>
                  <p className="text-lg font-semibold text-gray-800">R12,450.60</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <p className="text-gray-500">Payment Streak</p>
                  <p className="text-lg font-semibold text-gray-800">6 months</p>
                </div>
                <TrendingUp className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-6">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.name}
              metric={metric}
              selected={selectedMetric === metric.name}
              onSelect={setSelectedMetric}
            />
          ))}
        </div>

        {/*<TransactionsList />*/}
      </div>
      <BottomNav />
      <CreditApplicationModal 
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </div>
  )
};
