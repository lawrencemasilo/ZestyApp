import axios from '../../api/axios';
import React, { useEffect, useState, useRef } from 'react';
import { ChevronRight, Building2, FileCheck, AlertCircle, ArrowLeft, CheckCircle2, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const BusinessOnboarding = () => {
    const [user, setUser] = useState(null);
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
        },
        documents: {
            revenue_proof: null,
            tax_returns: null,
            bank_statements: null
        }
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const fileInputRefs = {
        revenue_proof: useRef(null),
        taxReturns: useRef(null),
        bank_statements: useRef(null),
        proof_of_banking: useRef(null),
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [parent, field] = name.includes('.') ? name.split('.') : [null, name];

        setFormData(prev => {
            if (parent) {
                return {
                    ...prev,
                    [parent]: {
                        ...prev[parent],
                        [field]: value
                    }
                };
            }
            return { ...prev, [field]: value };
        });
    };
    
    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const response = await axios.get("/auth/profile");
            const userData = response.data;
            setUser(userData);
          } catch (err) {
            console.error("Error fetching user profile:", err);
          }
        };
    
        fetchUserProfile();
      }, []);

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.business_name?.trim()) newErrors.business_name = 'Business name is required';
        if (!formData.industry) newErrors.industry = 'Industry is required';
        if (!/^[A-Z0-9]{10}$/.test(formData.registration_number)) {
            newErrors.registration_number = 'Registration number must be 10 alphanumeric characters';
        }
        if (!/^[0-9]{9}$/.test(formData.tax_id)) {
            newErrors.tax_id = 'Tax ID must be 9 digits';
        }
        if (!formData.monthly_revenue || parseInt(formData.monthly_revenue) <= 0) {
            newErrors.monthly_revenue = 'Monthly revenue must be positive';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
        if (!formData.address.physical?.trim()) newErrors['address.physical'] = 'Physical address is required';
        if (!formData.address.operational?.trim()) newErrors['address.operational'] = 'Operational address is required';
        if (!formData.contact_person.name?.trim()) newErrors['contact_person.name'] = 'Contact name is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact_person.email)) {
            newErrors['contact_person.email'] = 'Valid email is required';
        }
        if (!/^\+?\d{10,15}$/.test(formData.contact_person.phone)) {
            newErrors['contact_person.phone'] = 'Valid phone number is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        setLoading(true);
        setErrors({});
    
        try {
            if (step === 4) {  // Changed from step 3 to step 4
                // Destructure and prepare the individual fields
                const {
                    business_name,
                    industry,
                    registration_number,
                    tax_id,
                    monthly_revenue,
                    address,
                    contact_person,
                    bank_details,
                } = formData;
    
                const response = await axios.post(
                    `/sme/${user._id}`,
                    {
                        business_name,
                        industry,
                        registration_number,
                        tax_id,
                        monthly_revenue: parseInt(monthly_revenue, 10),
                        address: {
                            physical: address.physical,
                            operational: address.operational,
                        },
                        contact_person: {
                            name: contact_person.name,
                            email: contact_person.email,
                            phone: contact_person.phone,
                        },
                        bank_details: {
                            account_number: bank_details.account_number,
                            bank_name: bank_details.bank_name,
                        },
                        // Add document handling
                        
                    }
                );
                console.log("Response from backend (JSON):", response.data);
                
            }
    
            // Proceed to the next step on success
            setStep(step + 1);
        } catch (error) {
            console.error("Error submitting business information:", error);
    
            // Handle backend errors
            if (error.response && error.response.data) {
                setErrors({
                    submit: error.response.data.message || "Failed to submit business information",
                });
            } else {
                setErrors({ submit: "An unexpected error occurred" });
            }
        } finally {
            setLoading(false);
        }
    };

    // Add a new method for file upload validation
    const handleDocumentUpload = (e, documentType) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type and size
            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            const maxSize = 5 * 1024 * 1024; // 5MB
    
            if (!allowedTypes.includes(file.type)) {
                setErrors(prev => ({
                    ...prev,
                    [`documents.${documentType}`]: 'Invalid file type. Please upload PDF or image.'
                }));
                return;
            }
    
            if (file.size > maxSize) {
                setErrors(prev => ({
                    ...prev,
                    [`documents.${documentType}`]: 'File size exceeds 5MB limit.'
                }));
                return;
            }
    
            setFormData(prev => ({
                ...prev,
                documents: {
                    ...prev.documents,
                    [documentType]: file  // Use the passed documentType directly
                }
            }));
            setErrors(prev => {
                const { [`documents.${documentType}`]: _, ...rest } = prev;
                return rest;
            });
        }
    };

    // Modify renderFileUpload to handle multiple documents
    const renderDocumentUpload = (documentType, label) => {
        const file = formData.documents[documentType];
        return (
            <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                    {label}
                    <span className="text-gray-500 ml-1">(PDF or Image, max 5MB)</span>
                </label>
                <div 
                    onClick={() => {
                        if (fileInputRefs[documentType]?.current) {
                            fileInputRefs[documentType].current.click();
                        } else {
                            console.error(`Ref for ${documentType} is not initialized.`);
                        }
                    }}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer 
                        transition-all duration-300 
                        ${errors[`documents.${documentType}`] 
                            ? 'border-red-400 bg-red-50' 
                            : 'border-gray-300 hover:border-[#005EFF] hover:bg-blue-50'}`}
                >
                    <input
                        type="file"
                        ref={fileInputRefs[documentType]}
                        onChange={(e) => handleDocumentUpload(e, documentType)}
                        className="hidden"
                        accept="image/jpeg,image/png,application/pdf"
                    />
                    {file ? (
                        <div className="flex items-center justify-center gap-3">
                            <CheckCircle2 className="text-green-500 w-6 h-6" />
                            <span className="text-gray-700">{file.name}</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <Upload className="w-10 h-10 text-[#005EFF] mb-2" />
                            <p className="text-[#005EFF] hover:text-blue-800">
                                Click to upload document
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                Supported formats: PDF, JPEG, PNG
                            </p>
                        </div>
                    )}
                </div>
                {errors[`documents.${documentType}`] && (
                    <p className="text-sm text-red-500 pl-2">
                        {errors[`documents.${documentType}`]}
                    </p>
                )}
            </div>
        );
    };
    
    const handleFileUpload = (e, fileType) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type and size
            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!allowedTypes.includes(file.type)) {
                setErrors(prev => ({
                    ...prev,
                    [`${fileType}`]: 'Invalid file type. Please upload PDF or image.'
                }));
                return;
            }

            if (file.size > maxSize) {
                setErrors(prev => ({
                    ...prev,
                    [`${fileType}`]: 'File size exceeds 5MB limit.'
                }));
                return;
            }

            // Handle different file upload types
            if (fileType.startsWith('bank_details')) {
                setFormData(prev => ({
                    ...prev,
                    bank_details: {
                        ...prev.bank_details,
                        proof_of_banking: file
                    }
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    documents: {
                        ...prev.documents,
                        [fileType]: file
                    }
                }));
            }

            // Clear any existing errors for this file type
            setErrors(prev => {
                const { [`${fileType}`]: _, ...rest } = prev;
                return rest;
            });
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
            setErrors({});
        }
    };

    const renderInput = (name, label, error, props = {}) => (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">{label}</label>
            <input
                name={name}
                value={name.includes('.') 
                    ? formData[name.split('.')[0]][name.split('.')[1]] 
                    : formData[name]
                }
                onChange={handleChange}
                className={`w-full p-3 border-2 rounded-xl transition-all 
                    ${error 
                        ? 'border-red-400 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-[#005EFF]'} 
                    focus:outline-none focus:ring-2`}
                {...props}
            />
            {error && <p className="text-sm text-red-500 pl-2">{error}</p>}
        </div>
    );

    
    /*useEffect(() => {
        const handleVerified = async () => {
            try {              
                const response = await axios.patch(`/users/${user && user._id}`, {
                    verified: true,
                });
                console.log("Verification Response:", response.data);
            } catch (err) {
                console.error("Error during verification:", err.message);
            }
        };
    
        if (step === 4) {
            handleVerified();
        }
    }, [step]);*/
    

    const renderStep = () => {

        switch(step) {
            case 1:
                return (
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-gray-800">Business Details</h2>
                        <p className='text-red-600'>Disclaimer: This is a demo. Please enter only mock business data!</p>
                        <p className="text-gray-500 -mt-4">Tell us about your business</p>
                        
                        {renderInput('business_name', 'Business Name', errors.business_name, {
                            placeholder: 'Enter business name'
                        })}

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Industry</label>
                            <select
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                                className="w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:border-[#005EFF]"
                            >
                                <option value="">Select Industry</option>
                                {['Retail', 'Manufacturing', 'Services', 'Technology', 'Healthcare']
                                    .map(industry => (
                                        <option key={industry} value={industry}>{industry}</option>
                                    ))
                                }
                            </select>
                            {errors.industry && <p className="text-sm text-red-500 pl-2">{errors.industry}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {renderInput('registration_number', 'Registration Number', errors.registration_number, {
                                placeholder: 'ABCD123456',
                                maxLength: 10
                            })}

                            {renderInput('tax_id', 'Tax ID', errors.tax_id, {
                                placeholder: '123456789',
                                maxLength: 9
                            })}
                        </div>

                        {renderInput('monthly_revenue', 'Monthly Revenue', errors.monthly_revenue, {
                            type: 'number',
                            placeholder: 'Enter amount',
                            min: '0'
                        })}
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-gray-800">Business Location</h2>
                        <p className='text-red-600'>Disclaimer: This is a demo. Please enter only mock business data!</p>
                        <p className="text-gray-500 -mt-4">Provide your business addresses</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {renderInput('address.physical', 'Physical Address', errors['address.physical'], {
                                placeholder: 'Enter physical address'
                            })}

                            {renderInput('address.operational', 'Operational Address', errors['address.operational'], {
                                placeholder: 'Enter operational address'
                            })}
                        </div>

                        <div className="space-y-2">
                            {renderInput('contact_person.name', 'Contact Person Name', errors['contact_person.name'], {
                                placeholder: 'Full name'
                            })}

                            {renderInput('contact_person.email', 'Contact Email', errors['contact_person.email'], {
                                type: 'email',
                                placeholder: 'email@example.com'
                            })}

                            {renderInput('contact_person.phone', 'Contact Phone', errors['contact_person.phone'], {
                                placeholder: '+27123456789'
                            })}
                        </div>
                    </div>
                );

                case 3:  // Bank details step
                return (
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-gray-800">Bank Details</h2>
                        <p className='text-red-600'>Disclaimer: This is a demo. Please enter only mock business data!</p>
                        <p className="text-gray-500 -mt-4">Provide your banking information</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {renderInput('bank_details.account_number', 'Bank Account Number', null, {
                                placeholder: 'Enter account number'
                            })}

                            {renderInput('bank_details.bank_name', 'Bank Name', null, {
                                placeholder: 'Enter bank name'
                            })}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Proof of Banking
                                <span className="text-gray-500 ml-1">(PDF or Image, max 5MB)</span>
                            </label>
                            <div 
                                
                                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer 
                                    transition-all duration-300 
                                    ${errors['bank_details.proof_of_banking'] 
                                        ? 'border-red-400 bg-red-50' 
                                        : 'border-gray-300 hover:border-[#005EFF] hover:bg-blue-50'}`}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRefs.proof_of_banking}
                                    onChange={(e) => handleFileUpload(e, 'bank_details.proof_of_banking')}
                                    className="hidden"
                                    accept="image/jpeg,image/png,application/pdf"
                                />
                                {formData.bank_details.proof_of_banking ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <CheckCircle2 className="text-green-500 w-6 h-6" />
                                        <span className="text-gray-700">{formData.bank_details.proof_of_banking.name}</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <Upload className="w-10 h-10 text-[#005EFF] mb-2" />
                                        <p className="text-[#005EFF] hover:text-blue-800">
                                            Click to upload document
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Supported formats: PDF, JPEG, PNG
                                        </p>
                                    </div>
                                )}
                            </div>
                            {errors['bank_details.proof_of_banking'] && (
                                <p className="text-sm text-red-500 pl-2">
                                    {errors['bank_details.proof_of_banking']}
                                </p>
                            )}
                        </div>
                    </div>
                );

            case 4:  // New step for revenue documents
                return (
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-gray-800">Revenue Documents</h2>
                        <p className='text-red-600'>Disclaimer: This is a demo. Please enter only mock business data!</p>
                        <p className="text-gray-500 -mt-4">Upload financial documentation</p>

                        <div className="space-y-6">
                            {renderDocumentUpload('taxReturns', 'Bank statement')}
                            {renderDocumentUpload('taxReturns', 'Additional Documents')}
                        </div>
                    </div>
                );

            case 5:  // Updated final verification step
                return (
                    <div className="text-center py-8 space-y-2">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileCheck className="w-12 h-12 text-green-500" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">Verification Successful!</h2>
                        <p className="text-gray-600 max-w-md mx-auto">
                            Your business has been verified. You can now access all features 
                            and start your journey with us.
                        </p>
                        <Link to='/dashboard'>
                          <button 
                              className="px-10 py-4 bg-[#005EFF] text-white rounded-xl 
                              hover:bg-blue-700 transition-colors inline-flex items-center gap-3 
                              shadow-lg hover:shadow-xl mx-auto"
                          >
                              Continue to Dashboard
                              <ChevronRight className="w-5 h-5" />
                          </button>
                        </Link>
                    </div>
                );
        }
    };

    // Modify renderProgressIndicator to reflect new step count
    const renderProgressIndicator = () => (
        <div className="flex items-center justify-center mb-6 space-x-4">
            {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                    <div 
                        className={`w-12 h-1.5 rounded-full transition-all 
                            ${step >= stepNumber ? 'bg-[#005EFF]' : 'bg-gray-300'}`}
                    />
                    
                </div>
            ))}
        </div>
    );

    // Modify the header to reflect updated step count
    return (
        <div className="flex w-full min-h-screen h-screen bg-gray-50 justify-center items-center p-4 py-6 overflow-y-auto rounded-3xl">
            <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl overflow-y-auto">
                <div className="w-full bg-gradient-to-r from-[#005EFF] to-blue-600 text-white p-6 px-10 flex items-center justify-between rounded-t-3xl">
                    <div>
                        <h1 className="text-2xl font-bold">Business Verification</h1>
                        <p className="text-white text-opacity-80">Step {step} of 5</p>
                    </div>
                    <Building2 className="w-10 h-10 text-white opacity-80" />
                </div>

                <div className="px-10 mt-2">
                    {step < 5 && renderProgressIndicator()}

                    {errors.submit && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2 mb-6 shadow-sm">
                            <AlertCircle className="h-5 w-5" />
                            <p>{errors.submit}</p>
                        </div>
                    )}

                    {renderStep()}

                    {step < 5 && (
                        <div className="mt-5 flex justify-between mb-5">
                            {step > 1 && (
                                <button
                                    onClick={handleBack}
                                    className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl 
                                    transition-colors inline-flex items-center gap-2"
                                >
                                    <ArrowLeft className="w-5 h-5" /> Back
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    if (step === 1 && validateStep1()) handleSubmit();
                                    else if (step === 2 && validateStep2()) handleSubmit();
                                    else if (step === 3 || step === 4) handleSubmit();
                                }}
                                disabled={loading}
                                className="ml-auto px-8 py-3 bg-gradient-to-r from-[#005EFF] to-blue-600 
                                text-white rounded-xl hover:opacity-90 transition-all 
                                disabled:opacity-50 disabled:cursor-not-allowed 
                                flex items-center gap-2 shadow-lg hover:shadow-xl"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        {step === 4 ? 'Complete Verification' : 'Continue'}
                                        <ChevronRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BusinessOnboarding;