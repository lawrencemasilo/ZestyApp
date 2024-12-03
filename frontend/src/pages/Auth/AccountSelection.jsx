import React, { useState } from "react";
import { Factory, Store, CircleArrowLeft } from 'lucide-react';
import { Link } from "react-router-dom";

const AccountSelection = () => {
  const [selectedAccount, setSelectedAccount] = useState('');

  const accountTypes = [
    {
      id: 'sme',
      title: 'Small-to-Medium Enterprise',
      description: 'Unlock credit solutions for purchasing inventory and boosting your business.',
      icon: Store,
      path: '/signup-sme'
    },
    {
      id: 'supplier',
      title: 'Supplier',
      description: 'Manage transactions seamlessly and grow your customer base.',
      icon: Factory,
      path: '/signup-supplier'
    }
  ];

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row font-sans">
      {/* Left Section */}
      <div className="bg-[#005EFF] text-white lg:w-2/5 p-6 lg:p-12 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Zesty</h1>
        </div>
        
        <div className="flex-grow flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Start Building Your Future with Zesty
          </h1>
          <p className="text-lg text-blue-100 mb-8">
            Are you a small-to-medium enterprise looking to access flexible financing solutions
            or a supplier looking to streamline transactions with your SME partners?
            <span className="font-medium"> Select your role to get started.</span>
          </p>
          
          <Link 
            to="/"
            className="inline-flex items-center justify-center w-32 px-4 py-2 border border-white rounded-lg 
                     transition-colors duration-200 hover:bg-white/10"
          >
            <CircleArrowLeft className="mr-2" size={20} />
            <span>Back</span>
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="bg-[#FAFBFC] lg:w-3/5 p-6 lg:p-12 flex flex-col justify-center">
        <div className="max-w-2xl mx-auto w-full">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900">
            Choose Your Account Type
          </h2>
          <p className="text-gray-600 mb-8">
            Select the option that best describes your use case.
          </p>

          <div className="space-y-4">
            {accountTypes.map(({ id, title, description, icon: Icon, path }) => (
              <button
                key={id}
                onClick={() => setSelectedAccount(id)}
                className={`w-full flex items-start md:items-center p-4 md:p-6 rounded-xl transition-all duration-200
                          ${selectedAccount === id 
                            ? 'bg-blue-50 border-2 border-[#005EFF] shadow-lg' 
                            : 'bg-white border-2 border-gray-100 hover:border-[#005EFF] hover:shadow-md'
                          }`}
              >
                <div className="flex justify-center items-center w-16 h-16 rounded-lg border-2 border-[#005EFF] bg-blue-50">
                  <Icon className="text-[#005EFF] w-8 h-8" />
                </div>
                
                <div className="ml-4 md:ml-6 text-left">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <Link
            to={selectedAccount ? `/signup-${selectedAccount}` : '#'}
            className={`mt-8 inline-flex items-center justify-center px-6 py-3 rounded-lg text-white
                     transition-all duration-200 w-full md:w-auto
                     ${selectedAccount 
                       ? 'bg-[#005EFF] hover:bg-blue-700 cursor-pointer' 
                       : 'bg-blue-300 cursor-not-allowed'
                     }`}
            onClick={(e) => !selectedAccount && e.preventDefault()}
          >
            Next Step
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountSelection;