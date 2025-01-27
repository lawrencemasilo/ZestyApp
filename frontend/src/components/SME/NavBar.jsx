import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { LayoutDashboard, ArrowRightLeft, CreditCardIcon, Building2, LogOut, ShieldCheck } from 'lucide-react';
import axios from "../../api/axios";

const NavItem = ({ icon, text, active }) => (
  <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer ${
    active 
      ? 'bg-blue-50 text-[#005EFF] dark:bg-blue-900/50 dark:text-blue-400' 
      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
  }`}>
    {icon}
    <span className="text-sm font-medium">{text}</span>
  </div>
);

export const NavBar = () => {
  const [user, setUser] = useState(null);
  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/auth/profile");
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link to="/dashboard" onClick={() => setSelectedItem("dashboard")}>
          <h1 className="text-2xl font-bold text-[#005EFF] dark:text-blue-400">Zesty</h1>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2">
        {user && !user.verified && <Link to="/getting-started" onClick={() => setSelectedItem("getting-started")}>
          <div className="flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer border-2 border-dashed p-6 text-center bg-blue-50 text-[#005EFF] border-[#005EFF] dark:bg-blue-900/50 dark:text-blue-400 dark:border-blue-500">
            <ShieldCheck size={20} />
            <span className="text-sm font-medium">Getting started</span>
          </div>
        </Link>}
        <Link to="/dashboard" onClick={() => setSelectedItem("dashboard")}>
          <NavItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={selectedItem === 'dashboard' && true} />
        </Link>
        <Link to="/transactions" onClick={() => setSelectedItem('transactions')}>
          <NavItem icon={<ArrowRightLeft size={20} />} text="Transactions" active={selectedItem === 'transactions' && true} />
        </Link>
        <Link to="/credit" onClick={() => setSelectedItem('credit')}>
          <NavItem icon={<CreditCardIcon size={20} />} text="Credit" active={selectedItem === 'credit' && true} />
        </Link>
        <Link to="/suppliers" onClick={() => setSelectedItem('suppliers')}>
          <NavItem icon={<Building2 size={20} />} text="Suppliers" active={selectedItem === 'suppliers' && true} />
        </Link>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Link to="/profile" className="flex items-center space-x-3 hover:cursor-pointer" onClick={() => setSelectedItem('profile')}>
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center p-2">
            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium tracking-wider">NM</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium dark:text-gray-200">
              {user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : "Loading..."}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || "No email available"}</p>
          </div>
          <LogOut size={18} className="text-gray-400 dark:text-gray-500 cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

