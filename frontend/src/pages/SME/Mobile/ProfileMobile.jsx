import React, { useEffect, useState } from 'react';
import { Edit, Save, Shield, Moon, Bell, LayoutDashboard, ArrowRightLeft, CreditCardIcon, Building2 } from 'lucide-react';
import { Switch } from "../../../components/ui/switch";
import { logout } from "../../../services/authService";
import { Link, useNavigate } from 'react-router-dom';
import NotificationsPopover from '../../../components/SME/NotificationsPopover';
import { useSelectedItem } from '../../../context/SelectedItemContext';
import axios from '../../../api/axios';

const BottomNav = () => {  
    const { selectedItem, setSelectedItem } = useSelectedItem();
    
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden p-0">
        <div className="flex justify-around items-center h-16 w-full pb-0">
          <Link to="/dashboard" className="flex h-full" onClick={() => setSelectedItem("dashboard")}>
            <NavItem icon={<LayoutDashboard size={24} />}  text="Dashboard" active={selectedItem === 'dashboard' && true} />
          </Link>
          <Link to="/transactions" className="flex h-full" onClick={() => setSelectedItem('transactions')}>
            <NavItem icon={<ArrowRightLeft size={24} />}  text="Transactions" active={selectedItem === 'transactions' && true} />
          </Link>
          <Link to="/credit" className="flex h-full" onClick={() => setSelectedItem('credit')}>
            <NavItem icon={<CreditCardIcon size={24} />}  text="Credit" active={selectedItem === 'credit' && true} />
          </Link>
          <Link to="/suppliers" className="flex h-full" onClick={() => setSelectedItem('suppliers')}>
            <NavItem icon={<Building2 size={24} />}  text="Suppliers" active={selectedItem === 'suppliers' && true} />
          </Link>
        </div>  
      </div>
    );
  }

const Header = () => {
  
    return (
    <div className="sticky top-0 z-10 bg-gray-50 px-4">
      {/* Top Bar with Logo, Notifications, and Profile */}
      <div className="flex items-center justify-between p-4 px-0 ">
        <h1 className="text-3xl font-bold text-blue-600">Zesty</h1>
        <div className="flex items-center gap-4">
          <NotificationsPopover />
        </div>
      </div>
      
    </div>
    )
  };

  const NavItem = ({ icon, text, active }) => (
    <div className={`flex flex-col items-center px-4  py-3 rounded-lg cursor-pointer ${active ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </div>
  );

const ProfileMobilePage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    twoFactor: true
  });
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    personal: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
    },
    business: {
      companyName: '',
      registrationNumber: '',
      vatNumber: '',
      industry: '',
      businessAddress: '',
      monthlyRevenue: '',
    },
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/auth/profile");
        const userData = response.data;
        setUser(userData);

        setProfileData((prev) => ({
          ...prev,
          personal: {
            fullName: userData.firstName || '',
            email: userData.email || '',
            phone: userData.phone ? `+27 ${userData.phone}` : '',
            address: '', // Add real field if available
          },
        }));
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUserProfile();
  }, []);


  useEffect(() => {
    if (!user || !user._id) return;

    const fetchSmeProfile = async () => {
      try {
        const response = await axios.get(`/sme/${user._id}`);
        const smeData = response.data.sme;
        setProfileData((prev) => ({
          ...prev,
          personal: {
            fullName: user.firstName || '',
            email: user.email || '',
            phone: user.phone ? `+27 ${user.phone}` : '',
            address: smeData.address.physical || '', 
          },
          business: {
            companyName: smeData.business_name || '',
            registrationNumber: smeData.registration_number || '',
            vatNumber: smeData.tax_id || '', 
            industry: smeData.industry || '',
            businessAddress:  smeData.address.operational || '', 
            monthlyRevenue: smeData.monthly_revenue || '',
          },
        }));
      } catch (err) {
        console.error("Error fetching SME profile:", err);
      }
    };

    fetchSmeProfile();
  }, [user]);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex-1 w-full bg-gray-50 min-h-screen  ">
      <Header />
      <div className="max-w-4xl mx-auto  px-4 md:px-6 lg:px-8 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-sm">
          
          {/* Profile Header */}
          <div className="p-4 md:p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-xl md:text-2xl font-bold text-[#005EFF]">
                {user ? user.firstName[0] + user.lastName[0] : ''}
                </span>
              </div>
              <div className="flex-1">
                <h1 className="text-xl md:text-2xl font-semibold">{profileData.personal.fullName}</h1>
                <p className="text-gray-500">{profileData.business.companyName}</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50"
                >
                  Logout
                </button>
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="hidden md:inline">Edit Profile</span>
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#005EFF] text-white rounded-lg hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4" />
                    <span className="hidden md:inline">Save Changes</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Navigation */}
          <div className=" border-gray-200 overflow-x-auto">
            <nav className="flex whitespace-nowrap">
              <button
                onClick={() => setActiveTab('personal')}
                className={`px-4 md:px-6 py-3 md:py-4 text-sm font-medium ${
                  activeTab === 'personal'
                    ? 'border-[#005EFF] text-[#005EFF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Personal Information
              </button>
              <button
                onClick={() => setActiveTab('business')}
                className={`px-4 md:px-6 py-3 md:py-4 text-sm font-medium ${
                  activeTab === 'business'
                    ? 'border-[#005EFF] text-[#005EFF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Business Details
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 md:px-6 py-3 md:py-4 text-sm font-medium ${
                  activeTab === 'settings'
                    ? 'border-[#005EFF] text-[#005EFF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Settings
              </button>
            </nav>
          </div>

          {/* Profile Content */}
          <div className="p-4 md:p-6">
            {activeTab === 'personal' && (
              <div className="space-y-4 md:space-y-6">
                {Object.entries(profileData.personal).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                    <label className="text-sm font-medium text-gray-500 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            personal: {
                              ...profileData.personal,
                              [key]: e.target.value
                            }
                          })
                        }
                        className="md:col-span-2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#005EFF] focus:border-[#005EFF] w-full"
                      />
                    ) : (
                      <div className="md:col-span-2 text-sm text-gray-900">{value}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'business' && (
              <div className="space-y-4 md:space-y-6">
                {Object.entries(profileData.business).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                    <label className="text-sm font-medium text-gray-500 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            business: {
                              ...profileData.business,
                              [key]: e.target.value
                            }
                          })
                        }
                        className="md:col-span-2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#005EFF] focus:border-[#005EFF] w-full"
                      />
                    ) : (
                      <div className="md:col-span-2 text-sm text-gray-900">{value}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <Moon className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-gray-500">Switch to dark theme</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, darkMode: checked })
                    }
                  />
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Notifications</p>
                      <p className="text-sm text-gray-500">Receive app notifications</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.notifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, notifications: checked })
                    }
                  />
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Enhanced account security</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.twoFactor}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, twoFactor: checked })
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      <BottomNav />
      </div>
    </div>
  );
};

export default ProfileMobilePage;