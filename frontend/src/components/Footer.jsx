import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaHeart, FaCode, FaUser, FaPaperPlane, FaComment, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { backendUrl } from '../App';
import emailjs from '@emailjs/browser';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(''); 
  const [notificationMessage, setNotificationMessage] = useState('');

  const [submitCount, setSubmitCount] = useState(0);

  useEffect(() => {
    emailjs.init('ln4T5Ewt2cW4bF3pB');
  }, []);

  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const socialLinks = [
    { icon: <FaGithub />, name: 'GitHub', url: 'https://github.com', color: 'hover:text-gray-800' },
    { icon: <FaLinkedin />, name: 'LinkedIn', url: 'https://linkedin.com', color: 'hover:text-blue-600' },
    { icon: <FaInstagram />, name: 'Instagram', url: 'https://twitter.com', color: 'hover:text-pink-600' },
    { icon: <FaEnvelope />, name: 'Email', url: 'mailto:contact@example.com', color: 'hover:text-red-500' },
  ];

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const technologies = [
    'React.js',
    'Node.js',
    'Express',
    'MongoDB',
    'Tailwind CSS',
    'TypeScript',
  ];

  const handleSubscribe = async (e) => {
  e.preventDefault();

  const FIVE_MINUTES = 5 * 60 * 1000;
  const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
  const now = Date.now();
  
  const lastStoredSubmit = localStorage.getItem('lastQuickSubscribe');
  const storedCount = localStorage.getItem('quickSubscribeCount');
  const lastResetTime = localStorage.getItem('lastResetTime');
    if (lastResetTime) {
    const timeSinceLastReset = now - parseInt(lastResetTime);
    if (timeSinceLastReset > TWENTY_FOUR_HOURS) {
      localStorage.removeItem('quickSubscribeCount');
      localStorage.removeItem('lastQuickSubscribe');
      localStorage.setItem('lastResetTime', now.toString());
      
      setSubmitCount(0);
    }
  } else {
    localStorage.setItem('lastResetTime', now.toString());
  }
  
  const lastStoredTime = lastStoredSubmit ? parseInt(lastStoredSubmit) : 0;
  const storedSubmitCount = storedCount ? parseInt(storedCount) : 0;
  
  if (lastStoredTime && (now - lastStoredTime < FIVE_MINUTES)) {
    const minutesLeft = Math.ceil((FIVE_MINUTES - (now - lastStoredTime)) / 60000);
    showNotificationModal('error', `Please wait ${minutesLeft} minute(s) before trying again!`);
    return;
  }
  
  if (storedSubmitCount >= 5) {
    showNotificationModal('error', 'Daily limit reached (5 max). Try again tomorrow!');
    return;
  }
  
  if (submitCount >= 3) {
    showNotificationModal('error', 'Maximum subscription attempts reached for this session!');
    return;
  }
  
  localStorage.setItem('lastQuickSubscribe', now.toString());
  localStorage.setItem('quickSubscribeCount', (storedSubmitCount + 1).toString());
  
  setSubmitCount(prev => prev + 1);
  
  const cleanEmail = email.trim();
  
  if (!cleanEmail) {
    showNotificationModal('error', 'Please enter an email address!');
    return;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    showNotificationModal('error', 'Please enter a valid email address!');
    return;
  }

  try {
    const response = await emailjs.send(
      'service_xe41fun',
      'template_k0qybz3',
      {
        user_email: cleanEmail,
        to_name: cleanEmail.split('@')[0]
      }
    );
    
    showNotificationModal('success', 'Subscription confirmed! Check your email.');
    setEmail('');
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);

  } catch (error) {
    console.error('❌ Erreur:', error);
    
    localStorage.setItem('quickSubscribeCount', Math.max(0, storedSubmitCount).toString());
    setSubmitCount(prev => Math.max(0, prev - 1));
    
    if (error.status === 422) {
      showNotificationModal('error', 'Invalid email format. Try: example@gmail.com');
    } else {
      showNotificationModal('error', 'Subscription failed. Try Advanced Contact form.');
    }
  }
};

  const showNotificationModal = (type, message) => {
    setNotificationType(type);
    setNotificationMessage(message);
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
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

  const handleContactFormChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.firstName || !contactForm.email || !contactForm.message) return;
    
    setIsSubmitting(true);
    
    try {
      
      const response = await axios.post(`${backendUrl}/api/contacts`, contactForm, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      
      if (response.data.success) {
        setIsSubmitted(true);
        setContactForm({ firstName: '', lastName: '', email: '', message: '' });
        
        setTimeout(() => {
          setIsSubmitted(false);
        }, 4000);
      } else {
        alert('Error: ' + (response.data.message || 'Failed to send'));
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      if (error.response) {
        alert(`Error ${error.response.status}: ${error.response.data?.message || 'Server error'}`);
      } else if (error.request) {
        alert('No response from server. Is backend running?');
      } else {
        alert('Error: ' + error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdvancedContactClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowContactForm(true);
      setTimeout(() => setIsAnimating(false), 300);
    }, 400);
  };

  const handleBackClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowContactForm(false);
      setTimeout(() => setIsAnimating(false), 300);
    }, 400);
  };

  return (
    <footer id="contact" className="relative bg-gradient-to-b from-gray-50 to-gray-100 pt-16 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <div className="relative min-h-[400px]">
          
          <div 
  className={`transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
    showContactForm 
      ? '-translate-x-full opacity-0 absolute pointer-events-none' 
      : 'translate-x-0 opacity-100 relative pointer-events-auto'
  } ${isAnimating ? 'scale-95' : 'scale-100'}`}
  style={{ width: '100%' }}
>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              
              <div className="lg:col-span-1">
                <div className="mb-4">
                  <button 
                    onClick={(e) => handleSmoothScroll(e, 'home')}
                    className="flex items-center group focus:outline-none"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                      F
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                        Barbachi Farouk
                      </h3>
                      <p className="text-gray-600 text-xs">Full Stack Developer</p>
                    </div>
                  </button>
                </div>
                
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Crafting digital experiences with modern technologies.
                </p>
                
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-gray-600 text-sm transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${social.color} ${
                        hoveredIcon === social.name ? 'shadow-md' : ''
                      }`}
                      onMouseEnter={() => setHoveredIcon(social.name)}
                      onMouseLeave={() => setHoveredIcon(null)}
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <h4 className="text-base font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-4 bg-orange-500 rounded-full mr-2"></span>
                  Quick Links
                </h4>
                <ul className="space-y-2">
                  {quickLinks.map((link, index) => (
                    <li key={link.label}>
                      <button
                        onClick={(e) => handleSmoothScroll(e, link.href.substring(1))}
                        className="text-gray-600 hover:text-orange-500 transition-all duration-300 flex items-center group text-sm"
                      >
                        <svg 
                          className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="group-hover:font-medium transition-all duration-300">
                          {link.label}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-1">
                <h4 className="text-base font-bold text-gray-800 mb-4 flex items-center">
                  <FaCode className="text-orange-500 mr-2 text-sm" />
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {technologies.map((tech, index) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-white rounded-full text-gray-700 text-xs font-medium shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md hover:border-orange-300 hover:scale-95"
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <h4 className="text-base font-bold text-gray-800 mb-4 flex items-center">
                  <FaEnvelope className="text-orange-500 mr-2 text-sm" />
                  Get in Touch
                </h4>
                
                <button
                  onClick={handleAdvancedContactClick}
                  disabled={isAnimating}
                  className="group w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-95 hover:shadow-lg hover:shadow-orange-500/20 mb-3 relative overflow-hidden text-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10 flex items-center justify-center">
                    <FaPaperPlane className="mr-2 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 text-sm" />
                    <span className="transition-all duration-300 group-hover:tracking-wider">
                      Advanced Contact
                    </span>
                  </div>
                  
                  <div className="absolute inset-0 border border-transparent rounded-lg transition-all duration-300 group-hover:border-white/30"></div>
                </button>
                
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Quick Email"
                      className="w-full px-3 py-2 bg-white rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-200 focus:outline-none transition-all duration-300 shadow-sm text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] text-sm ${
                      isSubscribed
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white'
                    }`}
                  >
                    {isSubscribed ? 'Subscribed!' : 'Quick Subscribe'}
                  </button>
                  
                  <p className="text-gray-600 text-xs text-center">
                    Or use Advanced Contact
                  </p>
                </form>
              </div>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <div className="px-4 bg-gradient-to-r from-transparent via-gray-100 to-transparent">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-gray-200">
              <div className="mb-3 md:mb-0">
                <p className="text-gray-600 text-xs flex items-center">
                  <FaHeart className="text-red-500 mr-1 animate-pulse text-xs" />
                  Crafted by Barbachi Farouk
                  <span className="mx-1">•</span>
                  {new Date().getFullYear()}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="flex items-center text-gray-600 hover:text-orange-500 transition-all duration-300 group text-xs"
                >
                  <span className="mr-1 group-hover:font-medium">Top</span>
                  <div className="w-6 h-6 rounded-full border border-gray-300 group-hover:border-orange-500 flex items-center justify-center transition-all duration-300 group-hover:bg-orange-50">
                    <svg 
                      className="w-3 h-3 transform transition-transform duration-300 group-hover:-translate-y-0.5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-orange-50 to-orange-100 rounded-full border border-orange-200">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></div>
                <span className="text-gray-700 text-xs font-medium">
                  Available for freelance
                </span>
                <div className="ml-1.5 w-6 h-0.5 bg-gradient-to-r from-orange-500 to-transparent"></div>
              </div>
            </div>
          </div>

          <div 
            className={`transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              showContactForm ? 'translate-x-0 opacity-100 relative' : 'translate-x-full opacity-0 absolute'
            } ${isAnimating ? 'scale-95' : 'scale-100'}`}
            style={{ width: '100%', top: 0, left: 0 }}
          >
            <div className="bg-gradient-to-b from-orange-50 to-white rounded-xl shadow-lg border border-orange-200 p-4 md:p-6">
              
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800 flex items-center">
                  <FaPaperPlane className="text-orange-500 mr-2 text-sm" />
                  <span className="text-sm">Contact Form</span>
                </h3>
                <button 
                  onClick={handleBackClick}
                  disabled={isAnimating}
                  className="flex items-center text-gray-600 hover:text-orange-500 transition-colors duration-300 group text-sm"
                >
                  <FaArrowLeft className="mr-1 transform transition-transform duration-300 group-hover:-translate-x-0.5 text-xs" />
                  <span className="font-medium">Back</span>
                </button>
              </div>
              
              <p className="text-gray-600 text-xs mb-4">
                I'll get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <div className="text-center py-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-gray-800 mb-1">Message Sent!</h3>
                  <p className="text-gray-600 text-xs mb-3">
                    Thank you for reaching out.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium transition-all duration-300 hover:scale-95 text-xs"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="group">
                      <label className="block text-gray-700 mb-1 text-xs font-medium">
                        <FaUser className="inline mr-1 text-orange-500 text-xs" />
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={contactForm.firstName}
                        onChange={handleContactFormChange}
                        placeholder="First Name"
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-200 focus:outline-none transition-all duration-300 text-gray-800 placeholder-gray-500 text-sm"
                        required
                      />
                    </div>
                    
                    <div className="group">
                      <label className="block text-gray-700 mb-1 text-xs font-medium">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={contactForm.lastName}
                        onChange={handleContactFormChange}
                        placeholder="Last Name"
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-200 focus:outline-none transition-all duration-300 text-gray-800 placeholder-gray-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-gray-700 mb-1 text-xs font-medium">
                      <FaEnvelope className="inline mr-1 text-orange-500 text-xs" />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactFormChange}
                      placeholder="email@example.com"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-200 focus:outline-none transition-all duration-300 text-gray-800 placeholder-gray-500 text-sm"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="block text-gray-700 mb-1 text-xs font-medium">
                      <FaComment className="inline mr-1 text-orange-500 text-xs" />
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactFormChange}
                      placeholder="Tell me about your project..."
                      rows="3"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-200 focus:outline-none transition-all duration-300 text-gray-800 placeholder-gray-500 text-sm resize-none"
                      required
                      maxLength={1000}
                    ></textarea>
                    <div className="flex justify-between mt-1">
  <span className="text-xs text-gray-500">
    * Required
  </span>
  <span className={`text-xs ${
    contactForm.message.length > 900 
      ? 'text-red-500' 
      : contactForm.message.length > 700 
      ? 'text-orange-500' 
      : 'text-gray-500'
  }`}>
    {contactForm.message.length}/1000
  </span>
</div>
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting || !contactForm.firstName || !contactForm.email || !contactForm.message}
                      className={`w-full py-2.5 rounded-lg font-medium transition-all duration-300 transform flex items-center justify-center text-sm ${
                        isSubmitting
                          ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white'
                          : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:scale-[1.02] hover:shadow-md'
                      } ${(!contactForm.firstName || !contactForm.email || !contactForm.message) ? 'opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none' : ''}`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="w-4 h-4 mr-1.5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="mr-1.5 text-xs" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-center pt-2 border-t border-gray-200">
                    <p className="text-gray-600 text-xs">
                      Direct: 
                      <a href="mailto:contact@example.com" className="text-orange-500 hover:text-orange-600 ml-1 font-medium">
                        faroukbarbachi@gmail.com
                      </a>
                    </p>
                  </div>
                </form>
              )}

              <div className="mt-4 text-center">
                <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-orange-100 to-orange-50 rounded-full border border-orange-200">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></div>
                  <span className="text-gray-700 text-xs font-medium">
                    Responds within 24h
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className={`relative rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 ${
            showNotification ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}>
            <div className={`absolute inset-0 ${
              notificationType === 'success' 
                ? 'bg-gradient-to-r from-green-500 to-green-600' 
                : 'bg-gradient-to-r from-red-500 to-red-600'
            }`}></div>
            
            <div className="relative z-10 p-8">
              <div className="flex justify-center mb-6">
                <div className={`w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm ${
                  notificationType === 'success' ? 'animate-pulse' : 'animate-shake'
                }`}>
                  {notificationType === 'success' ? (
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
              </div>
              
              <h3 className={`text-2xl font-bold text-center mb-3 text-white ${
                notificationType === 'success' ? 'animate-pulse' : ''
              }`}>
                {notificationType === 'success' ? 'Success! 🎉' : 'Oops! ❌'}
              </h3>
              
              <p className="text-white/90 text-center text-lg mb-6 leading-relaxed">
                {notificationMessage}
              </p>
              
              <div className="flex justify-center">
                <button
                  onClick={() => setShowNotification(false)}
                  className="px-8 py-3 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg transition-all duration-300 backdrop-blur-sm hover:scale-105"
                >
                  {notificationType === 'success' ? 'Ok!' : 'Try Again'}
                </button>
              </div>
              
              <div className="mt-6 h-1 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    notificationType === 'success' ? 'bg-green-300' : 'bg-red-300'
                  } animate-progress`}
                  style={{ animationDuration: '4s' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;