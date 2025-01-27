import React, { useState } from 'react';
import { Briefcase, Tag, Download,Moon, Sun, Bell, Percent, Star, Calendar, ArrowRight, Clock, ChevronRight, X, LayoutDashboard, ArrowRightLeft, CreditCardIcon, Building2, LogOut } from 'lucide-react';
import NotificationsPopover from '../../components/SME/NotificationsPopover';
import { useTheme } from '../../components/ui/darkmode';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#005EFF] dark:text-blue-400">Zesty</h1>
        {isOpen && (
          <button className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600" onClick={onClose}>
            <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        )}
      </div>

      <nav className="flex flex-col space-y-2">
        <NavItem icon={<LayoutDashboard size={20} />} text="Dashboard" />
        <NavItem icon={<ArrowRightLeft size={20} />} text="Transactions" />
        <NavItem icon={<CreditCardIcon size={20} />} text="Credit" active />
        <NavItem icon={<Building2 size={20} />} text="Suppliers" />
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-600 dark:text-gray-300 font-medium">NM</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium dark:text-white">Neo Masilo</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">neolawrencemasilo@gmail.com</p>
          </div>
          <LogOut size={18} className="text-gray-400 dark:text-gray-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ icon, text, active }) => (
  <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer ${
    active ? 'bg-blue-50 dark:bg-blue-900/50 text-[#005EFF] dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
  }`}>
    {icon}
    <span className="text-sm font-medium">{text}</span>
  </div>
);

const SupplierPage = () => {
  const { darkMode, toggleDarkMode } = useTheme();
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
    <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Sidebar />
      
      <div className="flex-1 p-8 pt-5 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Suppliers</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">List of Suppliers for your business needs</p>
          </div>
          {/* Dark Mode Toggle */}
                     <div className="flex items-center gap-4">
                      <button 
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-full transition-colors ${
                          darkMode 
                            ? 'hover:bg-gray-700 bg-gray-800 text-yellow-500' 
                            : 'hover:bg-gray-100 bg-white text-gray-700'
                        }`}
                      >
                        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                      </button>
                  </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 text-sm border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-white">
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
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              onClick={() => handleSupplierClick(supplier)}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white">{supplier.name}</h3>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{supplier.category}</p>
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4 text-[#005EFF] dark:text-blue-400" />
                <p className="text-sm font-medium text-[#005EFF] dark:text-blue-400">{supplier.offer}</p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Percent className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <p className="text-sm text-gray-500 dark:text-gray-400">{supplier.offerDetails}</p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <p className="text-sm text-gray-500 dark:text-gray-400">{supplier.rating} (15 reviews)</p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <p className="text-sm text-gray-500 dark:text-gray-400">{supplier.deliveryTime}</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <p className="text-sm text-gray-500 dark:text-gray-400">{supplier.supportHours}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Supplier Details Modal */}
        {selectedSupplier && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {selectedSupplier.name}
                  </h2>
                </div>
                <button
                  className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  onClick={() => setSelectedSupplier(null)}
                >
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {selectedSupplier.category}
              </p>
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-[#005EFF] dark:text-blue-400" />
                <p className="text-sm font-medium text-[#005EFF] dark:text-blue-400">
                  {selectedSupplier.offer}
                </p>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Percent className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedSupplier.offerDetails}
                </p>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-yellow-500" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedSupplier.rating} (15 reviews)
                </p>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedSupplier.deliveryTime}
                </p>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedSupplier.supportHours}
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#005EFF] dark:bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-700">
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