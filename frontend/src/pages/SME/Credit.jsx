import React, { useState } from 'react';import { 
  TrendingUp, ArrowUpRight, Banknote, CircleGauge, Wallet, BarChart2, 
  ArrowRightLeft, Download, Bell, CreditCardIcon, X, Info, 
  Clock, Calendar, Receipt, TrendingDown, TrendingUp as TrendIcon
} from 'lucide-react';
import NotificationsPopover from '../../components/SME/NotificationsPopover';

const CreditPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDetailModal, setSelectedDetailModal] = useState(null);
  const [selectedBNPLModal, setSelectedBNPLModal] = useState(null);

  const creditDetails = {
    availableCredit: 16480.50,
    totalLimit: 50000,
    recentSpend: 3580.20,
    recentPayments: 2500.00,
    currentBalance: 33519.50,
    pastDueAmount: 0,
    paymentDueDate: '2024-06-15',
    creditScore: 780,
    creditUtilization: 0.33,
    paymentHistory: {
      onTime: 92,
      late: 2
    },
    creditScoreHistory: [
      { month: 'Jan', score: 755 },
      { month: 'Feb', score: 770 },
      { month: 'Mar', score: 780 },
      { month: 'Apr', score: 782 },
      { month: 'May', score: 780 }
    ]
  };

  const recentTransactions = [
    { id: 1, date: '2024-05-22', description: 'Online Purchase', amount: -450.75, category: 'Shopping' },
    { id: 2, date: '2024-05-20', description: 'Grocery Store', amount: -230.50, category: 'Groceries' },
    { id: 3, date: '2024-05-18', description: 'Fuel Station', amount: -175.25, category: 'Transportation' },
  ];

  const bnplCredits = [
    { 
      id: 1, 
      vendor: 'Electronics Store', 
      totalAmount: 5000, 
      remainingBalance: 3750, 
      monthsRemaining: 3, 
      monthlyPayment: 1250,
      interestRate: 15,
      startDate: '2024-03-15'
    },
    { 
      id: 2, 
      vendor: 'Furniture Shop', 
      totalAmount: 8000, 
      remainingBalance: 6400, 
      monthsRemaining: 4, 
      monthlyPayment: 2000,
      interestRate: 12,
      startDate: '2024-02-01'
    }
  ];

  const renderAvailableCreditModal = () => {
    return (
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-[#005EFF] text-white p-6">
          <h2 className="text-2xl font-bold">Available Credit Details</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-500 mb-2">Total Credit Limit</p>
              <p className="text-xl font-semibold text-[#005EFF]">R{creditDetails.totalLimit.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-500 mb-2">Available Credit</p>
              <p className="text-xl font-semibold text-green-600">R{creditDetails.availableCredit.toFixed(2)}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-500">Credit Utilization</p>
              <p className={`font-semibold ${creditDetails.creditUtilization > 0.3 ? 'text-red-500' : 'text-green-500'}`}>
                {(creditDetails.creditUtilization * 100).toFixed(2)}%
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${creditDetails.creditUtilization > 0.3 ? 'bg-red-500' : 'bg-green-500'}`}
                style={{ width: `${creditDetails.creditUtilization * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {creditDetails.creditUtilization > 0.3 
                ? 'Your utilization is high. Try to reduce it below 30%.' 
                : 'Great! Your credit utilization is within the recommended range.'}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderCreditScoreModal = () => {
    const latestScore = creditDetails.creditScore;
    const previousScore = creditDetails.creditScoreHistory[3].score;
    const scoreDifference = latestScore - previousScore;

    return (
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-[#005EFF] text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Credit Score Insights</h2>
          <div className="flex items-center">
            {scoreDifference > 0 ? <TrendIcon className="text-green-400 mr-2" /> : <TrendingDown className="text-red-400 mr-2" />}
            <span className={`font-semibold ${scoreDifference > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {Math.abs(scoreDifference)} this month
            </span>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-500 mb-2">Current Score</p>
              <p className="text-2xl font-bold text-[#005EFF]">{latestScore}</p>
              <p className={`text-sm font-medium ${latestScore > 700 ? 'text-green-600' : 'text-yellow-600'}`}>
                {latestScore > 750 ? 'Excellent' : 'Good'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-500 mb-2">Payment History</p>
              <div className="flex items-center">
                <p className="text-xl font-semibold text-green-600">
                  {creditDetails.paymentHistory.onTime}%
                </p>
                <span className="text-xs text-gray-500 ml-2">On-Time</span>
              </div>
              <div className="flex items-center mt-1">
                <p className="text-xl font-semibold text-red-600">
                  {creditDetails.paymentHistory.late}
                </p>
                <span className="text-xs text-gray-500 ml-2">Late Payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBNPLModal = (bnpl) => {
    return (
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-[#005EFF] text-white p-6">
          <h2 className="text-2xl font-bold">{bnpl.vendor} BNPL Details</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-500 mb-2">Total Amount</p>
              <p className="text-xl font-semibold text-[#005EFF]">R{bnpl.totalAmount.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-500 mb-2">Remaining Balance</p>
              <p className="text-xl font-semibold text-green-600">R{bnpl.remainingBalance.toFixed(2)}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-500 mb-2">Monthly Payment</p>
              <p className="text-xl font-semibold">R{bnpl.monthlyPayment.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-500 mb-2">Interest Rate</p>
              <p className="text-xl font-semibold text-yellow-600">{bnpl.interestRate}%</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-gray-500 mb-2">Credit Terms</p>
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{bnpl.monthsRemaining} Months Remaining</p>
                <p className="text-sm text-gray-500">Started: {bnpl.startDate}</p>
              </div>
              <button className="bg-[#005EFF] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Modify Terms
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderModal = () => {
    if (!selectedDetailModal && !selectedBNPLModal) return null;

    const modalContent = 
      selectedDetailModal === 'available-credit' ? renderAvailableCreditModal() :
      selectedDetailModal === 'credit-score' ? renderCreditScoreModal() :
      selectedBNPLModal ? renderBNPLModal(selectedBNPLModal) : null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="relative w-full max-w-2xl">
          <button 
            onClick={() => {
              setSelectedDetailModal(null);
              setSelectedBNPLModal(null);
            }} 
            className="absolute -top-10 right-0 text-white hover:bg-white/20 p-2 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
          {modalContent}
        </div>
      </div>
    );
  };


  return (
    <div className="flex justify-center w-full bg-gray-50 min-h-screen">
      {renderModal()}
      {selectedBNPLModal && renderBNPLModal(selectedBNPLModal)}

      {/* Main Content */}
      <div className="flex-1 p-8 pt-5 overflow-y-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold text-gray-800">Credit Overview</h1>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <button className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Download
            </button>
            <NotificationsPopover />
          </div>
        </div>

        {/* Credit Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Available Credit */}
          <div 
            className="p-6 bg-white rounded-xl shadow-sm cursor-pointer hover:bg-blue-50"
            onClick={() => setSelectedDetailModal('available-credit')}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-700 flex items-center gap-2">
                <CreditCardIcon className="w-5 h-5" />
                Available Credit
                <Info className="w-4 h-4 text-[#005EFF]" />
              </h3>
            </div>
            <div className="text-2xl font-semibold text-[#005EFF] mb-2">
              R{creditDetails.availableCredit.toFixed(2)}
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div 
                className="h-full bg-[#005EFF] rounded-full"
                style={{ width: `${(creditDetails.availableCredit / creditDetails.totalLimit) * 100}%` }}
              />
            </div>
          </div>

          {/* Credit Score */}
          <div 
            className="p-6 bg-white rounded-xl shadow-sm cursor-pointer hover:bg-blue-50"
            onClick={() => setSelectedDetailModal('credit-score')}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-700 flex items-center gap-2">
                <CircleGauge className="w-5 h-5" />
                Credit Score
                <Info className="w-4 h-4 text-[#005EFF]" />
              </h3>
            </div>
            <div className="text-2xl font-semibold text-[#005EFF] mb-2">
              {creditDetails.creditScore}
            </div>
            <div className="text-sm text-gray-500 mb-2">
              {creditDetails.creditScore > 700 ? 'Excellent' : 'Good'}
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div 
                className="h-full bg-[#005EFF] rounded-full"
                style={{ width: `${(creditDetails.creditScore / 850) * 100}%` }}
              />
            </div>
          </div>

          {/* Payment Due Date */}
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-700 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Next Payment Due
              </h3>
            </div>
            <div className="text-xl font-semibold text-gray-800 mb-2">
              {new Date(creditDetails.paymentDueDate).toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-500">
              Upcoming Payment: R{(creditDetails.currentBalance * 0.1).toFixed(2)}
            </div>
          </div>
        </div>

        {/* BNPL Credits Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Buy Now, Pay Later Credits</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bnplCredits.map(credit => (
              <div 
                key={credit.id} 
                className="p-6 bg-white rounded-xl shadow-sm cursor-pointer hover:bg-blue-50"
                onClick={() => setSelectedBNPLModal(credit)}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gray-700 flex items-center gap-2">
                    <Receipt className="w-5 h-5" />
                    {credit.vendor}
                    <Info className="w-4 h-4 text-[#005EFF]" />
                  </h3>
                </div>
                <div className="text-lg font-semibold text-gray-800 mb-2">
                  R{credit.remainingBalance.toFixed(2)} Remaining
                </div>
                <div className="text-sm text-gray-500">
                  {credit.monthsRemaining} Months Left • R{credit.monthlyPayment.toFixed(2)}/month
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
            <button className="text-[#005EFF] text-sm hover:underline">View All</button>
          </div>
          <div className="bg-white rounded-xl shadow-sm">
            {recentTransactions.map(transaction => (
              <div 
                key={transaction.id} 
                className="flex justify-between items-center p-4 border-b last:border-b-0 hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <span className={`font-semibold ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  R{Math.abs(transaction.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditPage;