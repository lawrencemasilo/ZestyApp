import React, { useState } from 'react';
import { ChevronRight, Building2, FileCheck, CreditCard, X } from 'lucide-react';

const MobileBusinessOnboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    business_name: '',
    industry: '',
    registration_number: '',
    tax_id: '',
    monthly_revenue: '',
    address: {
      physical: '',
      operational: ''
    },
    contact_person: {
      name: '',
      email: '',
      phone: ''
    },
    bank_details: {
      account_number: '',
      bank_name: '',
      proof_of_banking: null
    }
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.business_name) newErrors.business_name = 'Business name is required';
    if (!formData.industry) newErrors.industry = 'Industry is required';
    if (!/^[A-Z0-9]{10}$/.test(formData.registration_number)) {
      newErrors.registration_number = 'Registration number must be 10 alphanumeric characters';
    }
    if (!/^[0-9]{9}$/.test(formData.tax_id)) {
      newErrors.tax_id = 'Tax ID must be 9 digits';
    }
    if (!formData.monthly_revenue || formData.monthly_revenue <= 0) {
      newErrors.monthly_revenue = 'Monthly revenue must be positive';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(2);
    } catch (error) {
      setErrors({ submit: 'Failed to submit business information' });
    }
    setLoading(false);
  };

  const industries = ['Retail', 'Manufacturing', 'Services', 'Technology', 'Healthcare'];

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Get Started</h1>
          <p className="text-gray-500">Complete your business profile to continue</p>
        </div>

        {/* Progress Tracker */}
        <div className="mb-8">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>
              1
            </div>
            <div className="flex-1 h-1 mx-4 bg-gray-200">
              <div className={`h-full ${step >= 2 ? 'bg-blue-600' : ''}`} />
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>
              2
            </div>
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {step === 1 ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  value={formData.business_name}
                  onChange={(e) => setFormData({...formData, business_name: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  maxLength={255}
                />
                {errors.business_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.business_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Industry</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
                {errors.industry && (
                  <p className="mt-1 text-sm text-red-600">{errors.industry}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registration Number
                </label>
                <input
                  type="text"
                  value={formData.registration_number}
                  onChange={(e) => setFormData({...formData, registration_number: e.target.value.toUpperCase()})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  maxLength={10}
                />
                {errors.registration_number && (
                  <p className="mt-1 text-sm text-red-600">{errors.registration_number}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tax ID
                </label>
                <input
                  type="text"
                  value={formData.tax_id}
                  onChange={(e) => setFormData({...formData, tax_id: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  maxLength={9}
                />
                {errors.tax_id && (
                  <p className="mt-1 text-sm text-red-600">{errors.tax_id}</p>
                )}
              </div>

              <button
                onClick={() => {
                  if (validateStep1()) handleSubmit();
                }}
                disabled={loading}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                         transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Continue'}
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Business Verified!</h2>
              <p className="text-gray-500 mb-6">Your business information has been verified successfully</p>
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileBusinessOnboarding;