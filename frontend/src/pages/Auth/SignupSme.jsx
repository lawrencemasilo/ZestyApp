import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';


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

export const SignupSme = () => {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Handle form submission
      navigate("/dashboard");
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
                placeholder="Enter first name"
                required
              />
              <FormInput
                label="Last name"
                id="last-name"
                type="text"
                placeholder="Enter last name"
                required
              />
            </div>

            <FormInput
              label="Email address"
              id="email"
              type="email"
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
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>

            <FormInput
              label="Password"
              id="password"
              type="password"
              placeholder="Create a password"
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