import React, { useEffect, useState } from 'react';
import { Settings, User, Building, Edit, Save, ChevronRight, Shield, Moon, Sun, Bell } from 'lucide-react';
import { Switch } from "../../components/ui/switch";
import { logout } from "../../services/authService";
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
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
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    twoFactor: true,
  });

  const navigate = useNavigate();

  // Fetch User Profile
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
        const response = await axios.get(`http://localhost:5000/api/sme/${user._id}`);
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved profile data:", profileData);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm">
          {/* Profile Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#005EFF]">
                  {user ? user.firstName[0] + user.lastName[0] : 'NM'}
                </span>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-semibold">{user?.firstName || "Loading..."}</h1>
                <p className="text-gray-500">{profileData.business.companyName}</p>
              </div>
              <button onClick={handleLogout}>Logout</button>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-[#005EFF] text-white rounded-lg hover:bg-blue-700"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              )}
            </div>
          </div>

          {/* Profile Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('personal')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'personal'
                    ? 'border-[#005EFF] text-[#005EFF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Personal Information
              </button>
              <button
                onClick={() => setActiveTab('business')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'business'
                    ? 'border-[#005EFF] text-[#005EFF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Business Details
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
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
          <div className="p-6">
            {activeTab === 'personal' && (
              <div className="space-y-6">
                {Object.entries(profileData.personal).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-3 gap-4">
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
                              [key]: e.target.value,
                            },
                          })
                        }
                        className="col-span-2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#005EFF] focus:border-[#005EFF]"
                      />
                    ) : (
                      <div className="col-span-2 text-sm text-gray-900">{value}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'business' && (
              <div className="space-y-6">
                {Object.entries(profileData.business).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-3 gap-4">
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
                              [key]: e.target.value,
                            },
                          })
                        }
                        className="col-span-2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#005EFF] focus:border-[#005EFF]"
                      />
                    ) : (
                      <div className="col-span-2 text-sm text-gray-900">{value}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
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

                <div className="flex items-center justify-between">
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

                <div className="flex items-center justify-between">
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
      </div>
    </div>
  );
};

export default ProfilePage;
