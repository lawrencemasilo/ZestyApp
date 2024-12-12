import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { TrendingUp, Clock, ArrowUpRight, ArrowDownRight, 
         LayoutDashboard, ArrowRightLeft, CreditCardIcon, Building2,
         PlusCircle, DollarSign } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
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
  const [maxCredit, setMaxCredit] = useState(0);
  const availableCredit = maxCredit;
  const [user, setUser] = useState([]);
  const [userCreditInfo, setUserCreditInfo] = useState([]);

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
        const response = await axios.get(`credit/${user._id}`);
        setUserCreditInfo(response.data.creditScore);
        setMaxCredit(response.data.creditScore.remaining_credit)
        //console.log(response.data);
      } catch (err) {
        console.error('Error fetching user credit info:', err);
      }
    };
  
    fetchUserCrefitInfo();
    //console.log(userCreditInfo);
    //console.log(user)
  }, [user]);

  // Correct interest rate mapping
  const getInterestRate = (term) => {
    const rates = {
      30: 3,
      60: 6,
      90: 9
    };
    return rates[term];
  };

  // Correct monthly payment logic
  const calculateMonthlyPayment = () => {
    const principal = parseFloat(amount);
    const rate = getInterestRate(term) / 100; // Rate is in percentage
    const months = term / 30; // Convert term to months

    if (!principal || !rate || !months) return 0;

    // Simple interest calculation
    const totalWithInterest = principal * (1 + rate); // Interest applies once for the term
    const monthlyPayment = totalWithInterest / months; // Divide over term's months

    return monthlyPayment;
  };
  //sme_id, total_amount, months_remaining, email
  const submitApplication = async () => {
    try {
      if (!userCreditInfo || !userCreditInfo.sme_id) {
        throw new Error("SME ID is undefined or not available.");
      }
  
      const response = await axios.post("bnpl/", {
        sme_id: String(userCreditInfo.sme_id),
        total_amount: amount,
        months_remaining: term === 30 ? 1 : term === 60 ? 2 : 3,
        email: user.email,
      });
  
      console.log("Response:", response.data);
    } catch (err) {
      console.error("Error submitting application:", err.message || err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-[#005EFF]" />
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
              R{availableCredit}
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div 
                className="h-full bg-[#005EFF] rounded-full"
                style={{ width: `${(1 - availableCredit/maxCredit) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Amount</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 mt-[-5px] ml-1 text-gray-500">R</div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                max={availableCredit}
                min={0}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:outline-none focus:ring-[#005EFF] focus:border-[#005EFF]"
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
                      ? 'bg-blue-50 border-blue-600 text-[#005EFF]' 
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
            className="w-full py-2 px-4 bg-[#005EFF] text-white rounded-lg hover:bg-blue-700 
                       transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!amount || amount > availableCredit}
            onClick={() => submitApplication()}
          >
            Submit Application
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};


const EnhancedCreditScore = ({ userCreditInfo }) => {
  // Simulated realistic credit history
  const [history, setHistory] = useState([400, 420, 440, 450]); // Example history
  
  useEffect(() => {
    // Add the current score to the history when the component mounts
    setHistory((prevHistory) => [...prevHistory, userCreditInfo.credit_score]);

    //console.log(`Current Score: ${score}`);
    //console.log(`History: ${[...history, score]}`);
  }, [userCreditInfo.credit_score]); // Re-run if the score changes

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-gray-700 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Credit Score
        </h3>
        <div className="text-right">
          <div className="text-3xl font-bold text-[#005EFF]">{userCreditInfo.credit_score}</div>
          <div className="text-sm text-gray-500">out of 700</div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="relative pt-4">
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#005EFF] to-blue-400 rounded-full 
                         transition-all duration-500"
              style={{ width: `${(userCreditInfo.credit_score / 700) * 100}%` }}
            />
          </div>
          <div className="absolute top-0 left-0 w-full flex justify-between text-xs text-gray-400">
            <span>0</span>
            <span>175</span>
            <span>350</span>
            <span>525</span>
            <span>700</span>
          </div>
        </div>

        {/* Trend Indicator */}
        <div className="flex items-center gap-2">
          <ArrowUpRight className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-500">
            +{userCreditInfo.credit_score - history[history.length - 2] || 0} points this month
          </span>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Payment History</div>
            <div className="text-lg font-semibold text-gray-700">98%</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Credit Usage</div>
            <div className="text-lg font-semibold text-gray-700">{100 - (userCreditInfo.remaining_credit / userCreditInfo.credit_limit) * 100}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCreditScore;


const MetricCard = ({ metric, onSelect, selected, userCreditInfo }) => {

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
      current: 100 - (userCreditInfo.remaining_credit / userCreditInfo.credit_limit) * 100,
      previous: 19,
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
                 ${selected ? 'ring-2 ring-[#005EFF]' : 'hover:shadow-md'}`}
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


const CreditCardComponent = ({ onApplyClick }) => {
  const [user, setUser] = useState([]);
  const [userCreditInfo, setUserCreditInfo] = useState([]);

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
        const response = await axios.get(`credit/${user._id}`);
        setUserCreditInfo(response.data.creditScore);
        //console.log(response.data);
      } catch (err) {
        console.error('Error fetching user credit info:', err);
      }
    };
  
    fetchUserCrefitInfo();
    //console.log(userCreditInfo.creditScore);
    //console.log(user)
  }, [user]);

  const cardDetails = {
    cardNumber: "**** **** **** 0321",
    cardHolder: '',
    expiryDate: "09/26",
    availableCredit: userCreditInfo ? userCreditInfo.remaining_credit: '-',
    totalLimit: userCreditInfo ? userCreditInfo.credit_limit: '-',
    recentActivity: {
      spent: 3580.20,
      payments: 2500.00
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-[#005EFF] to-blue-400 rounded-xl text-white">
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
        <p className="text-2xl font-semibold">R{cardDetails.availableCredit}</p>
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
          <p className="font-semibold">R{cardDetails.recentActivity.spent}</p>
        </div>
        <div>
          <p className="text-sm opacity-75 mb-1">Recent Payments</p>
          <p className="font-semibold">R{cardDetails.recentActivity.payments}</p>
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
  const [user, setUser] = useState([]);
  const [userCreditInfo, setUserCreditInfo] = useState([]);
  
  const metrics = [
    { name: 'Repayment History', trend: 'up', color: 'green' },
    { name: 'External Credit', trend: 'down', color: 'red' },
    { name: 'Credit Usage', trend: 'up', color: 'green' },
    { name: 'Cash Flow', trend: 'up', color: 'green' }
  ];

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
        const response = await axios.get(`credit/${user._id}`);
        setUserCreditInfo(response.data.creditScore);
        //console.log(response.data);
      } catch (err) {
        console.error('Error fetching user credit info:', err);
      }
    };
  
    fetchUserCrefitInfo();
  }, [user]);

  return (
    <div className="flex w-full bg-gray-50 min-h-screen">
      {/*<Sidebar />*/}
      
      <div className="flex-1 p-4 pt-0 pb-20 lg:p-8 overflow-y-auto mt-2">
        {/* Header */}
        <Header />
        <div className="flex justify-between items-center p-4 py-5 px-0">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        </div>
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 ">
          <CreditCardComponent onApplyClick={() => setIsApplyModalOpen(true)} />
          <EnhancedCreditScore userCreditInfo={userCreditInfo} />
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
              userCreditInfo={userCreditInfo}
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
