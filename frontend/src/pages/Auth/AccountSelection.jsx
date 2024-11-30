import React from "react";
import { FaBuilding, FaUser } from "react-icons/fa";
import { Factory, Store } from 'lucide-react';

const AccountSelection = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full" style={{ fontFamily: '"Inter", serif' }}>
      {/* Left Section */}
      <div className="bg-[#005EFF] text-white flex flex-col p-10 md:w-[40%]">
        <div>
          <h1 className="text-[30px]">Zesty</h1>
        </div>
        <div className="mt-[75px]">
          <h1 className="text-[42px] font-bold mb-4">
            Start Building Your Future with Zesty
          </h1>
          <p className="text-[16px] text-[#e1edff] font-thin mt-[20px]">
          Are you a small-to-medium enterprise looking to access flexible financing solutions
          or a supplier looking to streamline transactions with your SME partners?
          <span className="text-[#e1edff] font-medium"> Select your role below to get started.</span>
          </p>
        </div>
      </div>
      {/* Right Section */}
      <div className="flex flex-col justify-center bg-[#FAFBFC] p-14 md:w-[60%]">
        <h2 className="text-[26px] font-semibold mb-6 text-[#252F3F]">Choose Your Account Type</h2>
        <p className="text-[14px] text-gray-500  mb-8">
          Select the option that best describes your use case.
        </p>
        <div className="space-y-6 w-full max-w-md">
          {/* Business Account */}
          <button className="flex items-center w-full bg-white hover:bg-gray-200 px-6 py-4 rounded-lg hover-account-select">
            <div className="flex justify-center items-center w-[85px] h-[60px] border-[2px] border-[#005EFF] rounded-lg ">
              <Store className="text-[#005EFF] text-2xl" />   
            </div>
            
            <div className="text-left ml-[24px]">
              <h3 className="text-[16px] font-semibold text-[#252F3F]">Small-to-Medium Enterprise</h3>
              <p className="text-gray-600 text-[12px]">
                Unlock credit solutions for purchasing inventory and boosting
                your business.
              </p>
            </div>
          </button>
          {/* Supplier Account */}
          <button className="flex items-center w-full bg-white px-6 py-4 rounded-lg hover-account-select">
          <div className="flex justify-center items-center w-[70px] h-[60px] border-[2px] border-[#005EFF] rounded-lg ">
              <Factory className="text-[#005EFF] text-2xl " />   
            </div>
            <div className="text-left ml-[24px]">
              <h3 className="text-[16px] font-semibold text-[#252F3F]">Supplier</h3>
              <p className="text-gray-600 text-[12px]">
                Manage transactions seamlessly and grow your customer base.
              </p>
            </div>
          </button>
        </div>
        <button className="w-[120px] h-[45px] mt-8 bg-[#005EFF] hover:bg-[#295bb1] text-white px-4 py-2 rounded-lg">
          Next Step
        </button>
      </div>
    </div>
  );
};

export default AccountSelection;
