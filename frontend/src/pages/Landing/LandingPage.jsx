import React from "react";

const LandingPage = () => {
  return (
    <div className="bg-white text-gray-900">
      {/* Header */}
      <header className="bg-[#005EFF] text-white py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">BrandName</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#features" className="hover:underline">Features</a></li>
              <li><a href="#about" className="hover:underline">About</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-[#005EFF] text-white h-screen flex flex-col justify-center items-center text-center">
        <h2 className="text-5xl font-extrabold mb-4">Empower Your Workflow</h2>
        <p className="text-lg mb-6">Seamlessly integrate tools and solutions for success.</p>
        <a
          href="#features"
          className="bg-white text-[#005EFF] font-bold py-3 px-6 rounded shadow hover:bg-gray-100"
        >
          Learn More
        </a>
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1440 320"
            className="fill-current text-white"
          >
            <path d="M0,192L1440,64L1440,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12">Our Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded shadow text-center">
              <div className="text-[#005EFF] text-4xl mb-4">🎯</div>
              <h4 className="text-xl font-bold mb-2">Feature 1</h4>
              <p>Details about the first amazing feature go here.</p>
            </div>
            <div className="p-6 bg-white rounded shadow text-center">
              <div className="text-[#005EFF] text-4xl mb-4">⚙️</div>
              <h4 className="text-xl font-bold mb-2">Feature 2</h4>
              <p>Details about the second amazing feature go here.</p>
            </div>
            <div className="p-6 bg-white rounded shadow text-center">
              <div className="text-[#005EFF] text-4xl mb-4">🚀</div>
              <h4 className="text-xl font-bold mb-2">Feature 3</h4>
              <p>Details about the third amazing feature go here.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-bold mb-8">What Our Users Say</h3>
          <blockquote className="italic text-gray-700 max-w-xl mx-auto">
            "This product revolutionized the way we work! The features are
            incredible, and the support is top-notch."
          </blockquote>
          <p className="mt-4 text-[#005EFF] font-bold">- Happy Customer</p>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 bg-[#005EFF] text-white text-center">
        <h3 className="text-4xl font-bold mb-4">Ready to Transform?</h3>
        <p className="text-lg mb-6">Sign up now and take the first step toward your success.</p>
        <a
          href="#contact"
          className="bg-white text-[#005EFF] font-bold py-3 px-6 rounded shadow hover:bg-gray-100"
        >
          Get Started
        </a>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} BrandName. All rights reserved.</p>
          <nav className="mt-4">
            <ul className="flex justify-center space-x-6">
              <li><a href="#features" className="hover:underline">Features</a></li>
              <li><a href="#about" className="hover:underline">About</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
