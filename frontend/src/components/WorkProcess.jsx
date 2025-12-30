import React, { useState, useEffect } from 'react';
import ScrollAnimation from './ScrollAnimation';
import { 
  FaChevronLeft, 
  FaChevronRight,
  FaChartBar,
  FaPalette,
  FaCode,
  FaBug,
  FaCloudUploadAlt,
  FaGithub,
  FaGoogle,
  FaDrawPolygon,
  FaDiscord,
  FaFileAlt,
  FaPenNib,
  FaImage,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaVial,
  FaChrome,
  FaServer,
  FaCloud
} from 'react-icons/fa';

const WorkProcess = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Analysis",
      description: "Client consultation, requirements gathering, and technical planning",
      icon: <FaChartBar className="w-8 h-8" />,
      color: "bg-gradient-to-r from-gray-800 to-gray-900",
      details: [
        "Client meetings via Google Meet/Discord to understand needs",
        "Requirements documentation with Google Docs/Notion",
        "Technical architecture diagrams using Draw.io",
        "Project roadmap & milestone planning with GitHub Issues"
      ],
      tools: [
        { name: "GitHub Issues", icon: <FaGithub className="w-4 h-4" /> },
        { name: "Google Meet", icon: <FaGoogle className="w-4 h-4" /> },
        { name: "Discord", icon: <FaDiscord className="w-4 h-4" /> },
        { name: "Draw.io", icon: <FaDrawPolygon className="w-4 h-4" /> },
        { name: "Notion", icon: <FaFileAlt className="w-4 h-4" /> }
      ]
    },
    {
      id: 2,
      title: "Design",
      description: "Creating visual mockups and UI/UX planning",
      icon: <FaPalette className="w-8 h-8" />,
      color: "bg-gradient-to-r from-orange-600 to-orange-700",
      details: [
        "Simple mockups using Photoshop for client approval",
        "UI design inspired by Tailwind UI and Shadcn components",
        "Responsive layout planning for all devices",
        "Color scheme & typography selection matching brand identity"
      ],
      tools: [
        { name: "Photoshop", icon: <FaImage className="w-4 h-4" /> },
        { name: "Tailwind UI", icon: <FaPenNib className="w-4 h-4" /> },
        { name: "Shadcn", icon: <FaPalette className="w-4 h-4" /> },
        { name: "Color Tools", icon: <FaPalette className="w-4 h-4" /> }
      ]
    },
    {
      id: 3,
      title: "Development",
      description: "Building full-stack applications with MERN stack",
      icon: <FaCode className="w-8 h-8" />,
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
      details: [
        "Frontend development with React.js & Tailwind CSS",
        "Backend API development using Node.js & Express",
        "Database design & implementation with MongoDB",
        "Real-time features, authentication & third-party integrations"
      ],
      tools: [
        { name: "React.js", icon: <FaReact className="w-4 h-4" /> },
        { name: "Node.js", icon: <FaNodeJs className="w-4 h-4" /> },
        { name: "MongoDB", icon: <FaDatabase className="w-4 h-4" /> },
        { name: "Express.js", icon: <FaServer className="w-4 h-4" /> }
      ]
    },
    {
      id: 4,
      title: "Testing",
      description: "Quality assurance and performance optimization",
      icon: <FaBug className="w-8 h-8" />,
      color: "bg-gradient-to-r from-gray-700 to-gray-800",
      details: [
        "Unit & integration testing of all components",
        "API testing with Thunder Client for endpoint validation",
        "Cross-browser compatibility testing (Chrome)",
        "Performance optimization & load time improvements"
      ],
      tools: [
        { name: "Thunder Client", icon: <FaVial className="w-4 h-4" /> },
        { name: "Chrome DevTools", icon: <FaChrome className="w-4 h-4" /> },
        { name: "Manual Testing", icon: <FaBug className="w-4 h-4" /> }
      ]
    },
    {
      id: 5,
      title: "Deployment",
      description: "Production deployment and monitoring setup",
      icon: <FaCloudUploadAlt className="w-8 h-8" />,
      color: "bg-gradient-to-r from-orange-400 to-orange-500",
      details: [
        "Frontend & backend deployment on Render.com",
        "Database hosting with MongoDB Atlas",
        "GitHub integration for automatic deployments",
        "Performance monitoring & analytics setup"
      ],
      tools: [
        { name: "Render", icon: <FaCloud className="w-4 h-4" /> },
        { name: "MongoDB Atlas", icon: <FaDatabase className="w-4 h-4" /> },
        { name: "GitHub", icon: <FaGithub className="w-4 h-4" /> },
        { name: "CI/CD", icon: <FaCloudUploadAlt className="w-4 h-4" /> }
      ]
    }
  ];

  const handleNext = () => {
    if (!isAnimating && activeStep < steps.length - 1) {
      setIsAnimating(true);
      setActiveStep(prev => prev + 1);
      setTimeout(() => setIsAnimating(false), 400);
    }
  };

  const handlePrev = () => {
    if (!isAnimating && activeStep > 0) {
      setIsAnimating(true);
      setActiveStep(prev => prev - 1);
      setTimeout(() => setIsAnimating(false), 400);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStep, isAnimating]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setActiveStep(prev => prev === steps.length - 1 ? 0 : prev + 1);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [isAnimating, steps.length]);

  return (
    <section id="process" className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <ScrollAnimation direction="up" delay={100} duration={700}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Titre avec ligne animée */}
          <div className="text-center mb-16 relative">
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-500/5 to-transparent rounded-full blur-3xl"></div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 relative z-10">
              My <span className="text-orange-500">Development Process</span>
            </h2>
            
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto rounded-full mb-6 animate-pulse"></div>
            
            <p className="text-gray-600 text-lg max-w-2xl mx-auto relative z-10">
              A structured 5-step methodology to deliver high-quality MERN stack applications
            </p>
          </div>
          <div className="hidden md:block relative mb-20">
            <div className="relative z-10 flex justify-between items-center px-2">
              {steps.map((step, index) => {
                const isActive = index === activeStep;
                const isCompleted = index < activeStep;
                
                return (
                  <div 
                    key={step.id}
                    className="flex flex-col items-center relative"
                    style={{ width: `${100 / steps.length}%` }}
                  >
                    <button
                      onClick={() => {
                        setIsAnimating(true);
                        setActiveStep(index);
                        setTimeout(() => setIsAnimating(false), 300);
                      }}
                      className={`relative group focus:outline-none transition-all duration-500 ${
                        isActive ? 'scale-125' : 'scale-100'
                      }`}
                      aria-label={`View ${step.title} phase`}
                    >
                      {isActive && (
                        <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-full animate-ping"></div>
                      )}
                      
                      <div className={`
                        absolute inset-0 rounded-full transition-all duration-500
                        ${isCompleted ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gray-300'}
                        ${isActive ? 'scale-125' : 'scale-100'}
                      `}></div>
                      
                      <div className={`
                        relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center
                        transition-all duration-500 transform
                        ${isActive ? 'scale-110 rotate-0' : 'scale-100 -rotate-12'}
                        group-hover:scale-125 group-hover:rotate-0
                        ${step.color}
                        shadow-xl
                      `}>
                        <div className={`
                          text-white transition-all duration-500
                          ${isActive ? 'scale-110' : 'scale-90'}
                          group-hover:scale-110
                        `}>
                          {step.icon}
                        </div>
                        
                        <div className="absolute -top-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200">
                          <span className="text-gray-800 font-bold text-xs">{index + 1}</span>
                        </div>
                      </div>
                      
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-orange-400 rounded-full animate-ping"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              animationDelay: `${i * 0.2}s`
                            }}
                          ></div>
                        ))}
                      </div>
                    </button>
                    
                    <div className="mt-6 text-center">
                      <h3 className={`
                        text-base font-bold transition-all duration-500
                        ${isActive ? 'text-gray-800 scale-110' : 'text-gray-600'}
                        group-hover:text-gray-800
                      `}>
                        {step.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile: 2 lignes (3 + 2 icônes) */}
          <div className="md:hidden relative mb-20">
            {/* Première ligne: Analysis, Design, Development */}
            <div className="flex justify-between items-center mb-12">
              {steps.slice(0, 3).map((step, index) => {
                const originalIndex = index;
                const isActive = originalIndex === activeStep;
                const isCompleted = originalIndex < activeStep;
                
                return (
                  <div 
                    key={step.id}
                    className="flex flex-col items-center relative"
                    style={{ width: `${100 / 3}%` }}
                  >
                    <button
                      onClick={() => {
                        setIsAnimating(true);
                        setActiveStep(originalIndex);
                        setTimeout(() => setIsAnimating(false), 300);
                      }}
                      className={`relative group focus:outline-none transition-all duration-500 ${
                        isActive ? 'scale-125' : 'scale-100'
                      }`}
                      aria-label={`View ${step.title} phase`}
                    >
                      {isActive && (
                        <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-full animate-ping"></div>
                      )}
                      
                      <div className={`
                        absolute inset-0 rounded-full transition-all duration-500
                        ${isCompleted ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gray-300'}
                        ${isActive ? 'scale-125' : 'scale-100'}
                      `}></div>
                      
                      <div className={`
                        relative w-16 h-16 rounded-full flex items-center justify-center
                        transition-all duration-500 transform
                        ${isActive ? 'scale-110 rotate-0' : 'scale-100 -rotate-12'}
                        group-hover:scale-125 group-hover:rotate-0
                        ${step.color}
                        shadow-xl
                      `}>
                        <div className={`
                          text-white transition-all duration-500
                          ${isActive ? 'scale-110' : 'scale-90'}
                          group-hover:scale-110
                        `}>
                          {step.icon}
                        </div>
                        
                        <div className="absolute -top-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200">
                          <span className="text-gray-800 font-bold text-xs">{originalIndex + 1}</span>
                        </div>
                      </div>
                      
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-orange-400 rounded-full animate-ping"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              animationDelay: `${i * 0.2}s`
                            }}
                          ></div>
                        ))}
                      </div>
                    </button>
                    
                    <div className="mt-4 text-center">
                      <h3 className={`
                        text-sm font-bold transition-all duration-500
                        ${isActive ? 'text-gray-800 scale-110' : 'text-gray-600'}
                        group-hover:text-gray-800
                      `}>
                        {step.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Deuxième ligne: Testing, Deployment (centrés) */}
            <div className="flex justify-center items-center">
              {steps.slice(3, 5).map((step, index) => {
                const originalIndex = index + 3;
                const isActive = originalIndex === activeStep;
                const isCompleted = originalIndex < activeStep;
                
                return (
                  <div 
                    key={step.id}
                    className="flex flex-col items-center relative"
                    style={{ width: '40%' }}
                  >
                    <button
                      onClick={() => {
                        setIsAnimating(true);
                        setActiveStep(originalIndex);
                        setTimeout(() => setIsAnimating(false), 300);
                      }}
                      className={`relative group focus:outline-none transition-all duration-500 ${
                        isActive ? 'scale-125' : 'scale-100'
                      }`}
                      aria-label={`View ${step.title} phase`}
                    >
                      {isActive && (
                        <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-full animate-ping"></div>
                      )}
                      
                      <div className={`
                        absolute inset-0 rounded-full transition-all duration-500
                        ${isCompleted ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gray-300'}
                        ${isActive ? 'scale-125' : 'scale-100'}
                      `}></div>
                      
                      <div className={`
                        relative w-16 h-16 rounded-full flex items-center justify-center
                        transition-all duration-500 transform
                        ${isActive ? 'scale-110 rotate-0' : 'scale-100 -rotate-12'}
                        group-hover:scale-125 group-hover:rotate-0
                        ${step.color}
                        shadow-xl
                      `}>
                        <div className={`
                          text-white transition-all duration-500
                          ${isActive ? 'scale-110' : 'scale-90'}
                          group-hover:scale-110
                        `}>
                          {step.icon}
                        </div>
                        
                        <div className="absolute -top-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200">
                          <span className="text-gray-800 font-bold text-xs">{originalIndex + 1}</span>
                        </div>
                      </div>
                      
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-orange-400 rounded-full animate-ping"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              animationDelay: `${i * 0.2}s`
                            }}
                          ></div>
                        ))}
                      </div>
                    </button>
                    
                    <div className="mt-4 text-center">
                      <h3 className={`
                        text-sm font-bold transition-all duration-500
                        ${isActive ? 'text-gray-800 scale-110' : 'text-gray-600'}
                        group-hover:text-gray-800
                      `}>
                        {step.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-12">
            <button
              onClick={handlePrev}
              disabled={activeStep === 0 || isAnimating}
              className={`
                px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-all duration-300 text-sm md:text-base
                ${activeStep === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-800 text-white hover:bg-gray-900 hover:scale-105'
                }
                flex items-center space-x-2
              `}
            >
              <FaChevronLeft />
              <span>Previous</span>
            </button>
            
            <div className="text-center">
              <span className="text-gray-700 font-medium text-sm md:text-base">
                Step <span className="text-orange-600 font-bold">{activeStep + 1}</span> of {steps.length}
              </span>
            </div>
            
            <button
              onClick={handleNext}
              disabled={activeStep === steps.length - 1 || isAnimating}
              className={`
                px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-all duration-300 text-sm md:text-base
                ${activeStep === steps.length - 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-orange-500 text-white hover:bg-orange-600 hover:scale-105'
                }
                flex items-center space-x-2
              `}
            >
              <span>Next</span>
              <FaChevronRight />
            </button>
          </div>

          {/* Détails de l'étape active */}
          <div className="animate-fade-in mt-8">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className={`
                    w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white mr-4 md:mr-6
                    ${steps[activeStep].color} shadow-lg
                  `}>
                    <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
                      {steps[activeStep].icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800">{steps[activeStep].title}</h3>
                    <p className="text-gray-600 mt-1 text-sm md:text-base">{steps[activeStep].description}</p>
                  </div>
                </div>
                
                {/* Outils utilisés - avec icônes */}
                <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                  {steps[activeStep].tools.map((tool, index) => (
                    <span 
                      key={index}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-200 transition-colors flex items-center space-x-2"
                    >
                      <span className="text-orange-500">{tool.icon}</span>
                      <span>{tool.name}</span>
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Détails de l'étape */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {steps[activeStep].details.map((detail, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600"></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium text-sm md:text-base">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Indicateur de progression */}
              <div className="mt-8 pt-6 md:mt-10 md:pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <span className="text-gray-700 font-medium text-sm md:text-base">Project Progress</span>
                  <span className="text-orange-600 font-bold text-base md:text-lg">
                    {Math.round(((activeStep + 1) / steps.length) * 100)}% Complete
                  </span>
                </div>
                <div className="h-2 md:h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-1000 ease-out rounded-full relative"
                    style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  </div>
                </div>
                <div className="flex justify-between mt-1 md:mt-2 text-xs md:text-sm text-gray-500">
                  <span>Start</span>
                  <span>Completion</span>
                </div>
              </div>
            </div>
          </div>

          {/* Note pour mobile */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-xs md:text-sm flex items-center justify-center">
              <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Each step auto-rotates every 8 seconds
            </p>
          </div>

        </div>
      </ScrollAnimation>
    </section>
  );
};

export default WorkProcess;