import React from 'react';
import { X, CheckCircle, Zap, TrendingUp, ArrowRight } from 'lucide-react';

const WelcomePopup = ({ setOnClose }) => {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-[#005EFF]/10 to-[#005EFF]/5 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl border border-[#005EFF]/10 overflow-hidden max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 animate-fade-in">
                {/* Left Side - Illustration */}
                <div className="bg-[#005EFF]/5 p-8 flex flex-col justify-center items-center text-center relative">
                    <div className="absolute top-4 left-4 bg-[#005EFF]/10 p-2 rounded-full">
                        <TrendingUp className="w-5 h-5 text-[#005EFF]" strokeWidth={2} />
                    </div>
                    <div className="w-40 h-40 bg-[#005EFF]/20 rounded-full flex items-center justify-center mb-6 animate-slow-pulse">
                        <Zap className="w-20 h-20 text-[#005EFF]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-3xl font-bold text-[#005EFF] mb-4">Zesty</h3>
                    <p className="text-gray-600 font-medium text-lg">
                        Accelerate Business Potential
                    </p>
                </div>

                {/* Right Side - Content */}
                <div className="p-10 relative flex flex-col justify-center">
                    <button 
                        onClick={() => setOnClose(false)} 
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="space-y-7">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-800 mb-3">Welcome Aboard!</h2>
                            <p className="text-gray-600 text-base">
                                Your digital business acceleration starts now.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                "Lightning-Fast Verification",
                                "24-Hour Credit Assessment",
                                "Continuous Business Support"
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center space-x-3 group">
                                    <CheckCircle className="w-6 h-6 text-[#005EFF] group-hover:text-blue-700 transition-colors" />
                                    <span className="text-gray-700 group-hover:text-[#005EFF] transition-colors">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setOnClose(false)}
                            className="w-full py-4 bg-[#005EFF] text-white rounded-xl 
                            hover:bg-blue-700 transition-colors flex items-center 
                            justify-center space-x-3 group shadow-md hover:shadow-xl"
                        >
                            <span>Start Your Journey</span>
                            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomePopup;