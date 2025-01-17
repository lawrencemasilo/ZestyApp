import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';
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

/*{
  "email": "jamesdon@example.com",
  "password": "james123",
  "firstName": "James",
  "lastName": "Don",
  "phone": "1112345678"
}*/


export const SignupSme = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstPassword, setFirstPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);



  const handleConfirmPassword = (value) => {
    if (firstPassword === value) {
      setPassword(value);
      setConfirmPassword(value);
    } else {
      console.log("Password don't match");
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await axios.post('/auth/register', {
        email,
        password,
        firstName,
        lastName,
        phone,
      });
  
      console.log('Registration successful:', response.data);
  
      await axios.post('/email/send-email', {
        to: email,
        subject: 'Welcome to Our Service',
        text: `Hi ${firstName}, welcome to our platform!`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f9;
                margin: 0;
                padding: 0;
                color: #333;
              }
              .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border: 1px solid #ddd;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              .email-header {
                background-color: #005EFF;
                color: #ffffff;
                text-align: center;
                padding: 20px;
              }
              .email-header h1 {
                margin: 0;
                font-size: 24px;
              }
              .email-body {
                padding: 20px;
              }
              .email-body p {
                line-height: 1.6;
              }
              .email-footer {
                background-color: #f4f4f9;
                text-align: center;
                padding: 10px;
                font-size: 12px;
                color: #666;
              }
              .email-footer a {
                color: #005EFF;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="email-header">
                <h1>Welcome to Zesty!</h1>
              </div>
              <div class="email-body">
                <p>Hi <strong>${firstName}</strong>,</p>
                <p>Welcome to our platform! We're excited to have you on board.</p>
                <p>
                  Our goal is to provide you with the best tools and services to make your experience exceptional.
                  If you have any questions, feel free to reply to this email or contact our support team.
                </p>
                <p>Enjoy exploring our platform!</p>
                <p>Warm regards,<br>The Zesty Team</p>
              </div>
              <div class="email-footer">
                <p>&copy; ${new Date().getFullYear()} Zesty. All rights reserved.</p>
                <p>
                  <a href="https://zestytechnologies.co.za">Visit our website</a> |
                  <a href="mailto:support@zestytechnologies.co.za">Contact Support</a>
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
      });
  
      console.log('Welcome email sent successfully.');
  
      navigate('/login');
    } catch (err) {
      console.error(err.message);
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
          
          
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Let's get started</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="First name"
                id="first-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                required
              />
              <FormInput
                label="Last name"
                id="last-name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                required
              />
            </div>

            <FormInput
              label="Email address"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormSelect
                label="Country of residence"
                id="country"
                options={[
                  { value: "", label: "Select country" },
                  { value: "ZA", label: "South Africa" },
                  { value: "NA", label: "Namibia" },
                  { value: "BW", label: "Botswana" },
                  { value: "LS", label: "Lesotho" },
                  { value: "SZ", label: "Eswatini" }
                ]}
                required
              />
              <FormSelect
                label="Province"
                id="province"
                options={[
                  { value: "", label: "Select province" },
                  { value: "GP", label: "Gauteng" },
                  { value: "KZN", label: "KwaZulu-Natal" },
                  { value: "WC", label: "Western Cape" },
                  // Add other provinces
                ]}
                required
              />
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4 md:col-span-3">
                <FormInput
                  label="Code"
                  id="code"
                  type="text"
                  placeholder="+27"
                  required
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
                  required
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
              required
            />

            <FormInput
              label="Confirm Password"
              id="confirm password"
              type="password"
              
              onChange={(e) => handleConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
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