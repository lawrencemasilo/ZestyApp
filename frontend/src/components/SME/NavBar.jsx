import React, { useState } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { BsGear } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiCustomerService2Line } from "react-icons/ri";
import { TbCreditCardPay } from "react-icons/tb";
import { MdOutlineDashboard } from "react-icons/md";
import { IoStorefrontOutline } from "react-icons/io5";
import { Bell } from 'lucide-react';
import test from "../../assets/images/test.jpg";

export const NavBar = () => {
  const [selectedItem, setSelectedItem] = useState('');

  return (
    <div className="flex flex-col h-full pl-[15px]">
      {/* Header */}
      <div className="flex items-center h-[10%]">
        <h1
          className="text-[#005EFF] text-[39px] font-bold mt-[20px]"
          style={{ fontFamily: '"Montserrat", sans-serif' }}
        >
          Zesty
        </h1>
      </div>

      {/* Menu */}
      <div className="h-[79%]">
        <div className="w-3/10 h-[100%] flex flex-col justify-between p-4 pl-0">
          {/* Top Section */}
          <div className="space-y-2">
            {/* Dashboard */}
            <Link to="/dashboard" className={`flex items-center gap-2 p-2 ${selectedItem === 'Dashboard' && 'bg-[#005EFF] text-white'} rounded-md hover-item`} onClick={() => setSelectedItem('Dashboard')}>
              <MdOutlineDashboard size={20} className={`${selectedItem === 'Dashboard' && 'text-white'}`}/>
              <span className={`text-sm font-medium ${selectedItem === 'Dashboard' && 'text-white'}`}>Dashboard</span>
            </Link>

            {/* Transactions */}
            <Link to="/transactions" className={`flex items-center gap-2 p-2 ${selectedItem === 'Transactions' && 'bg-[#005EFF] text-white'} rounded-md hover-item`} onClick={() => setSelectedItem('Transactions')}>
              <GrTransaction size={19} className={`${selectedItem === 'Transactions' && 'text-white'}`} />
              <span className={`text-sm font-medium ${selectedItem === 'Transactions' && 'text-white'}`}>Transactions</span>
            </Link>

            {/* Credit */}
            <Link to="/credit" className={`flex items-center gap-2 p-2 ${selectedItem === 'Credit' && 'bg-[#005EFF] text-white'} rounded-md hover-item`} onClick={() => setSelectedItem('Credit')}>
              <TbCreditCardPay size={20} className={`${selectedItem === 'Credit' && 'text-white'}`} />
              <span className={`text-sm font-medium ${selectedItem === 'Credit' && 'text-white'}`}>Credit</span>
            </Link>

            {/* Suppliers */}
            <Link to="/suppliers" className={`flex items-center gap-2 p-2 ${selectedItem === 'Suppliers' && 'bg-[#005EFF] text-white'} rounded-md hover-item`} onClick={() => setSelectedItem('Suppliers')}>
              <IoStorefrontOutline size={20} className={`${selectedItem === 'Suppliers' && 'text-white'}`} />
              <span className={`text-sm font-medium ${selectedItem === 'Suppliers' && 'text-white'}`}>Suppliers</span>
            </Link>
          </div>

          {/* Bottom Section */}
          <div className="space-y-2">
            {/* Notifications */}
            {/*<Link to="/notifications" className={`flex items-center gap-2 p-2 ${selectedItem === 'Notifications' && 'bg-[#005EFF] text-white'} rounded-md hover-item`} onClick={() => setSelectedItem('Notifications')}>
              <div className="w-[7px] h-[7px] absolute bg-[#E74C3C] rounded mt-[-14px] ml-[12px]"></div>
              <Bell size={20} className={`${selectedItem === 'Notifications' && 'text-white'}`} />
              <span className={`text-sm font-medium ${selectedItem === 'Notifications' && 'text-white'}`}>Notifications</span>
            </Link>*/}

            {/* Help Centre */}
            {/*<Link to="/help-center" className={`flex items-center gap-2 p-2 ${selectedItem === 'Help Centre' && 'bg-[#005EFF] text-white'} rounded-md hover-item`} onClick={() => setSelectedItem('Help Centre')}>
              <RiCustomerService2Line size={20} className={`${selectedItem === 'Help Centre' && 'text-white'}`} />
              <span className={`text-sm font-medium ${selectedItem === 'Help Centre' && 'text-white'}`}>Help Centre</span>
            </Link>*/}

            {/* Settings */}
            {/*<Link to="/settings" className={`flex items-center gap-2 p-2 ${selectedItem === 'Settings' && 'bg-[#005EFF] text-white'} rounded-md hover-item`} onClick={() => setSelectedItem('Settings')}>
              <BsGear size={19} className={`${selectedItem === 'Settings' && 'text-white'}`} />
              <span className={`text-sm font-medium ${selectedItem === 'Settings' && 'text-white'}`}>Settings</span>
            </Link>*/}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="flex w-[100%] h-[1px]">
        <div className="w-[100%] h-[100%] mr-[15px] bg-[#e3e4e7] rounded"></div>
      </div>

      {/* Profile Section */}
      <div className="w-full h-[8%] pt-[10px]">
        <Link to="profile" className="flex flex-row items-center w-[100%] h-[100%] hover:cursor-pointer" onClick={() => setSelectedItem('Profile')}>
          <div>
            <div className="flex items-center justify-center bg-[#252F3F] text-white w-[40px] h-[40px] rounded-full">
              NM
            </div>
          </div>
          <div className="ml-[8px]">
            <p className="text-[14px] font-medium">Neo Masilo</p>
            <p className="text-[10px] font-medium">Neolawrencemasilo@gmail.com</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
