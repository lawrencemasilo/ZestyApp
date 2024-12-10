import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Mail, MapPin, Menu, X, ArrowRight, CheckCircle2, Smartphone, Store, CreditCard, Clock, Shield, BarChart, DollarSign, Building, Truck, ShoppingCart } from 'lucide-react';
import posman from "../../assets/images/posman.jpg";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('sme');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    consent: false
  });

  const smeFeatures = [
    {
      title: "Buy Now, Pay Later",
      description: "Get instant access to inventory financing with flexible BNPL terms",
      icon: ShoppingCart
    },
    {
      title: "Quick Credit Decisions",
      description: "Receive credit line approval within 24 hours of application",
      icon: Clock
    },
    {
      title: "Flexible Repayment",
      description: "Choose payment terms that match your business cash flow",
      icon: BarChart
    }
  ];

  const supplierFeatures = [
    {
      title: "Instant Payments",
      description: "Receive upfront payments while offering flexible terms to buyers",
      icon: DollarSign
    },
    {
      title: "Seamless Integration",
      description: "Easy-to-integrate API that works with your existing systems",
      icon: Smartphone
    },
    {
      title: "Risk-Free Sales",
      description: "Grow your business without worrying about payment collection",
      icon: Shield
    }
  ];

  const howItWorksSME = [
    {
      title: "Quick Application",
      description: "Complete our simple online/USSD application and connect your business accounts",
      icon: Store
    },
    {
      title: "Shop with Credit",
      description: "Use your approved credit line to purchase inventory from partnered suppliers",
      icon: ShoppingCart
    },
    {
      title: "Flexible Repayment",
      description: "Pay back on terms that work for your business cycle",
      icon: CreditCard
    }
  ];

  const howItWorksSupplier = [
    {
      title: "Easy Integration",
      description: "Connect your systems with our API for seamless order processing",
      icon: Smartphone
    },
    {
      title: "Instant Payments",
      description: "Receive payments immediately when SME buyers place orders",
      icon: DollarSign
    },
    {
      title: "Grow Sales",
      description: "Attract more buyers with flexible payment terms, risk-free",
      icon: Building
    }
  ];

  return (
    <div className="min-h-screen font-[Inter] overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-[#005EFF]">ZESTY</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-[#005EFF]">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-[#005EFF]">How it Works</a>
              <a href="#contact" className="text-gray-700 hover:text-[#005EFF]">Contact</a>
              <Link to="/login" className="text-gray-700 hover:text-[#005EFF]">Login</Link>
              <Link
                to="/account-type"
                className="bg-[#005EFF] text-white px-4 py-2 rounded-lg hover:bg-[#0040FF] transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-[#005EFF]"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-[#005EFF]">Features</a>
              <a href="#how-it-works" className="block px-3 py-2 text-gray-700 hover:text-[#005EFF]">How it Works</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-[#005EFF]">Contact</a>
              <Link to="/login" className="block px-3 py-2 text-gray-700 hover:text-[#005EFF]">Login</Link>
              <Link
                to="/account-type"
                className="block px-3 py-2 bg-[#005EFF] text-white rounded-lg hover:bg-[#0040FF] transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
      
      {/* Hero Section */}
      <div className="relative bg-[#005EFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Connecting Business Growth with Smart Financing
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Empowering SMEs with inventory financing and helping suppliers grow with instant payments
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/account-type"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-[#005EFF] bg-white hover:bg-gray-100 transition-colors"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-lg text-white hover:bg-white/10 transition-colors"
                >
                  Contact Sales
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src={posman}
                alt="Business financing"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full">
          <svg className="w-full h-16 fill-white" preserveAspectRatio="none" viewBox="0 0 1440 48">
            <path d="M0,48 L1440,48 L1440,0 C1440,0 1120,48 720,48 C320,48 0,0 0,0 L0,48 Z"></path>
          </svg>
        </div>
      </div>

      {/* Features Section with Tabs */}
      <div id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Solutions for Everyone
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your path to growth with Zesty
            </p>
            
            {/* Tab Switcher */}
            <div className="flex justify-center mt-8 mb-12">
              <div className="inline-flex rounded-lg border border-gray-200 p-1">
                <button
                  onClick={() => setActiveTab('sme')}
                  className={`px-4 py-2 rounded-md ${
                    activeTab === 'sme'
                      ? 'bg-[#005EFF] text-white'
                      : 'text-gray-600 hover:text-[#005EFF]'
                  }`}
                >
                  For SMEs
                </button>
                <button
                  onClick={() => setActiveTab('supplier')}
                  className={`px-4 py-2 rounded-md ${
                    activeTab === 'supplier'
                      ? 'bg-[#005EFF] text-white'
                      : 'text-gray-600 hover:text-[#005EFF]'
                  }`}
                >
                  For Suppliers
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {(activeTab === 'sme' ? smeFeatures : supplierFeatures).map((feature, index) => (
              <div key={index} className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <feature.icon className="h-8 w-8 text-[#005EFF] mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section with Tabs */}
      <div id="how-it-works" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Zesty Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to get started with Zesty
            </p>
            
            {/* Tab Switcher */}
            <div className="flex justify-center mt-8 mb-12">
              <div className="inline-flex rounded-lg border border-gray-200 p-1">
                <button
                  onClick={() => setActiveTab('sme')}
                  className={`px-4 py-2 rounded-md ${
                    activeTab === 'sme'
                      ? 'bg-[#005EFF] text-white'
                      : 'text-gray-600 hover:text-[#005EFF]'
                  }`}
                >
                  For SMEs
                </button>
                <button
                  onClick={() => setActiveTab('supplier')}
                  className={`px-4 py-2 rounded-md ${
                    activeTab === 'supplier'
                      ? 'bg-[#005EFF] text-white'
                      : 'text-gray-600 hover:text-[#005EFF]'
                  }`}
                >
                  For Suppliers
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {(activeTab === 'sme' ? howItWorksSME : howItWorksSupplier).map((step, index) => (
              <div key={index} className="relative p-6 bg-white rounded-lg shadow-sm">
                <div className="absolute -top-4 left-6 w-8 h-8 bg-[#005EFF] text-white rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                <step.icon className="h-8 w-8 text-[#005EFF] mb-4 mt-4" />
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Whether you're an SME looking for inventory financing or a supplier wanting to offer flexible terms, we're here to help.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-[#005EFF] mr-3" />
                  <span>zesty@zestytechnologies.co.za</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-[#005EFF] mr-3" />
                  <span>Johannesburg, South Africa</span>
                </div>
              </div>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-[#005EFF] focus:border-[#005EFF]"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-[#005EFF] focus:border-[#005EFF]"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-[#005EFF] focus:border-[#005EFF]"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg focus:ring-[#005EFF] focus:border-[#005EFF]"
                  rows="4"
                  placeholder="How can we help?"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="consent"
                  className="mr-2"
                  checked={formData.consent}
                  onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                />
                <label htmlFor="consent" className="text-sm text-gray-600">
                  I agree to receive communications from Zesty
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-[#005EFF] text-white px-6 py-3 rounded-lg hover:bg-[#0040FF] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ZESTY</h3>
              <p className="text-gray-400">
                Empowering SMEs with innovative financing solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white">How it Works</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Johannesburg, South Africa</li>
                <li>zesty@zestytechnologies.co.za</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Zesty. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;