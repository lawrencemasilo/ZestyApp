import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { CircleArrowLeft } from 'lucide-react';
import axios from '../../api/axios';

const FormInput = ({ label, id, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
      {label}
    </label>
    <input
      id={id}
      className="w-full h-11 px-4 rounded-lg border-2 border-gray-200 
                 focus:border-[#005EFF] focus:ring-1 focus:ring-[#005EFF] 
                 transition-colors duration-200"
      {...props}
    />
  </div>
);

const FormSelect = ({ label, id, options, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
      {label}
    </label>
    <select
      id={id}
      className="w-full h-11 px-4 rounded-lg border-2 border-gray-200 
                 focus:border-[#005EFF] focus:ring-1 focus:ring-[#005EFF] 
                 transition-colors duration-200"
      {...props}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
  
    try {
      const response = await axios.post('/auth/login', { email, password });
      const token = response.data.token; 

      // Save the token in localStorage
      localStorage.setItem('jwtToken', token);
      navigate("/loading");
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <>
     <div className="min-h-screen w-full flex flex-col lg:flex-row font-sans">
        {/* Left Column */}
        <div className="bg-[#005EFF] text-white lg:w-2/5 p-6 lg:p-12 flex flex-col">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">Zesty</h1>
          </div>
          
          <div className="flex-grow flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Start Building Your Future with Zesty
            </h1>
            <p className="text-lg text-blue-100 mb-8">
            Are you a small-to-medium enterprise looking to access flexible financing solutions? Let's get you started with a few details.
            </p>
            
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              label="Email address"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              required
            />

            <FormInput
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
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
              className="w-full h-12 bg-[#005EFF] text-white rounded-lg font-medium
                      transition-colors duration-200 hover:bg-blue-700
                      flex items-center justify-center"
            >
              Sign in
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

