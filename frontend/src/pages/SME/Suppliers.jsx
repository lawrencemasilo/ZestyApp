import React, { useState } from 'react';
import { Briefcase, Tag, Download, Bell, Percent, Star, Calendar, ArrowRight, Clock, ChevronRight, X, LayoutDashboard, ArrowRightLeft, CreditCardIcon, Building2, LogOut } from 'lucide-react';
import NotificationsPopover from '../../components/SME/NotificationsPopover';
import { ThemeContext } from '../../components/ui/darkmode';
import { ThemeProvider } from '../../components/ui/darkmode';


const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-white border-r border-gray-200 p-6 transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#005EFF]">Zesty</h1>
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
  <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer ${active ? 'bg-blue-50 text-[#005EFF]' : 'text-gray-600 hover:bg-gray-50'}`}>
    {icon}
    <span className="text-sm font-medium">{text}</span>
  </div>
);

const SupplierPage = () => {
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const suppliers = [
    {
      name: 'ABC Hardware',
      category: 'Hardware',
      offer: '10% off on power tools',
      offerDetails: 'Valid for purchases over R500',
      rating: 4.8,
      deliveryTime: '1-2 business days',
      supportHours: '9am - 5pm, Mon-Fri'
    },
    {
      name: 'XYZ Office Supplies',
      category: 'Office Supplies',
      offer: 'Free next-day delivery',
      offerDetails: 'On orders placed before 2pm',
      rating: 4.5,
      deliveryTime: 'Next business day',
      supportHours: '8am - 6pm, Mon-Fri'
    },
    {
      name: 'Acme Electrical',
      category: 'Electrical',
      offer: '15% discount on LED lighting',
      offerDetails: 'Minimum purchase of 5 bulbs',
      rating: 4.7,
      deliveryTime: '2-3 business days',
      supportHours: '9am - 6pm, Mon-Sat'
    },
    {
      name: 'Bright Lights',
      category: 'Lighting',
      offer: 'Bulk pricing for orders over R2,000',
      offerDetails: 'Get up to 20% off on large orders',
      rating: 4.6,
      deliveryTime: '3-5 business days',
      supportHours: '10am - 4pm, Mon-Sat'
    },
    {
      name: 'Green Gardening',
      category: 'Landscaping',
      offer: 'Complimentary lawn maintenance service',
      offerDetails: 'For new customers signing up for annual contract',
      rating: 4.9,
      deliveryTime: '5-7 business days',
      supportHours: '8am - 6pm, Mon-Sat'
    }
  ];

  const handleSupplierClick = (supplier) => {
    setSelectedSupplier(supplier);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      
      <div className="flex-1 p-8 pt-5 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Suppliers</h1>
            <p className="text-sm text-gray-500">List of Suppliers for your business needs</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Download
            </button>
            {/*<div className="relative" >
              <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
            </div>*/}
            <NotificationsPopover />
          </div>
        </div>

        {/* Supplier List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.map((supplier, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleSupplierClick(supplier)}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-medium text-gray-800">{supplier.name}</h3>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 mb-2">{supplier.category}</p>
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4 text-[#005EFF]" />
                <p className="text-sm font-medium text-[#005EFF]">{supplier.offer}</p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Percent className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-500">{supplier.offerDetails}</p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <p className="text-sm text-gray-500">{supplier.rating} (15 reviews)</p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-500">{supplier.deliveryTime}</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-500">{supplier.supportHours}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Supplier Details */}
        {selectedSupplier && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-gray-600" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    {selectedSupplier.name}
                  </h2>
                </div>
                <button
                  className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  onClick={() => setSelectedSupplier(null)}
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                {selectedSupplier.category}
              </p>
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-[#005EFF]" />
                <p className="text-sm font-medium text-[#005EFF]">
                  {selectedSupplier.offer}
                </p>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Percent className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-500">
                  {selectedSupplier.offerDetails}
                </p>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-yellow-500" />
                <p className="text-sm text-gray-500">
                  {selectedSupplier.rating} (15 reviews)
                </p>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-500">
                  {selectedSupplier.deliveryTime}
                </p>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-500">
                  {selectedSupplier.supportHours}
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#005EFF] text-white rounded-lg hover:bg-blue-700">
                <ArrowRight className="w-4 h-4" />
                View Supplier
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierPage;