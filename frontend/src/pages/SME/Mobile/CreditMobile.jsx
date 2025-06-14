import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { 
   CircleGauge, Building2, ArrowRightLeft, X, Info, LayoutDashboard, CreditCardIcon, Calendar, Receipt, TrendingDown, TrendingUp as TrendIcon
} from 'lucide-react';
import axios from "../../../api/axios";
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



const MobileCreditPage = () => {
  const [selectedDetailModal, setSelectedDetailModal] = useState(null);
    const [selectedBNPLModal, setSelectedBNPLModal] = useState(null);
    const [user, setUser] = useState([]);
    const [userCreditInfo, setUserCreditInfo] = useState([]);
    const [bnplCredits, setBnplCredits] = useState([]);
    const [showDepositInfo, setShowDepositInfo] = useState(false);
    const [smeInfo, setSmeInfo] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('auth/profile');
        setUser(response.data);
        //console.log(response.data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
      }
    };
  
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchUserCrefitInfo = async () => {
      try {
        const response = await axios.get(`credit/${smeInfo._id}`);
        setUserCreditInfo(response.data.creditScore);
      } catch (err) {
        console.error('Error fetching user credit info:', err);
      }
    };
  
    fetchUserCrefitInfo();
  }, [smeInfo]);

  useEffect(() => {
    if (!user || !user._id) return;

    const fetchSmeProfile = async () => {
      try {
        const response = await axios.get(`/sme/${user._id}`);
        const smeData = response.data.sme;
        setSmeInfo(smeData);
      } catch (err) {
        console.error("Error fetching SME profile:", err);
      }
    };

    fetchSmeProfile();
  }, [user]);

  const creditDetails = {
    availableCredit: userCreditInfo? userCreditInfo.remaining_credit: '',
    totalLimit: userCreditInfo? userCreditInfo.credit_limit: '',
    recentSpend: 3580.20,
    recentPayments: 2500.00,
    currentBalance: userCreditInfo? userCreditInfo.remaining_credit: '',
    pastDueAmount: 0,
    paymentDueDate: '2025-01-12',
    creditScore: userCreditInfo? userCreditInfo.credit_score: '',
    creditUtilization: userCreditInfo? ( userCreditInfo.remaining_credit / userCreditInfo.credit_limit) * 100: '',
    paymentHistory: {
      onTime: 92,
      late: 2
    },
    creditScoreHistory: [
      { month: 'Jan', score: 400 },
      { month: 'Feb', score: 420 },
      { month: 'Mar', score: 440 },
      { month: 'Apr', score: 450 },
    ]
  };

  useEffect(() => {
    const fetchBnplInfo = async () => {
      try {
        const response = await axios.get(`/bnpl/${smeInfo._id}`);
        setBnplCredits(response.data.credits);
      } catch (err) {
        console.error('Error fetching user credit info:', err);
      }
    };
  
    fetchBnplInfo();
    //console.log(userCreditInfo);
    //console.log(bnplCredits)
  }, [smeInfo])

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
              <p className="text-xl font-semibold text-[#005EFF]">R{creditDetails.totalLimit}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-500 mb-2">Available Credit</p>
              <p className="text-xl font-semibold text-green-600">R{creditDetails.availableCredit}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-500">Credit Utilization</p>
              <p className={`font-semibold ${creditDetails && (((creditDetails.totalLimit/100) - creditDetails.creditUtilization) / 100)  > 0.5 ? 'text-red-500' : 'text-green-500'}`}>
                {creditDetails && (creditDetails.totalLimit/100) - creditDetails.creditUtilization}%
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${creditDetails && (((creditDetails.totalLimit/100) - creditDetails.creditUtilization) / 100) > 0.5 ? 'bg-red-500' : 'bg-green-500'}`}
                style={{ width: `${creditDetails && (creditDetails.totalLimit/100) - creditDetails.creditUtilization}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {creditDetails && (((creditDetails.totalLimit/100) - creditDetails.creditUtilization) / 100) > 0.5
                ? 'Your utilization is high. Try to reduce it below 50%.'
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
              <p className={`text-sm font-medium ${latestScore > 600 ? 'text-green-600' : 'text-yellow-600'}`}>
                {latestScore > 700 ? 'Excellent' : 'Good'}
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
          <h2 className="text-2xl font-bold">BNPL Details</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-500 mb-2">Total Amount</p>
              <p className="text-xl font-semibold text-[#005EFF]">R{bnpl.total_amount}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-500 mb-2">Remaining Balance</p>
              <p className="text-xl font-semibold text-green-600">R{bnpl.remaining_balance}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-500 mb-2">Monthly Payment</p>
              <p className="text-xl font-semibold">R{bnpl.monthly_payment.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-500 mb-2">Interest Rate</p>
              <p className="text-xl font-semibold text-yellow-600">{bnpl.interest_rate}%</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-gray-500 mb-2">Credit Terms</p>
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{bnpl.months_remaining} Months Remaining</p>
                <p className="text-sm text-gray-500">Started: {bnpl.start_date}</p>
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

  const renderPaymentModal = () => {
    return (
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-[#005EFF] text-white p-6">
          <h2 className="text-2xl font-bold">Payment Details</h2>
        </div>
        <div className="p-6 space-y-4">
          {/* Payment Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-500 mb-2">Due Date</p>
              <p className="text-xl font-semibold text-[#005EFF]">
                {new Date(creditDetails.paymentDueDate).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-500 mb-2">Minimum Payment</p>
              <p className="text-xl font-semibold text-green-600">
                R{(creditDetails.currentBalance * 0.1).toFixed(2)}
              </p>
            </div>
          </div>
  
          {/* Current Balance and Past Due */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-500 mb-2">Current Balance</p>
              <p className="text-xl font-semibold">R{creditDetails.currentBalance}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-500 mb-2">Past Due Amount</p>
              <p className="text-xl font-semibold text-red-600">
                R{creditDetails.pastDueAmount}
              </p>
            </div>
          </div>
  
          {/* Payment Method Toggle */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold">Show Deposit Information</p>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showDepositInfo ? 'bg-[#005EFF]' : 'bg-gray-300'
                }`}
                onClick={() => setShowDepositInfo(!showDepositInfo)}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showDepositInfo ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
  
            {showDepositInfo && (
              <div className="space-y-3 mt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Bank Name:</span>
                  <span className="font-medium">First National Bank</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Account Number:</span>
                  <span className="font-medium">62834498291</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Branch Code:</span>
                  <span className="font-medium">250655</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Reference:</span>
                  <span className="font-medium">{user._id}</span>
                </div>
              </div>
            )}
          </div>
  
          {/* Payment Button */}
          <button className="w-full bg-[#005EFF] text-white py-3 rounded-lg hover:bg-blue-700 transition">
            Make Payment
          </button>
        </div>
      </div>
    );
  };

  const renderModal = () => {
    if (!selectedDetailModal && !selectedBNPLModal) return null;

    const modalContent = 
      selectedDetailModal === 'available-credit' ? renderAvailableCreditModal() :
      selectedDetailModal === 'credit-score' ? renderCreditScoreModal() :
      selectedBNPLModal ? renderBNPLModal(selectedBNPLModal) :
      selectedDetailModal === 'payment'? renderPaymentModal(): null;

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
      {/*<Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />*/}
      {renderModal()}
      <div className="flex-1 p-8 px-4 pt-0 overflow-y-auto mb-12 mt-2">
        <Header />
        <div className="flex justify-between items-center p-4 py-5 px-0">
          <h2 className="text-xl font-semibold text-gray-800">Credit</h2>
          {/*<button className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg bg-white hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>*/}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                style={{ width: `${(creditDetails.creditScore / 700) * 100}%` }}
              />
            </div>
          </div>

          {/* Payment Due Date */}
          <div className="p-6 bg-white rounded-xl shadow-sm hover:cursor-pointer hover:bg-blue-50" onClick={() => setSelectedDetailModal("payment")}>
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
                key={credit._id} 
                className="p-6 bg-white rounded-xl shadow-sm cursor-pointer hover:bg-blue-50"
                onClick={() => setSelectedBNPLModal(credit)}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gray-700 flex items-center gap-2">
                    <Receipt className="w-5 h-5" />
                    <p className="text-[#005EFF]">{credit.status}</p>
                    <Info className="w-4 h-4 text-[#005EFF]" />
                  </h3>
                </div>
                <div className="text-lg font-semibold text-gray-800 mb-2">
                  R{credit.remaining_balance} Remaining
                </div>
                <div className="text-sm text-gray-500">
                  {credit.monthsRemaining} Months Left • R{credit.monthly_payment.toFixed(2)}/month
                </div>
              </div>
            ))}
        </div>
        </div>
        <BottomNav />
      </div>
    </div>
  );
};



export default MobileCreditPage;
