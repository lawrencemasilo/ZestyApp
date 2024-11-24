import React from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";
import test from "../../assets/images/test.jpg"

export const MobileHeader = () => {
  return (
    <div className="bg-[#171415] px-[20px]  flex flex-row w-full h-full justify-between items-center">
      <div className="text-[25px] font-medium text-[#FDFDFD]" style={{ fontFamily: '"Montserrat", sans-serif' }}>
        Sabela
      </div>
      <div className="flex flex-row items-center">
        <div className="flex justify-center items-center w-[34px] h-[34px] bg-[#252525] border-[1px] border-[#373636] mr-[10px] rounded-full hover:cursor-pointer">
          <div className="w-[7px] h-[7px] absolute bg-[#252525] border-[1px] border-[#B9B9B9] rounded mt-[-10px] ml-[12px]"></div>
          <IoMdNotificationsOutline  size={22} className="text-[#B9B9B9]" />
        </div>
        <div>
          <img src={test} alt="user profile picture" className="w-[42px] h-[42px] rounded-full" />
        </div>
      </div>
    </div>
  )
}
