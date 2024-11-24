import React from "react";
import "../../App.css";
import { Link } from "react-router-dom"; // Import Link
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
  return (
    <div className="flex flex-col h-full pl-[15px]">
      {/* Header */}
      <div className="flex items-center h-[10%]">
        <h1
          className="text-[#00BFFF] text-[39px] font-bold mt-[20px]"
          style={{ fontFamily: '"Montserrat", sans-serif' }}
        >
          Sabela
        </h1>
      </div>

      {/* Menu */}
      <div className="h-[80%]">
        <div className="w-3/10 h-[100%] flex flex-col justify-between p-4 pl-0">
          {/* Top Section */}
          <div className="space-y-2">
            {/* Dashboard */}
            <Link to="/dashboard" className="flex items-center gap-2 p-2 rounded-md hover-item">
              <MdOutlineDashboard size={20} />
              <span className="text-sm font-medium">Dashboard</span>
            </Link>

            {/* Transactions */}
            <Link to="/transactions" className="flex items-center gap-2 p-2 rounded-md hover-item">
              <GrTransaction size={19} />
              <span className="text-sm font-medium">Transactions</span>
            </Link>

            {/* Credit */}
            <Link to="/credit" className="flex items-center gap-2 p-2 rounded-md hover-item">
              <TbCreditCardPay size={20} />
              <span className="text-sm font-medium">Credit</span>
            </Link>

            {/* Suppliers */}
            <Link to="/suppliers" className="flex items-center gap-2 p-2 rounded-md hover-item">
              <IoStorefrontOutline size={20} />
              <span className="text-sm font-medium">Suppliers</span>
            </Link>
          </div>

          {/* Bottom Section */}
          <div className="space-y-2">
            {/* Notifications */}
            <Link to="/notifications" className="flex items-center gap-2 p-2 rounded-md hover-item">
              <div className="w-[7px] h-[7px] absolute bg-[#E74C3C] rounded mt-[-14px] ml-[12px]"></div>
              <Bell size={20} />
              <span className="text-sm font-medium">Notifications</span>
            </Link>

            {/* Help Centre */}
            <Link to="/help-center" className="flex items-center gap-2 p-2 rounded-md hover-item">
              <RiCustomerService2Line size={20} />
              <span className="text-sm font-medium">Help Centre</span>
            </Link>

            {/* Settings */}
            <Link to="/settings" className="flex items-center gap-2 p-2 rounded-md hover-item">
              <BsGear size={19} />
              <span className="text-sm font-medium">Settings</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="flex w-[100%] h-[1px]">
        <div className="w-[100%] h-[100%] mr-[15px] bg-[#e3e4e7] rounded"></div>
      </div>

      {/* Profile Section */}
      <div className="w-full h-[8%] pt-[10px]">
        <div className="flex flex-row items-center w-[100%] h-[100%]">
          <div>
            <img
              src={test}
              alt="user profile picture"
              className="w-[50px] h-[50px] rounded-full"
            />
          </div>
          <div className="ml-[8px]">
            <p className="text-[14px] font-bold">Neo Masilo</p>
            <p className="text-[10px] font-medium">Neolawrencemasilo@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
