import React, { useState } from 'react';
import { Settings, User, Building, Edit, Save, ChevronRight, Shield, Moon, Sun, Bell, BellOff } from 'lucide-react';
import { Switch } from "../../components/ui/switch";
import { logout } from "../../services/authService";
import { useNavigate } from 'react-router-dom';


const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    twoFactor: true
  });
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    personal: {
      fullName: 'Neo Masilo',
      email: 'neolawrencemasilo@gmail.com',
      phone: '+27 71 234 5678',
      address: '123 Main Street, Johannesburg',
      position: 'Business Owner'
    },
    business: {
      companyName: 'Tech Solutions Ltd',
      registrationNumber: 'REG123456',
      vatNumber: 'VAT789012',
      industry: 'Technology',
      businessAddress: '456 Business Ave, Sandton',
      annualRevenue: 'R5,000,000 - R10,000,000'
    }
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically make an API call to save the data
  };


  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm">
          {/* Profile Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">NM</span>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-semibold">{profileData.personal.fullName}</h1>
                <p className="text-gray-500">{profileData.business.companyName}</p>
              </div>
              <button onClick={() => handleLogout()}>Logout</button>
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
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Personal Information
              </button>
              <button
                onClick={() => setActiveTab('business')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'business'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Business Details
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'settings'
                    ? 'border-blue-600 text-blue-600'
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
                              [key]: e.target.value
                            }
                          })
                        }
                        className="col-span-2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                              [key]: e.target.value
                            }
                          })
                        }
                        className="col-span-2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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