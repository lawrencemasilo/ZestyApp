import React from 'react';
import { Briefcase, ChevronRight, X, LayoutDashboard, ArrowRightLeft, CreditCardIcon, Building2, LogOut } from 'lucide-react';


const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-white border-r border-gray-200 p-6 transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Zesty</h1>
        {isOpen && (
          <button className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300" onClick={onClose}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        )}
      </div>

      <nav className="flex flex-col space-y-2">
        <NavItem icon={<LayoutDashboard size={20} />} text="Dashboard" />
        <NavItem icon={<ArrowRightLeft size={20} />} text="Transactions" />
        <NavItem icon={<CreditCardIcon size={20} />} text="Credit" active />
        <NavItem icon={<Building2 size={20} />} text="Suppliers" />
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600 font-medium">NM</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Neo Masilo</p>
            <p className="text-xs text-gray-500">neolawrencemasilo@gmail.com</p>
          </div>
          <LogOut size={18} className="text-gray-400 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

// NavItem Component
const NavItem = ({ icon, text, active }) => (
  <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
    {icon}
    <span className="text-sm font-medium">{text}</span>
  </div>
);



const SupplierPage = () => {
  const suppliers = [
    {
      name: 'ABC Hardware',
      category: 'Hardware',
      availableCredit: 5000.00
    },
    {
      name: 'XYZ Office Supplies',
      category: 'Office Supplies',
      availableCredit: 3000.00
    },
    {
      name: 'Acme Electrical',
      category: 'Electrical',
      availableCredit: 2500.00
    },
    {
      name: 'Bright Lights',
      category: 'Lighting',
      availableCredit: 1500.00
    },
    {
      name: 'Green Gardening',
      category: 'Landscaping',
      availableCredit: 1000.00
    }
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Suppliers</h1>
        </div>

        {/* Supplier List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.map((supplier, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-medium text-gray-800">{supplier.name}</h3>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 mb-2">{supplier.category}</p>
              <p className="text-lg font-semibold text-blue-600">
                R{supplier.availableCredit.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplierPage;