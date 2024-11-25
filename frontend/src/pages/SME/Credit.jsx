import React from 'react';
import { Download, MoreVertical, File, Bell } from 'lucide-react';
import { NavBar } from '../../components/SME/NavBar';

function Credit() {
  return (
    <div className="flex w-full h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white">
        <NavBar />
      </div>
      <div className="max-w-6xl mx-auto p-4 bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-lg font-semibold">Credit</h1>
            <p className="text-sm text-gray-500">Credit Overview</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2">
              <File className="w-5 h-5" />
            </button>
            <button className="p-2">
              <MoreVertical className="w-5 h-5" />
            </button>
            <button className="p-2">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Credit Utilization Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Download className="w-5 h-5" />
              <h2 className="text-sm font-medium">Credit Utilization</h2>
            </div>
            
            <div className="text-[#2196F3] text-2xl font-bold mb-6">R16 480.50</div>
            
            <div className="flex text-sm text-gray-500 mb-4 justify-between">
              <div>
                <div className="flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-[#2196F3] rounded-full"></span>
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

            <div className="relative w-40 h-40 mx-auto mb-6">
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

            <button className="w-full py-3 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download Credit Report
            </button>
          </div>

          {/* Score Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="text-lg font-semibold">Score</div>
              </div>
              <button className="text-sm text-gray-500">History</button>
            </div>
            <div className="flex items-baseline gap-1 mb-1">
              <div className="text-2xl font-bold">75</div>
              <div className="text-gray-500">/100</div>
            </div>
            
            <div className="text-sm text-green-500 mb-6">Good!</div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Payment History</span>
                  <span>90%*</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full w-[90%] bg-[#2196F3] rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>External Credit Data</span>
                  <span className="text-red-500">13%*</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full w-[13%] bg-red-500 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Credit utilization</span>
                  <span>35%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full w-[35%] bg-[#2196F3] rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Cash Flow</span>
                  <span className="text-purple-500">7%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full w-[7%] bg-purple-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Loan Section */}
          <div className="space-y-4">
            {/* Loan Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-sm">Loan</div>
                <div className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">Get outstanding results</div>
              </div>

              <div className="text-[#2196F3] text-2xl font-bold mb-6">R 2000.00</div>

              <div className="text-sm text-gray-500 mb-4">For how long?</div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <button className="py-2 px-4 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">3 months</button>
                <button className="py-2 px-4 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">6 months</button>
                <button className="py-2 px-4 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">12 months</button>
              </div>

              <button className="w-full py-2 bg-[#2196F3] text-white rounded-lg hover:bg-blue-600">
                Apply
              </button>
            </div>

            {/* Active Loans */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-medium mb-4">Active loans</h3>
              <div className="space-y-3">
                {[
                  { id: 'xln797', amount: 2000 },
                  { id: 'vcdb03', amount: 8000 },
                  { id: 'avk538', amount: 4000 },
                  { id: 'ayv952', amount: 1500 },
                  { id: 'avc654', amount: 2300 }
                ].map(loan => (
                  <div key={loan.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div className="text-gray-500">_{loan.id}</div>
                    <div className="flex items-center gap-4">
                      <div>R {loan.amount.toFixed(2)}</div>
                      <button className="px-4 py-1 text-[#2196F3] bg-blue-50 rounded-md text-sm hover:bg-blue-100">
                        {loan.id === 'xln797' ? 'Request Extension' : 'Details'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Verification */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#2196F3] rounded-full flex items-center justify-center text-white">
                  !
                </div>
                <div className="text-sm">
                  <div className="font-medium">Account Verification</div>
                  <div className="text-gray-500">Complete account verification to get an accurate credit</div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="px-6 py-2 text-[#2196F3] bg-blue-50 rounded-md text-sm hover:bg-blue-100">
                  Complete
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payments Section */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-medium mb-4">Payments</h2>
          <div className="space-y-4">
            {[
              { date: '20/11/2024', ref: 'bd096bc2024bcd8023', amount: 1570.00 },
              { date: '17/11/2024', ref: 'bcf6gfy2024bda787', amount: 1500.00 },
              { date: '01/11/2024', ref: 'bd096bc2024bcd8023', amount: 1708.00 },
              { date: '15/11/2024', ref: 'bd096bc2024bcd8023', amount: 2006.40 }
            ].map((payment, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium">SalePay</div>
                    <div className="text-sm text-gray-500">{payment.date}</div>
                  </div>
                  <div className="text-sm text-gray-500">{payment.ref}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-medium">R {payment.amount.toFixed(2)}</div>
                  <button className="px-4 py-1 text-[#2196F3] bg-blue-50 rounded-md text-sm hover:bg-blue-100">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Credit;         