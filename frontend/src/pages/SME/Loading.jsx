import React, { useEffect, useState } from 'react';
import { CheckCircle2, Settings, User, Database, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from "../../api/axios";

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();



  const loadingStages = [
    { icon: User, text: 'Loading user profile...', subText: 'Fetching your personal information' },
    { icon: Settings, text: 'Configuring settings...', subText: 'Setting up your preferences' },
    { icon: Database, text: 'Syncing data...', subText: 'Getting your latest transactions' },
    { icon: Shield, text: 'Securing connection...', subText: 'Establishing secure session' },
  ];

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

  useEffect(() => {
    if (progress === 100 && user.verified)
        navigate("/dashboard");

    if ( progress === 100 && !user.verified)
        navigate("/getting-started");

  }, [progress])
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onLoadingComplete?.();
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  useEffect(() => {
    setCurrentStage(Math.min(Math.floor(progress / 25), 3));
  }, [progress]);

  const StageItem = ({ stage, index }) => {
    const Icon = stage.icon;
    const isActive = index === currentStage;
    const isCompleted = index < currentStage;

    return (
      <div className="flex items-center gap-4 transition-all duration-300">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${
          isActive ? 'bg-blue-100 text-blue-600' :
          isCompleted ? 'bg-green-100 text-green-600' :
          'bg-gray-100 text-gray-400'
        }`}>
          {isCompleted ? (
            <CheckCircle2 className="w-6 h-6" />
          ) : (
            <Icon className="w-6 h-6" />
          )}
        </div>
        <div className={`flex-1 transition-colors duration-300 ${
          isActive ? 'text-gray-900' : 
          isCompleted ? 'text-gray-600' : 
          'text-gray-400'
        }`}>
          <p className="font-medium">{stage.text}</p>
          <p className="text-sm">{stage.subText}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Zesty</h1>
          <p className="text-gray-500">Setting up your workspace</p>
        </div>

        {/* Progress bar */}
        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="absolute left-0 top-0 h-full bg-blue-600 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress percentage */}
        <div className="text-center text-sm text-gray-500">
          {progress}% Complete
        </div>

        {/* Loading stages */}
        <div className="space-y-6 mt-8">
          {loadingStages.map((stage, index) => (
            <StageItem key={index} stage={stage} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;