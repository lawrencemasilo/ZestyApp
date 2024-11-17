import React from 'react'
import { IoIosNotifications } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import { TbCreditCardPay } from "react-icons/tb";
import { MdNavigateNext } from "react-icons/md";
import { RiSpeedUpLine } from "react-icons/ri";

export const Dashboard = () => {
  return (
    <div className="bg-[#e9e9e9] min-h-[100%] h-full text-[#333333]">
    {/* Header */}
    <div className="flex justify-between bg-white items-center mb-[15px] rounded-[10px] p-[10px] px-[15px]">
      <div>
        <h1 className="text-xl font-semibold text-[14px]">Dashboard</h1>
        <p className="text-gray-500 text-[12px]">
          Welcome back, <span className="text-[#1E88E5] font-medium">Neo Masilo!</span>
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex justify-center w-[100px] h-[35px] items-center gap-2 bg-transparent p-2 rounded-[10px] hover-item border-[1px] border-[#e3e4e7]">
          <FiDownload size={14} />
          <span className="text-xs">Download</span>
        </button>
        <div className="flex justify-center items-center w-[30px] h-[30px] hover:bg-gray-100 rounded-full hover:cursor-pointer">
        <div className="w-[7px] h-[7px] absolute bg-[#E74C3C] rounded mt-[-10px] ml-[12px]"></div>
          <IoMdNotificationsOutline  size={22} className="" />
        </div>
        
      </div>
    </div>

    {/* Grid Layout */}
    <div className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-[15px]" style={{ height: '87%' }}>
      {/* Credit Overview */}
      <div className="flex flex-col bg-white p-4 rounded-lg shadow-md h-full">
        {/* Header Section */}
        <div className="flex flex-row justify-between items-center mb-2">
          <div className="flex items-center">
            <TbCreditCardPay className="text-gray-600 mr-[6px]" size={20} />
            <h2 className="text-gray-600 text-[14px] font-medium">Credit Overview</h2>
          </div>
          <div className="flex justify-center items-center hover:cursor-pointer w-[25px] h-[25px] hover:bg-gray-100 rounded-full">
            <MdNavigateNext size={20} className="text-gray-600" />
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-[#e3e4e7] rounded"></div>

        {/* Balance Text */}
        <p className="text-[25px] text-[#1E88E5] font-medium my-2">R16 480.50</p>

        {/* Card Section */}
        <div className="flex flex-col flex-grow w-full justify-between bg-gradient-to-b from-[#00BFFF] via-[#00BFFF] to-[#1E88E5] text-white p-4 rounded-lg">
          <div className="flex justify-between">
            <p>Sabela Pay</p>
            <div className="flex justify-center items-center w-[30px] h-[30px] bg-white rounded-full">
              <div className="flex justify-center items-center w-[22px] h-[22px] bg-[#00BFFF] rounded-full">
                <p className="mr-[1px] text-white">S</p>
              </div>
            </div>
          </div>
          <div>
            <p className="mt-2 text-lg font-medium">8763 2733 9873 0321</p>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="text-[13px]">CardHolder Name</p>
              <p className="text-[12px]">Neo Masilo</p>
            </div>
            <div className="flex flex-col">
              <p className="text-[13px]">Expiry Date</p>
              <p className="text-[12px]">01/29</p>
            </div>
            <div className="flex items-center">
              <div className="w-[30px] h-[30px] bg-[#E33A24] rounded-full z-1"></div>
              <div className="w-[30px] h-[30px] bg-[#D7C846] rounded-full z-0 ml-[-10px] opacity-[75%]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Score */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        {/* Header Section */}
        <div className="flex flex-row justify-between items-center mb-2">
          <div className="flex items-center">
            <RiSpeedUpLine className="text-gray-600 mr-[6px]" size={22} />
            <h2 className="text-gray-600 text-[14px] font-medium">Score</h2>
          </div>
          <div className="flex justify-center items-center hover:cursor-pointer w-[25px] h-[25px] hover:bg-gray-100 rounded-full">
            <MdNavigateNext size={20} className="text-gray-600" />
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-[#e3e4e7] rounded"></div>
        <div className="flex flex-col justify-between">
          <div className="mt-[4px]">
            <p className="text-2xl font-bold">75 / 100</p>
            <p className="text-sm text-gray-500 mb-4">Good! Tips on how to increase your credit score</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Alert</span>
              <span className="text-gray-500 text-sm">Best</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-lg overflow-hidden">
              <div className="h-full w-2/3 bg-blue-500"></div>
            </div>
          </div>
        </div>

      </div>

      {/* Payments */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-gray-500 font-medium mb-2">Payments</h2>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>BNPL (Bi-Monthly)</span>
            <span className="text-red-500">-R1 570.00</span>
          </li>
          <li className="flex justify-between">
            <span>Inventory Insurance</span>
            <span className="text-red-500">-R1 200.00</span>
          </li>
          <li className="flex justify-between">
            <span>BNPL (Bi-Monthly)</span>
            <span className="text-red-500">-R1 709.00</span>
          </li>
          <li className="flex justify-between">
            <span>BNPL (Bi-Monthly)</span>
            <span className="text-red-500">-R2 020.40</span>
          </li>
        </ul>
        <button className="mt-4 bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600">
          Show all Payments
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="col-span-2 md:col-span-1 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-gray-500 font-medium mb-2">Recent Transactions</h2>
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-500">
              <th>Name</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pick n Pay</td>
              <td>7 Nov 2024</td>
              <td className="text-red-500">-R1 220.40</td>
            </tr>
            <tr>
              <td>Woolworths</td>
              <td>6 Nov 2024</td>
              <td className="text-green-500">+R1 000.00</td>
            </tr>
            <tr>
              <td>Checkers</td>
              <td>6 Nov 2024</td>
              <td className="text-green-500">+R269.00</td>
            </tr>
            <tr>
              <td>Checkers</td>
              <td>27 Oct 2024</td>
              <td className="text-red-500">-R823.74</td>
            </tr>
          </tbody>
        </table>
        <button className="mt-4 bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600">
          Show all transactions
        </button>
      </div>

      {/* Financial Insight */}
      <div className="col-span-2 h-full bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-gray-500 font-medium mb-2">Financial Insight</h2>
        <p className="text-3xl font-bold mb-2">R105 385.40</p>
        <p className="text-sm text-green-500 mb-4">↑ 3.8%</p>
        {/* Replace this div with a chart library component */}
        <div className=" bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  </div>
  )
}
