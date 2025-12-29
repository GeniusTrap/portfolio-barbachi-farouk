import React, { useState } from 'react';
import { assets } from '../assets/assets';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('home'); 

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    setActiveItem(targetId);
    closeMobileMenu();
    
    const element = document.getElementById(targetId);
    if (element) {
      const navbarHeight = 64; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Me' },
    { id: 'process', label: 'Process' },
    { id: 'portfolio', label: 'Portfolio' },
  ];

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            <div className="flex-shrink-0">
              <button 
                onClick={(e) => handleSmoothScroll(e, 'home')}
                className="flex items-center focus:outline-none group"
              >
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-white shadow-md border border-gray-100 transition-all duration-300 group-hover:shadow-lg">
  <img 
    src={assets.logo_f} 
    alt="F Logo" 
    className="h-7 w-7"
  />
</div>
                <span className="ml-3 text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                  Barbachi Farouk
                </span>
              </button>
            </div>
            
            {/* Navigation Desktop */}
            <div className="hidden md:block flex-1">
              <div className="flex justify-center space-x-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={(e) => handleSmoothScroll(e, item.id)}
                    className={`px-5 py-2 text-sm font-medium transition-all duration-300 ${
                      activeItem === item.id 
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'text-gray-700 hover:bg-orange-100'
                    } hover:scale-105`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Contact Me Button - Desktop */}
            <div className="hidden md:block">
              <button 
                onClick={(e) => handleSmoothScroll(e, 'contact')}
                className={`bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md ${
                  activeItem === 'contact' ? 'ring-2 ring-orange-300 ring-offset-2' : ''
                }`}
              >
                Contact Me
              </button>
            </div>
            
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="focus:outline-none p-1"
              >
                {isMobileMenuOpen ? (
                  <svg className="h-7 w-7 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <div className="simple-rotating-icon">
  <div className="simple-rotating-icon-inner">
  </div>
</div>
                )}
              </button>
            </div>
            
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Sidebar Menu */}
      <div 
        className={`fixed inset-0 h-screen w-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } ${!isMobileMenuOpen ? 'invisible' : 'visible'}`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <button 
                onClick={(e) => {
                  handleSmoothScroll(e, 'home');
                  closeMobileMenu();
                }}
                className="flex items-center focus:outline-none group"
              >
                <div className="h-12 w-12 rounded-full flex items-center justify-center bg-white shadow-lg border border-gray-100 transition-all duration-300">
  <img 
    src={assets.logo_f} 
    alt="F Logo" 
    className="h-9 w-9"
  />
</div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                    Barbachi Farouk
                  </h2>
                  <p className="text-gray-600 text-sm group-hover:text-orange-500 transition-colors duration-300">
                    Full Stack Developer
                  </p>
                </div>
              </button>
              
              {/* Bouton Fermer dans le menu mobile - JUSTE X */}
              <button 
  onClick={closeMobileMenu}
  className="simple-rotating-icon focus:outline-none"
>
  <div className="simple-rotating-icon-inner">
    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </div>
</button>
            </div>
          </div>

          {/* Sidebar Navigation Links - Centered */}
          <div className="flex-1 flex flex-col justify-center px-6">
            <div className="space-y-4">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={(e) => {
                    handleSmoothScroll(e, item.id);
                    closeMobileMenu();
                  }}
                  className={`block w-full py-4 px-6 rounded-xl transition-all duration-300 text-xl font-bold text-center focus:outline-none ${
                    activeItem === item.id
                      ? 'bg-orange-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-800 hover:bg-orange-100 hover:text-orange-600'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Contact Me Button - Mobile */}
            <div className="mt-12">
              <button 
                onClick={(e) => {
                  handleSmoothScroll(e, 'contact');
                  closeMobileMenu();
                }}
                className={`w-full py-4 rounded-xl transition-all duration-300 font-bold text-xl focus:outline-none ${
                  activeItem === 'contact'
                    ? 'bg-orange-600 text-white shadow-lg ring-2 ring-orange-300 ring-offset-2'
                    : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:scale-105'
                }`}
              >
                Contact Me
              </button>
            </div>
          </div>

          {/* Footer Section */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="text-center">
              <p className="text-gray-700 font-medium">Let's Build Together</p>
              <p className="text-gray-500 text-sm mt-2">MERN Stack • React • Node.js</p>
              <div className="mt-4 flex justify-center space-x-4">
                <div className={`w-3 h-3 rounded-full animate-pulse ${
                  activeItem === 'home' ? 'bg-orange-600' : 'bg-orange-500'
                }`}></div>
                <div className={`w-3 h-3 rounded-full animate-pulse ${
                  activeItem === 'services' ? 'bg-orange-600' : 'bg-orange-400'
                }`} style={{ animationDelay: '0.2s' }}></div>
                <div className={`w-3 h-3 rounded-full animate-pulse ${
                  activeItem === 'portfolio' ? 'bg-orange-600' : 'bg-orange-300'
                }`} style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;