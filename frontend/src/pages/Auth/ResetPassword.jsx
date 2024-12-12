import React, { useState, useEffect } from 'react';
import { ArrowLeft, Eye, EyeOff, Lock, Check, X, Wand2 } from 'lucide-react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from '../../api/axios';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [showSuggestion, setShowSuggestion] = useState(false);

  // Get token from URL
  //const { token } = useParams();
  //const [searchParams] = useSearchParams();
    //const token = searchParams.get('token');
  const { token } = useParams();
  console.log(token);

  useEffect(() => {
    if (!token) {
      setStatus({
        type: 'error',
        message: 'Invalid or expired reset link. Please request a new password reset.'
      });
    }
  }, [token]);

  // Password validation criteria remains the same...
  const passwordCriteria = [
    {
      label: 'At least 8 characters',
      test: (password) => password.length >= 8,
    },
    {
      label: 'Contains uppercase letter',
      test: (password) => /[A-Z]/.test(password),
    },
    {
      label: 'Contains lowercase letter',
      test: (password) => /[a-z]/.test(password),
    },
    {
      label: 'Contains number',
      test: (password) => /[0-9]/.test(password),
    },
    {
      label: 'Contains special character',
      test: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all criteria
    const isValidPassword = passwordCriteria.every(criteria => 
      criteria.test(formData.password)
    );

    if (!isValidPassword) {
      setStatus({
        type: 'error',
        message: 'Please ensure your password meets all requirements'
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setStatus({
        type: 'error',
        message: 'Passwords do not match'
      });
      return;
    }

    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      
      const response = await axios.post(`/auth/reset-password/${token}`, { 
        token: token, 
        newPassword: formData.password 
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      //const data = await response.json();

      if (!response.ok) {
        throw new Error(response.message || 'Failed to reset password');
      }
      
      setStatus({
        type: 'success',
        message: 'Password has been successfully reset'
      });
      
      // Redirect to login after successful reset
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate password functions remain the same...
  const generateStrongPassword = () => {
    const length = 16;
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const all = uppercase + lowercase + numbers + symbols;
    
    let password = '';
    password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += symbols.charAt(Math.floor(Math.random() * symbols.length));
    
    for (let i = password.length; i < length; i++) {
      password += all.charAt(Math.floor(Math.random() * all.length));
    }
    
    return password.split('').sort(() => Math.random() - 0.5).join('');
  };

  const handleSuggestPassword = () => {
    const suggestedPassword = generateStrongPassword();
    setFormData(prev => ({
      ...prev,
      password: suggestedPassword,
      confirmPassword: suggestedPassword
    }));
    setShowPassword(true);
    setShowConfirmPassword(true);
    setShowSuggestion(false);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePasswordFocus = () => {
    setShowSuggestion(true);
  };

  // Rest of the JSX remains the same...
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-2">Zesty</h1>
        
        <div className="mb-8">
          <Link 
            to="/login" 
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </Link>
        </div>

        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Reset Password
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Please enter your new password below
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={handlePasswordFocus}
                  className="appearance-none block w-full pl-10 pr-20 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    type="button"
                    className="pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              {showSuggestion && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <button
                    type="button"
                    onClick={handleSuggestPassword}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    Use suggested password
                  </button>
                </div>
              )}
            </div>

            {/* Confirm Password field */}
            <div>
              <label 
                htmlFor="confirmPassword" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Password requirements */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Password requirements:</p>
              <div className="space-y-2">
                {passwordCriteria.map((criteria, index) => (
                  <div 
                    key={index}
                    className="flex items-center text-sm"
                  >
                    {criteria.test(formData.password) ? (
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                    ) : (
                      <X className="w-4 h-4 text-gray-300 mr-2" />
                    )}
                    <span className={criteria.test(formData.password) ? 'text-green-700' : 'text-gray-500'}>
                      {criteria.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status messages */}
            {status.message && (
              <div className={`p-3 rounded-lg text-sm ${
                status.type === 'error' 
                  ? 'bg-red-50 text-red-700' 
                  : 'bg-green-50 text-green-700'
              }`}>
                {status.message}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading || !token}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;