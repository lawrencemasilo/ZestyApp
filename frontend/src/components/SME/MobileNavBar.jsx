import React from 'react'
import { TbCreditCardPay } from "react-icons/tb";
import { MdOutlineDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoStorefrontOutline } from "react-icons/io5";

export const MobileNavBar = () => {
  return (
    <div className="flex flex-rol justify-between items-center w-full h-full px-[10px] mx-[20px] bg-[#252525] border-[1px] border-[#373636] rounded-[30px]">
      <div className="flex justify-center items-center w-[120px] h-[40px] px-[4px] bg-[#1E88E5] text-[#FFFFFF] rounded-[20px]">
        <MdOutlineDashboard  className="mr-[4px]" size={24}/>
        <span className="text-[13px] font-medium">Dashboard</span>
      </div>
      <div className="flex items-center justify-center w-[40px] h-[40px] border-[1px] text-[#FFFFFF] border-[#373636] rounded-full">
        <TbCreditCardPay size={24}/>
      </div>
      <div className="flex items-center justify-center w-[40px] h-[40px] border-[1px] text-[#FFFFFF] border-[#373636] rounded-full">
        <GrTransaction size={24}/>
      </div>
      <div className="flex items-center justify-center w-[40px] h-[40px] border-[1px] text-[#FFFFFF] border-[#373636] rounded-full">
        <IoStorefrontOutline size={24}/>
      </div>
    </div>
  )
}
