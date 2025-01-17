import React from 'react';
import { Link } from "react-router-dom";
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';
import useIsDesktop from '../../hooks/useIsDesktop';


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


const SignupSupplier = () => {
  const isDesktop = useIsDesktop();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic
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
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg">
          <p className="text-sm text-yellow-700">
            Our supplier dashboard is coming soon! Sign up now to join our waitlist and be notified when we launch.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-8 text-gray-900">Register Your Business</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Company name"
              id="company-name"
              type="text"
              placeholder="Enter company name"
              required
            />
            <FormInput
              label="Registration number"
              id="registration-number"
              type="text"
              placeholder="Enter registration number"
              required
            />
          </div>

          <FormInput
            label="Business email"
            id="business-email"
            type="email"
            placeholder="your@company.com"
            required
          />

          <FormSelect
            label="Business type"
            id="business-type"
            options={[
              { value: "", label: "Select business type" },
              { value: "manufacturer", label: "Manufacturer" },
              { value: "wholesaler", label: "Wholesaler" },
              { value: "distributor", label: "Distributor" },
              { value: "other", label: "Other" }
            ]}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Contact person"
              id="contact-person"
              type="text"
              placeholder="Enter full name"
              required
            />
            <FormInput
              label="Contact number"
              id="contact-number"
              type="tel"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="newsletter"
              className="mt-1.5 h-4 w-4 rounded border-gray-300 text-[#005EFF] 
                      focus:ring-[#005EFF] transition-colors duration-200"
              required
            />
            <label htmlFor="newsletter" className="text-sm text-gray-600">
              I agree to receive updates about Zesty's supplier platform launch and other relevant information
            </label>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-[#005EFF] text-white rounded-lg font-medium
                    transition-colors duration-200 hover:bg-blue-700
                    flex items-center justify-center space-x-2"
          >
            <span>JOIN WAITLIST</span>
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

export default SignupSupplier;