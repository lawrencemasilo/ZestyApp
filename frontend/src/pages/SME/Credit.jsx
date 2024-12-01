import React, { useState } from 'react';
import { Download, File, Bell, ChevronLeft, ChevronRight, PiggyBank, CircleUser, Wallet,MoreVertical } from 'lucide-react';
import { RiSpeedUpLine } from "react-icons/ri";
import { IoCalendarClearOutline } from "react-icons/io5";
import { NavBar } from '../../components/SME/NavBar';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
    {children}
  </div>
);

const SectionHeader = ({ title, subtitle }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
  <div className="flex justify-between items-center">
    <div>
      <h1 className="text-2xl font-semibold text-black">{title}</h1>
      <p className="text-gray-500 text-sm">{subtitle}</p>
    </div>
    <div className="flex items-center gap-4">
      <button className="p-2 hover:bg-gray-100 rounded-full flex items-center">
        <File className="w-5 h-5 text-black mr-1" />
        <span>Documents</span>
      </button>
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
);


const CreditUtilizationCard = () => (
  <Card>
    <div className="flex items-center gap-2 mb-4 text-black ">
      <Download className="w-5 h-5" />
      <h2 className="text-sm font-medium">Credit Utilization</h2>
    </div>
    <div className = 'border-t pt-4'></div>
    
    <div className="text-[#005EFF] text-2xl font-bold mb-6">R16 480.50</div>
    
    <div className="flex text-sm text-gray-500 mb-4 justify-between">
      <div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 bg-[#005EFF] rounded-full"></span>
          <span>Consumed</span>
        </div>
        <div>R8 171.13</div>
      </div>
      <div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 bg-gray-200 rounded-full"></span>
          <span>Remaining</span>
        </div>
        <div>R12 548.60</div>
      </div>
    </div>

    <div className="relative w-40 h-40 mx-auto mb-4">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="#E3F2FD"
          strokeWidth="8"
        />
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="#2196F3"
          strokeWidth="8"
          strokeDasharray="439.6"
          strokeDashoffset={`${439.6 * (1 - 0.19)}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold">19%</div>
        <div className="text-sm text-gray-500">Consumed</div>
      </div>
    </div>

    <button className="w-full py-3 bg-[#005EFF] border border-gray-200 rounded-lg text-white hover:bg-gray-50 flex items-center justify-center gap-2">
      <Download className="w-4 h-4 text-white" />
      Download Credit Report
    </button>
  </Card>
);

const ScoreCard = () => {
  const [activeView, setActiveView] = useState('today');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1).getDay();
    
    // Number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    
    //  empty slots for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    //  days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const changeMonth = (delta) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setSelectedDate(newDate);
  };

  const renderTodayView = () => (
    <>
      <div className="flex flex-row mb-4 mt-4">
        <div className="flex items-center justify-center w-[90px] h-[38px] border-[1px] border-[#e3e4e7] text-[16px] rounded-lg mr-[8px]">
          <span className="font-semibold mr-[5px] mt-[1px] text-[16px]">75 </span>
          <span className="text-gray-400 mt-[1px] text-[16px]">/ 100</span>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-[13px] text-[#00BFFF]">
            Good! 
          </span>
          <span className="text-[10px] text-gray-500">
            Tips on how to increase your <span className="text-[#1E88E5] hover:cursor-pointer">credit score</span>
          </span>
        </div>
      </div>

      {/* Risk Level Section */}
     <div className="w-full max-w-lg mx-auto mb-8 mt-8">
     {/* Label */}
     <div className="my-3 text-[12px] font-semibold">Risk Level</div>

     {/* Slider Wrapper */}
     <div className="relative">
       {/* Gradient Track */}
       <div className="relative w-full h-3 rounded-full">
         {/* Markers */}
         <div className="absolute inset-0 flex justify-between items-center">
           <div className="w-[6px] h-[6px] ml-[3px] bg-white z-10 rounded-full shadow" />
           <div className="w-[6px] h-[6px] bg-white opacity-[70%] z-10 rounded-full shadow" />
           <div className="w-[6px] h-[6px] bg-white z-10 rounded-full shadow" />
           <div className="w-[6px] h-[6px] bg-white opacity-[70%] z-10 rounded-full shadow" />
           <div className="w-[6px] h-[6px] mr-[3px] bg-white z-10 rounded-full shadow" />
         </div>
       </div>

       {/* Slider Progress */}
       <div
         className="absolute top-0 h-3 rounded-full  z-0 bg-gradient-to-l from-[#00BFFF] via-[#00BFFF] to-[#1E88E5]"
         style={{
           width: `50%`,
         }}
       />

       {/* Slider Thumb */}
       <div
         className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow border border-gray-300"
         style={{
           left: `50%`, 
           transform: "translate(-50%, -50%)", 
         }}
       />
     </div>

     {/* Labels */}
     <div className="flex justify-between text-[11px] text-gray-500 mt-2">
       <span>Alert</span>
       <span>Safe</span>
       <span>Best</span>
     </div>
     </div>

     <div className="space-y-6">
  <div className="grid grid-cols-2 gap-4">
    <div className="flex items-center justify-between">
      <div className="flex flex-col items-start">
        <span className="text-sm mb-2">Payment History</span>
        <span className="text-[#2196F3] font-bold">90%*</span>
        <span className="text-xs text-gray-500 mt-1">Percentage of payments you have made overtime</span>
      </div>
      <div className="w-2/3 h-4 bg-gray-100 rounded-full">
        <div className="h-full w-[90%] bg-[#2196F3] rounded-full"></div>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex flex-col items-start">
        <span className="text-sm mb-2">External Credit Data</span>
        <span className="text-red-500 font-bold">13%*</span>
        <span className="text-xs text-gray-500 mt-1">Percentage of payments you have made overtime</span>
      </div>
      <div className="w-2/3 h-4 bg-gray-100 rounded-full">
        <div className="h-full w-[13%] bg-red-500 rounded-full"></div>
      </div>
    </div>
  </div>

  <div className="grid grid-cols-2 gap-4">
    <div className="flex items-center justify-between">
      <div className="flex flex-col items-start">
        <span className="text-sm mb-2">Credit utilization</span>
        <span className="text-[#2196F3] font-bold">35%*</span>
        <span className="text-xs text-gray-500 mt-1">Percentage of payments you have made overtime</span>
      </div>
      <div className="w-2/3 h-4 bg-gray-100 rounded-full">
        <div className="h-full w-[35%] bg-[#2196F3] rounded-full"></div>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex flex-col items-start">
        <span className="text-sm mb-2">Cash Flow</span>
        <span className="text-purple-500 font-bold">7%*</span>
        <span className="text-xs text-gray-500 mt-1">Percentage of payments you have made overtime</span>
      </div>
      <div className="w-2/3 h-4 bg-gray-100 rounded-full">
        <div className="h-full w-[7%] bg-purple-500 rounded-full"></div>
      </div>
    </div>
  </div>
</div>
    </>
  );

  const renderHistoryView = () => {
    const calendarDays = generateCalendarDays();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="text-center">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => changeMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </button>
          <div className="text-lg font-semibold">
            {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </div>
          <button 
            onClick={() => changeMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-xs text-gray-500 font-medium">{day}</div>
          ))}
          {calendarDays.map((day, index) => (
            <div 
              key={index}
              className={`
                h-8 flex items-center justify-center 
                ${!day ? 'text-transparent' : 'cursor-pointer hover:bg-blue-50'}
                ${day && day.toDateString() === new Date().toDateString() 
                  ? 'bg-[#2196F3] text-white rounded' 
                  : 'text-gray-700'}
              `}
              onClick={() => day && console.log(day)}
            >
              {day ? day.getDate() : ''}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
        <div className="flex items-center">
            <RiSpeedUpLine className="text-black mr-[6px] mb-4" size={22} />
            <h2 className="text-sm font-medium mb-4"> Score</h2>
          </div>
          <div className = 'border-t pt-4'></div>
          
          {/* Centered Buttons m*/}
          <div className="flex justify-start">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
              <button 
                className={`px-4 py-1 rounded-full text-sm transition-colors 
                  ${activeView === 'today' 
                    ? 'bg-[#2196F3] text-white' 
                    : 'text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setActiveView('today')}
              >
                Today
              </button>
              <button 
                className={`px-4 py-1 rounded-full text-sm transition-colors 
                  ${activeView === 'history' 
                    ? 'bg-[#2196F3] text-white' 
                    : 'text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setActiveView('history')}
              >
                History
              </button>
            </div>
          </div>
        </div>
      </div>

      {activeView === 'today' && renderTodayView()}
      {activeView === 'history' && renderHistoryView()}
    </Card>
  );
};
const CombinedLoansCard = () => {
  const [selectedTerm, setSelectedTerm] = useState(null);

  const loans = [
    { id: '...xln797', amount: 2000 , time : '1 month'},
    { id: '...vcdb03', amount: 8000 , time : '2 month' },
    { id: '...avk538', amount: 4000 , time : '4 month'},
    { id: '...ayv952', amount: 1500 , time : '3 month'},
    { id: '...avc654', amount: 2300 , time : '1 month'}
  ];
  const ProgressBar = ({ 
    progress : 50, 
    height : 'h-2', 
    color : 'from-[#1E90FF] to-[#10A7FF] ',
    bgColor : 'bg-white',
    rounded : 'rounded-full'
  })
  return (
    <Card>
      <div className="space-y-4">
        {/* Loan Application Section */}

          <div className="flex items-center gap-2 mb-4 text-black">
            <PiggyBank className="text-black"/>
            <div className="text-sm font-medium">Loan</div>
          </div>
           <div className = 'border-t pt-4'></div>
          <div className="bg-gradient-to-r from-[#00BFFF] to-[#1E88E5] p-4 rounded-lg">
          <div className="px-2 py-1 text-white rounded text-xs">Get restocking credits</div>
          <div className="text-white text-2xl font-bold mb-6">R 2000.00</div>

           {/* Progress Bar */}
          <div className={`w-full ${ProgressBar.bgColor} ${ProgressBar.rounded} overflow-hidden`}>
      <div 
        className={`${ProgressBar.color} ${ProgressBar.height} ${ProgressBar.rounded} transition-all duration-500 ease-in-out`} 
        style={{ width: `${Math.min(Math.max(ProgressBar.progress, 0), 100)}%` }}
      />
    </div>

          <div className="text-sm text-white mb-4">For how long?</div>

          <div className="grid grid-cols-3 gap-2 mb-2 text-white text-xs">
            {['3 months', '6 months', '12 months'].map((term, index) => (
              <button 
                key={index}
                className={`py-1 px-2 border rounded-lg text-xs 
                  ${selectedTerm === term 
                    ? 'bg-[#005EFF] text-white' 
                    : 'border-gray-200 hover:bg-gray-50'}`}
                onClick={() => setSelectedTerm(term)}
              >
                {term}
              </button>
            ))}
          </div>

          <button 
            className="w-full py-2 border text-white rounded-lg"
            disabled={!selectedTerm}
          >
            Apply
          </button>
        </div>

        {/* Active Loans Section */}
        <div className="border-t pt-4">
          <h3 className="font-medium mb-4">Active loans</h3>
          <div className="space-y-3">
            {loans.slice(0, 1).map(loan => (
              <div key={loan.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div className="flex flex-col">
                  <div className="text-gray-500">{loan.id}</div>
                  <div className="text-xs text-gray-400">{loan.time}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-green-600">R {loan.amount.toFixed(2)}</div>
                  <button className="px-4 py-1 text-white bg-[#005EFF] rounded-md text-xs hover:bg-blue-100 ">
                    Request Extension
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Previous Loans Section */}
        <div className="border-t pt-4">
          <h3 className="font-medium mb-4">Previous loans</h3>
          <div className="space-y-3">
            {loans.slice(1).map(loan => (
              <div key={loan.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div className="flex flex-col">
                  <div className="text-gray-500">{loan.id}</div>
                  <div className="text-xs text-gray-400">{loan.time}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-green-600">R {loan.amount.toFixed(2)}</div>
                  <button className="px-4 py-1 text-white bg-[#005EFF] rounded-md text-sm hover:bg-blue-100">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

const AccountVerificationCard = () => (
  <Card>
    <div className="flex flex-col items-center text-center bg-[#2196F3] p-6 rounded-xl">
      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white mb-4">
        <CircleUser size={28} />
      </div>
      <div className="text-sm mb-4">
        <div className="font-medium text-white">Account Verification</div>
        <div className="text-white opacity-80">Complete account verification to get an accurate credit</div>
      </div>
      <button className="px-20 py-2 text-[#005EFF] bg-white border-2 border-white rounded-md text-sm hover:bg-blue-50">
        Complete
      </button>
    </div>
  </Card>
);

const PaymentsSection = () => {
  const payments = [
    { date: '20/11/2024', ref: 'bd096bc2024bcd8023', amount: 1570.00 },
    { date: '17/11/2024', ref: 'bcf6gfy2024bda787', amount: 1500.00 },
    { date: '01/11/2024', ref: 'bd096bc2024bcd8023', amount: 1708.00 },
    { date: '15/11/2024', ref: 'bd096bc2024bcd8023', amount: 2006.40 }
  ];

  return (
    <Card className="mt-6">
      <h2 className="font-medium mb-4">Payments</h2>
      <div className="space-y-4">
        {payments.map((payment, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
            <div className="flex items-center gap-4">
               <span className="">
                    <IoCalendarClearOutline className="text-[#4d4d4d]" size={24} />
                  </span>
              <div>
                <div className="font-medium">SalePay</div>
                <div className="text-sm text-gray-500">{payment.date}</div>
                <div className="text-sm text-gray-500">{payment.ref}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="font-medium text-red-600">R {payment.amount.toFixed(2)}</div>
              <div className="flex items-center gap-1 text-xs text-green-600 border border-green-600 rounded-full px-2 py-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Approved
              </div>
              <button className="px-4 py-1 text-white bg-[#005EFF] rounded-md text-sm hover:bg-blue-100">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

function Credit() {
  return (
    <div className="flex w-full h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white">
        <NavBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        <div className="max-w-6xl mx-auto bg-gray-100">
          <SectionHeader 
            title="Credit" 
            subtitle="Credit Overview" 
          />

          {/* Top Row: Credit Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div>
            <CreditUtilizationCard />
            </div>
            <div>
            <ScoreCard />
            </div>
            
          
           <div><CombinedLoansCard /></div>
          </div>

          {/* Second Row: Payments and Additional Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 mt-[-220px]">
              <PaymentsSection />
            </div>
            
            <div className="space-y-4 bg-[#00BFFF]bg-[#00BFFF]">
              <AccountVerificationCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Credit;