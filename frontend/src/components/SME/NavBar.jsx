import React from 'react'
import "../../App.css"
import { BsGear } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiCustomerService2Line } from "react-icons/ri";
import { TbCreditCardPay } from "react-icons/tb";
import { MdOutlineDashboard } from "react-icons/md"
import test from "../../assets/images/test.jpg"

export const NavBar = () => {
  return (
    <div className="flex flex-col h-full pl-[15px]">
      <div className="flex items-center h-[10%]">
        <h1 className="text-[#00BFFF] text-[39px] font-bold mt-[20px]" style={{ fontFamily: '"Montserrat", sans-serif' }}>Sabela</h1>
      </div>
      <div className="h-[80%]">
        <div className="w-3/10 h-[100%] flex flex-col justify-between p-4 pl-0">
            {/* Top Section */}
            <div className="space-y-2">
              {/* Dashboard */}
              <div className="flex items-center gap-2 p-2 rounded-md hover-item">
                <MdOutlineDashboard className="" size={20} />
                <span className="text-sm font-medium">Dashboard</span>
              </div>

              {/* Transactions */}
              <div className="flex items-center gap-2 p-2 rounded-md hover-item">
                <GrTransaction className="" size={19} />
                <span className="text-sm font-medium ">Transactions</span>
              </div>

              {/* Suppliers */}
              {/*<div className="item flex items-center gap-2 p-2 rounded-md hover-item">
                <BsCart className="" size={20} />
                <span className="text-sm font-medium">Suppliers</span>
              </div>/}

              {/* Credit */}
              <div className="flex items-center gap-2 p-2 rounded-md hover-item">
                <TbCreditCardPay className="" size={20} />
                <span className="text-sm font-medium ">Credit</span>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="space-y-2">
              {/* Notifications */}
              <div className="flex items-center gap-2 p-2 rounded-md hover-item">
                <div className="w-[7px] h-[7px] absolute bg-red-600 rounded mt-[-10px] ml-[12px]"></div>
                <IoMdNotificationsOutline className="font" size={22} />
                <span className="text-sm font-medium">Notifications</span>
              </div>

              {/* Help Centre */}
              <div className="flex items-center gap-2 p-2 rounded-md hover-item">
                <RiCustomerService2Line className="" size={20} />
                <span className="text-sm font-medium">Help Centre</span>
              </div>

              {/* Settings */}
              <div className="flex items-center gap-2 p-2 rounded-md hover-item">
                <BsGear className="" size={19} />
                <span className="text-sm font-medium">Settings</span>
              </div>
            </div>
        </div>
      </div>
      <div className="flex  w-[100%] h-[1px]">
        <div className="w-[100%] h-[100%] mr-[15px] bg-[#e3e4e7] rounded"></div>
      </div>
      {/*Profile*/}
      <div className="w-full h-[8%] pt-[10px] hover">
        <div className="flex flex-row items-center w-[100%] h-[100%]">
          <div>
            <img src={test} alt="user profile picture" className="w-[40px] h-[40px] rounded-full" />
          </div>
          <div className="ml-[8px]">
            <p className='text-[12px] font-bold'>Neo Masilo</p>
            <p className='text-[8px] font-medium'>Neolawrencemasilo@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}