import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { CircleArrowLeft, AlertCircle } from 'lucide-react';
import axios from '../../api/axios';
import useIsDesktop from '../../hooks/useIsDesktop';

const FormInput = ({ label, id, error, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
      {label}
    </label>
    <input
      id={id}
      className={`w-full h-11 px-4 rounded-lg border-2 
        ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#005EFF]'}
        focus:ring-1 focus:ring-[#005EFF] 
        transition-colors duration-200`}
      {...props}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });

  const navigate = useNavigate();
  const isDesktop = useIsDesktop();

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
      general: ''
    };

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Reset previous errors
    setErrors({
      email: '',
      password: '',
      general: ''
    });

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
  
    try {
      const response = await axios.post('/auth/login', { email, password });
      const token = response.data.token; 

      // Save the token in localStorage
      localStorage.setItem('jwtToken', token);
      navigate("/loading");
    } catch (err) {
      // Handle different types of errors
      if (err.response) {
        // The request was made and the server responded with a status code
        switch (err.response.status) {
          case 401:
            setErrors(prev => ({
              ...prev, 
              general: 'Invalid email or password. Please try again.'
            }));
            break;
          case 403:
            setErrors(prev => ({
              ...prev, 
              general: 'Account is locked. Please contact support.'
            }));
            break;
          case 500:
            setErrors(prev => ({
              ...prev, 
              general: 'Server error. Please try again later.'
            }));
            break;
          default:
            setErrors(prev => ({
              ...prev, 
              general: 'An unexpected error occurred. Please try again.'
            }));
        }
      } else if (err.request) {
        // The request was made but no response was received
        setErrors(prev => ({
          ...prev, 
          general: 'No response from server. Check your internet connection.'
        }));
      } else {
        // Something happened in setting up the request
        setErrors(prev => ({
          ...prev, 
          general: 'Error setting up the request. Please try again.'
        }));
      }
      
      console.error('Login error:', err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
     <div className="min-h-screen w-full flex flex-col lg:flex-row font-sans">
        {/* Left Column */}
        <div className="bg-[#005EFF] text-white lg:w-2/5 p-6 lg:p-12 flex flex-col">
          <div className="mb-8">
            <Link to="/">
              <h1 className="text-2xl md:text-3xl font-bold">Zesty</h1>
            </Link>
          </div>
          
          <div className="flex-grow flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Start Building Your Future with Zesty
            </h1>
            {isDesktop && <p className="text-lg text-blue-100 mb-8">
            Are you a small-to-medium enterprise looking to access flexible financing solutions? Let's get you started with a few details.
            </p>}
            
              <Link 
                to="/account-type"
                className="inline-flex items-center justify-center w-32 px-4 py-2 border border-white/80 rounded-lg 
                        transition-colors duration-200 hover:bg-white/10"
              >
                <CircleArrowLeft className="mr-2" size={20} />
                <span>Back</span>
              </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-[#FAFBFC] lg:w-3/5 p-6 lg:p-12 flex flex-col justify-center">
          <div className="max-w-2xl mx-auto w-full">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Sign in to your account</h2>

          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="text-red-500 mr-3" size={24} />
              <p className="text-red-700 text-sm">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              label="Email address"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              error={errors.email}
              required
            />

            <FormInput
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              error={errors.password}
              required
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#005EFF] 
                          focus:ring-[#005EFF] transition-colors duration-200"
                />
                <label htmlFor="remember-me" className="text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-sm text-[#005EFF] hover:underline transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full h-12 text-white rounded-lg font-medium
                      transition-colors duration-200 
                      flex items-center justify-center
                      ${isLoading 
                        ? 'bg-blue-400 cursor-not-allowed' 
                        : 'bg-[#005EFF] hover:bg-blue-700'}`}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/account-type" className="text-[#005EFF] hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
        </div>
      </div>
    </>
  );
};

export default Login;


