import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { 
  CircleArrowLeft, 
  CircleArrowRight, 
  AlertTriangle, 
  Eye, 
  EyeOff, 
  RefreshCcw 
} from 'lucide-react';
import axios from '../../api/axios';
import useIsDesktop from '../../hooks/useIsDesktop';

const generateStrongPassword = () => {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  const getRandomChar = (chars) => chars[Math.floor(Math.random() * chars.length)];
  
  // Ensure at least one of each required character type
  let password = [
    getRandomChar(uppercase),
    getRandomChar(lowercase),
    getRandomChar(numbers),
    getRandomChar(symbols)
  ];
  
  // Fill remaining length with mix of characters
  const allChars = uppercase + lowercase + numbers + symbols;
  while (password.length < 12) {
    password.push(getRandomChar(allChars));
  }
  
  // Shuffle the password
  return password.sort(() => Math.random() - 0.5).join('');
};

const FormInput = ({ 
  label, 
  id, 
  error, 
  type, 
  showPassword, 
  onToggleVisibility, 
  passwordGenerator,
  ...props 
}) => {
  const isPasswordField = type === 'password';
  
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5 flex justify-between">
        <span>{label}</span>
        {isPasswordField && passwordGenerator && (
          <button 
            type="button" 
            onClick={passwordGenerator}
            className="text-xs text-[#005EFF] hover:underline flex items-center"
          >
            <RefreshCcw size={12} className="mr-1" /> Generate
          </button>
        )}
      </label>
      <div className="relative">
        <input
          id={id}
          type={isPasswordField && !showPassword ? 'password' : 'text'}
          className={`w-full h-11 px-4 rounded-lg border-2 
            ${error 
              ? 'border-red-500 focus:border-red-700 focus:ring-red-500' 
              : 'border-gray-200 focus:border-[#005EFF] focus:ring-[#005EFF]'
            } 
            ${isPasswordField ? 'pr-12' : ''}
            transition-colors duration-200`}
          {...props}
        />
        {isPasswordField && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button 
              type="button" 
              onClick={onToggleVisibility}
              className="text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

const FormSelect = ({ label, id, options, error, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
      {label}
    </label>
    <select
      id={id}
      className={`w-full h-11 px-4 rounded-lg border-2 
        ${error 
          ? 'border-red-500 focus:border-red-700 focus:ring-red-500' 
          : 'border-gray-200 focus:border-[#005EFF] focus:ring-[#005EFF]'
        } 
        transition-colors duration-200`}
      {...props}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export const SignupSme = () => {
  const [email, setEmail] = useState('');
  const [firstPassword, setFirstPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [province, setProvince] = useState('');
  const [phoneCode, setPhoneCode] = useState('+27');

  // New state for password visibility
  const [showFirstPassword, setShowFirstPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState(null);
  const isDesktop = useIsDesktop();

  // Password generation method
  const handleGeneratePassword = () => {
    const newPassword = generateStrongPassword();
    setFirstPassword(newPassword);
    setConfirmPassword(newPassword);
  };

  const validateForm = () => {
    const newErrors = {};

    // First name validation
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last name validation
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    // Phone validation
    const phoneRegex = /^\d{9,10}$/;
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = 'Invalid phone number (9-10 digits)';
    }

    // Country validation
    if (!country) {
      newErrors.country = 'Country is required';
    }

    // Province validation
    if (!province) {
      newErrors.province = 'Province is required';
    }

    // Updated password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':",.<>\/?]).{8,}$/;
    if (!firstPassword.trim()) {
      newErrors.firstPassword = 'Password is required';
    } else if (!passwordRegex.test(firstPassword)) {
      newErrors.firstPassword = 
      'Password must: - Be at least 8 characters long\n - Include uppercase letter\n - Include lowercase letter\n - Include number\n - Include special character';
    }

    // Confirm password validation
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (firstPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setGlobalError(null);

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('/auth/register', {
        email,
        password: firstPassword,
        firstName,
        lastName,
        phone: `${phoneCode}${phone}`,
        country,
        province,
      });

      navigate('/login', { 
        state: { 
          message: 'Registration successful! Please log in.' 
        } 
      });
    } catch (err) {
      console.error(err);
      
      if (err.response) {
        // Server responded with an error
        const errorMessage = err.response.data.message || 
          'Registration failed. Please try again.';
        setGlobalError(errorMessage);
      } else if (err.request) {
        // Request made but no response received
        setGlobalError('No response from server. Please check your connection.');
      } else {
        // Something else went wrong
        setGlobalError('An unexpected error occurred. Please try again later.');
      }
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
            <h2 className="text-2xl font-bold mb-8 text-gray-900">Let's get started</h2>
            
            {globalError && (
              <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded relative mb-6 flex items-center">
                <AlertTriangle className="mr-3 text-red-500" size={24} />
                <span>{globalError}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="First name"
                  id="first-name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter first name"
                  error={errors.firstName}
                />
                <FormInput
                  label="Last name"
                  id="last-name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter last name"
                  error={errors.lastName}
                />
              </div>

              <FormInput
                label="Email address"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                error={errors.email}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormSelect
                  label="Country of residence"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  error={errors.country}
                  options={[
                    { value: "", label: "Select country" },
                    { value: "ZA", label: "South Africa" },
                    { value: "NA", label: "Namibia" },
                    { value: "BW", label: "Botswana" },
                    { value: "LS", label: "Lesotho" },
                    { value: "SZ", label: "Eswatini" }
                  ]}
                />
                <FormSelect
                  label="Province"
                  id="province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  error={errors.province}
                  options={[
                    { value: "", label: "Select province" },
                    { value: "GP", label: "Gauteng" },
                    { value: "KZN", label: "KwaZulu-Natal" },
                    { value: "WC", label: "Western Cape" },
                    { value: "NC", label: "Northern Cape" },
                    { value: "NW", label: "North West" },
                    { value: "EC", label: "Eastern Cape" },
                    { value: "L", label: "Limpopo" },
                    { value: "MP", label: "Mpumalanga" },
                    { value: "FS", label: "Free State" },
                  ]}
                />
              </div>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4 md:col-span-3">
                  <FormInput
                    label="Code"
                    id="code"
                    type="text"
                    value={phoneCode}
                    onChange={(e) => setPhoneCode(e.target.value)}
                    placeholder="+27"
                  />
                </div>
                <div className="col-span-8 md:col-span-9">
                  <FormInput
                    label="Phone number"
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    error={errors.phone}
                  />
                </div>
              </div>

              <FormInput
                label="Password"
                id="password"
                type="password"
                value={firstPassword}
                onChange={(e) => setFirstPassword(e.target.value)}
                placeholder="Create a password"
                error={errors.firstPassword}
                showPassword={showFirstPassword}
                onToggleVisibility={() => setShowFirstPassword(!showFirstPassword)}
                passwordGenerator={handleGeneratePassword}
              />

              <FormInput
                label="Confirm Password"
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                error={errors.confirmPassword}
                showPassword={showConfirmPassword}
                onToggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
              />

              <button
                type="submit"
                className="w-full h-12 bg-[#005EFF] text-white rounded-lg font-medium
                        transition-colors duration-200 hover:bg-blue-700
                        flex items-center justify-center space-x-2"
              >
                <span>GET STARTED</span>
                <CircleArrowRight size={20} />
              </button>
            </form>
            <p className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-[#005EFF] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};