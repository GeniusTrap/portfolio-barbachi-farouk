import React, { useState, useEffect, useRef } from 'react';
import { FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';
import { SiExpress } from 'react-icons/si';
import ScrollAnimation from './ScrollAnimation';
import { assets } from '../assets/assets';

const About = () => {
  const [progressValues, setProgressValues] = useState({});
  const [hasAnimated, setHasAnimated] = useState(false);
  const skillsContainerRef = useRef(null);
  const animationTriggeredRef = useRef(false); 

  const skills = [
    { name: "React.js", level: 90, icon: <FaReact className="text-xl text-blue-500" /> },
    { name: "Node.js", level: 85, icon: <FaNodeJs className="text-xl text-green-600" /> },
    { name: "Express.js", level: 80, icon: <SiExpress className="text-xl text-gray-800" /> },
    { name: "MongoDB", level: 90, icon: <FaDatabase className="text-xl text-green-500" /> },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animationTriggeredRef.current) {
            animationTriggeredRef.current = true; 
            setHasAnimated(true);
            
            skills.forEach((skill, index) => {
              setTimeout(() => {
                animateProgressBar(skill.name, skill.level);
              }, index * 250);
            });
            
            observer.disconnect();
          }
        });
      },
      { 
        threshold: 0.9,
        rootMargin: '0px 0px -250px 0px' 
      }
    );

    if (skillsContainerRef.current) {
      observer.observe(skillsContainerRef.current);
    }

    return () => {
      if (skillsContainerRef.current) {
        observer.disconnect();
      }
    };
  }, [skills]);

  const animateProgressBar = (skillName, targetLevel) => {
    const duration = 1800;
    const steps = 50;
    const increment = targetLevel / steps;
    const stepDuration = duration / steps;
    
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetLevel) {
        current = targetLevel;
        clearInterval(timer);
      }
      setProgressValues(prev => ({
        ...prev,
        [skillName]: Math.floor(current)
      }));
    }, stepDuration);
  };

  return (
  <section id="about" className="py-16 bg-gray-50">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* TOUT dans ScrollAnimation */}
      <ScrollAnimation direction="up" delay={50}>
        {/* Bannière centrée - DÉPLACÉE DANS ScrollAnimation */}
        <img 
          className='rounded-2xl w-full h-auto mb-10 lg:mb-12 shadow-lg mx-auto' 
          src={assets.banner} 
          alt="Banner" 
        />
        
        {/* Le reste du contenu */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-3xl space-y-8 text-center">
            
            {/* Titre et paragraphe */}
            <div className="space-y-6">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Full Stack <span className="text-orange-500">MERN</span> Developer
              </h3>
              
              <p className="text-gray-600 leading-relaxed text-lg mx-auto max-w-2xl">
                Creating modern, scalable web applications with clean code and 
                innovative solutions. Focused on delivering high-performance 
                digital experiences that exceed expectations.
              </p>
            </div>

            {/* Compétences */}
            <div ref={skillsContainerRef} className="pt-6">
              <h4 className="text-xl font-bold text-gray-800 mb-8">
                Core Stack
              </h4>
              
              <div className="space-y-5 max-w-2xl mx-auto">
                {skills.map((skill, index) => {
                  const currentProgress = progressValues[skill.name] || 0;
                  
                  return (
                    <div key={skill.name} className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
                        {skill.icon}
                      </div>
                      
                      <div className="flex-1 flex items-center space-x-4">
                        <div className="w-32 flex-shrink-0">
                          <span className="text-gray-800 font-medium">
                            {skill.name}
                          </span>
                        </div>
                        
                        <div className="flex-1 relative h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-1800 ease-out"
                            style={{ 
                              width: `${currentProgress}%`,
                              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </ScrollAnimation>
    </div>
  </section>
);
};

export default About;