import React, { useEffect, useState } from 'react'
import "../../App.css";
import { MdOutlinePayments } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import { TbCreditCardPay } from "react-icons/tb";
import { MdNavigateNext } from "react-icons/md";
import { RiSpeedUpLine } from "react-icons/ri";
import { IoCalendarClearOutline } from "react-icons/io5";
import { MdOutlineRestore } from "react-icons/md";
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

export const Dashboard = () => {
  const [value, setValue] = useState(50);

  // Simulate fetching data from the backend
  const fetchDataFromBackend = async () => {
    const simulatedBackendValue = 75;
    return new Promise((resolve) =>
      setTimeout(() => resolve(simulatedBackendValue), 1000)
    );
  };

  useEffect(() => {
    const fetchValue = async () => {
      const backendValue = await fetchDataFromBackend(); 
      setValue(backendValue); 
    };
    fetchValue();
  }, []);

  const DynamicChart = () => {
    const XAXISRANGE = 10000; 
    let lastDate = new Date().getTime();
  
    
    const initialData = Array.from({ length: 10 }).map((_, i) => ({
      x: new Date(lastDate - (9 - i) * 1000).getTime(),
      y: Math.random() * 100,
    }));
  
    const [series, setSeries] = useState([{ data: initialData }]);
    const [options, setOptions] = useState({
      chart: {
        id: 'realtime',
        type: 'line',
        height: 350,
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000,
          },
        },
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        range: XAXISRANGE,
      },
      yaxis: {
        max: 100,
      },
      legend: {
        show: false,
      },
    });
  
    
    const getNewSeries = (lastDate, range) => {
      const timestamp = new Date(lastDate).getTime() + 1000;
      const value = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
  
      initialData.push({ x: timestamp, y: value });
  
      if (initialData.length > 20) {
        initialData.shift();
      }
    };
  
    useEffect(() => {
      const interval = setInterval(() => {
        getNewSeries(lastDate, { min: 10, max: 90 });
  
        
        ApexCharts.exec('realtime', 'updateSeries', [
          {
            data: [...initialData], 
          },
        ]);
  
        lastDate = new Date().getTime(); 
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div>
        <ReactApexChart options={options} series={series} type="line" height={200} />
      </div>
    );
  };

  return (
    <div className="bg-[#f7f7f7] min-h-[100%] h-full text-[#333333]">
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
    <div className="grid grid-cols-1 scrollbar-container w-full h-full md:grid-cols-2 lg:grid-cols-3 gap-[15px] overflow-y-auto" style={{ height: '87%' }}>
      {/* Credit Overview */}
      <div className="flex flex-col bg-white p-4 rounded-lg shadow-sm h-full">
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
        <div className="w-full h-[1px] bg-[#F4F4F4] rounded"></div>

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
      <div className="bg-white p-4 rounded-lg shadow-sm">
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
        <div className="w-full h-[1px] bg-[#F4F4F4] rounded"></div>
        <div className="flex flex-col justify-between mt-[7px]">
          <div className="flex flex-row mt-[4px]">
            <div className="flex items-center justify-center w-[90px] h-[38px] border-[1px] border-[#e3e4e7] text-[16px] rounded-lg mr-[8px]">
              <span className="font-semibold mr-[5px] mt-[1px] text-[16px]">75 </span>
              <span className="text-gray-400 mt-[1px] text-[16px]">/ 100</span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[13px] text-gray-700">
                Good! 
              </span>
              <span className="text-[9px] text-gray-500">
                Tips on how to increase your <span className="text-[#1E88E5] hover:cursor-pointer">credit score</span>
              </span>
            </div>
          </div>
          {/*<div className="space-y-2">
            <div className="mt-[3px]">
              <span className="text-[13px] font-bold">Risk Level</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-lg overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-l from-[#00BFFF] via-[#00BFFF] to-[#1E88E5]"></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Alert</span>
              <span className="text-gray-500 text-sm">Safe</span>
              <span className="text-gray-500 text-sm">Best</span>
            </div>
          </div>*/}
          <div className="w-full max-w-lg mx-auto">
            {/* Label */}
            <div className="my-3 text-[13px] font-semibold">Risk Level</div>

            {/* Slider Wrapper */}
            <div className="relative">
              {/* Gradient Track */}
              <div className="relative w-full h-2 rounded-full">
                {/* Markers */}
                <div className="absolute inset-0 flex justify-between items-center">
                  <div className="w-[8px] h-[8px] bg-white z-10 rounded-full shadow" />
                  <div className="w-[8px] h-[8px] bg-white z-10 rounded-full shadow" />
                  <div className="w-[8px] h-[8px] bg-white z-10 rounded-full shadow" />
                </div>
              </div>

              {/* Slider Progress */}
              <div
                className="absolute top-0 h-2 rounded-full  z-0 bg-gradient-to-r from-[#00BFFF] via-[#00BFFF] to-[#1E88E5]"
                style={{
                  width: `${value}%`,
                }}
              />

              {/* Slider Thumb */}
              <div
                className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow border border-gray-300"
                style={{
                  left: `${value}%`, 
                  transform: "translate(-50%, -50%)", 
                }}
              />
            </div>

            {/* Labels */}
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Alert</span>
              <span>Safe</span>
              <span>Best</span>
            </div>

            {/* Testing Input Field */}
            {/*<div className="flex items-center mt-4 space-x-2">
              <label htmlFor="slider-value" className="text-gray-600 font-medium">
                Set Value:
              </label>
              <input
                type="number"
                id="slider-value"
                value={value}
                onChange={handleInputChange}
                className="w-16 px-2 py-1 border border-gray-300 rounded"
                min="0"
                max="100"
              />
            </div>*/}
          </div>
        </div>
      </div>

      {/* Payments */}
      <div className="flex flex-col justify-between bg-white p-4 rounded-lg shadow-sm">
        {/* Header Section */}
        <div>
          <div className="flex flex-row justify-between items-center mb-2">
            <div className="flex items-center">
              <MdOutlinePayments className="text-gray-600 mr-[6px]" size={22} />
              <h2 className="text-gray-600 text-[14px] font-medium">Payments</h2>
            </div>
            <div className="flex justify-center items-center hover:cursor-pointer w-[25px] h-[25px] hover:bg-gray-100 rounded-full">
              <MdNavigateNext size={20} className="text-gray-600" />
            </div>
          </div>
          {/* Divider */}
          <div className="w-full h-[1px] bg-[#F4F4F4] rounded"></div>
        </div>

        <ul className="mt-[8px]">
          {Array(4).fill(null).map((_, index) => (
            <li className="flex justify-between items-center h-[40px] font-normal border-b-[1px] border-b-[#F4F4F4] text-[15px] hover:bg-gray-100 hover:cursor-pointer">
            <div className="flex flex-rol items-center">
              <div className="flex" style={{ position: 'relative' }}>
                <div className="w-[20px] h-[20px]" style={{ position: 'relative' }}>
                  <p
                    className="absolute text-[10px] z-[10] ml-[2px] mt-[4px]"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    21
                  </p>
                  <span className="">
                    <IoCalendarClearOutline className="text-[#4d4d4d]" size={24} />
                  </span>
                </div>
              </div>
              <span className="text-[14px] ml-[8px]">BNPL</span>
              <span className="text-gray-500 text-[13px] ml-[2px]">(Bi-Monthly)</span>
            </div>
            <span className="text-red-500 text-[14px]">-R1 570.00</span>
          </li>
          
          ))}
        </ul>
        <button className="mt-4 bg-[#1E88E5] text-white w-full py-2 rounded-lg hover:bg-[#157dd8]">
          Show all Payments
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="flex flex-col justify-between col-span-2 md:col-span-1 bg-white p-4 rounded-lg shadow-sm">
        {/* Header Section */}
        <div className="flex flex-row justify-between items-center mb-2">
          <div className="flex items-center">
            <MdOutlineRestore className="text-gray-600 mr-[6px]" size={22} />
            <h2 className="text-gray-600 text-[14px] font-medium">Recent Transactions</h2>
          </div>
          <div className="flex justify-center items-center hover:cursor-pointer w-[25px] h-[25px] hover:bg-gray-100 rounded-full">
            <MdNavigateNext size={20} className="text-gray-600" />
          </div>
        </div>
        
        <table className="w-full text-sm text-left">
          <thead className="">
          <tr className="w-full text-gray-500 border-b-[1px] border-b-gray-200">
            <th className="font-normal text-left pb-1">
              <div className="flex flex-row items-center hover:cursor-pointer">
                Name 
                <span>
                  <MdNavigateNext size={15} className="text-gray-400 rotate-90 mt-[1px]" />
                </span>
              </div>
            </th>
            <th className="font-normal text-left pb-1">
              <div className="flex flex-row items-center hover:cursor-pointer">
                Date 
                <span>
                  <MdNavigateNext size={15} className="text-gray-400 rotate-90 mt-[1px]" />
                </span>
              </div>
            </th>
            <th className="font-normal text-left pb-1">
              <div className="flex flex-row items-center hover:cursor-pointer">
                Amount
                <span>
                  <MdNavigateNext size={15} className="text-gray-400 rotate-90 mt-[1px]" />
                </span>
              </div>
            </th>
          </tr>
          </thead>
          
          <tbody className="font-normal text-sm">
            {Array(5).fill(null).map((_, index) => (
              <tr className="font-normal text-[12px]">
                <td className="pt-[5px]">Pick n Pay</td>
                <td className="pt-[5px]">7 Nov 2024</td>
                <td className="text-red-500 pt-[5px]">-R1 220.40</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-4 bg-[#1E88E5] text-white w-full py-2 rounded-lg hover:bg-[#157dd8]">
          Show all transactions
        </button>
      </div>

      {/* Financial Insight */}
      <div className="relative col-span-2 h-full bg-white p-4 rounded-lg shadow-sm">
        {/* Financial Insight Content */}
        <h2 className="text-gray-500 font-medium mb-2">Financial Insight</h2>
        {/*<p className="text-3xl font-bold mb-2">R105 385.40</p>
        <p className="text-sm text-green-500 mb-4">↑ 3.8%</p>*/}
        {/* Placeholder for chart */}
        <div className="bg-gray-200 rounded-lg">
         <DynamicChart />
        </div>

        {/* Coming Soon Layer */}
        <div className="absolute inset-0 backdrop-blur-sm bg-gray-900 bg-opacity-50 flex items-center justify-center rounded-lg">
          <span className="text-white text-lg font-semibold">Coming Soon...</span>
        </div>
      </div>
    </div>
  </div>
  )
}
