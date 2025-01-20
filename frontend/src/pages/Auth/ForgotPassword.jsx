import React, { useState } from 'react';
import { ArrowLeft, Mail, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatus({
        type: 'error',
        message: 'Please enter your email address',
      });
      return;
    }

    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await axios.post('/auth/forgot-password', { email });

      setStatus({
        type: 'success',
        message: response.data.message || 'Password reset instructions have been sent to your email',
      });
      setEmail('');
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.error || 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-3xl font-bold text-[#005EFF] text-center mb-2">Zesty</h1>
        </Link>

        {/* Back to login link */}
        <div className="mb-8">
          <Link
            to="/login"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </Link>
        </div>

        {/* Main card */}
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Forgot Password?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            No worries! Enter your email address and we'll send you instructions to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Status messages */}
            {status.message && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  status.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                }`}
              >
                {status.message}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#005EFF] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Reset Instructions'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <span className="text-sm text-gray-500">
            Don't have an account?{' '}
            <Link
              to="/account-type"
              className="font-medium text-[#005EFF] hover:text-blue-500"
            >
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
