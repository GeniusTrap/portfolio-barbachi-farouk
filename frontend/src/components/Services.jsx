import React, { useState } from 'react';
import { FaCode, FaServer, FaMobileAlt } from 'react-icons/fa';
import ScrollAnimation from './ScrollAnimation';

const Services = () => {
  const [revealedCards, setRevealedCards] = useState([]); 
  const [shakingCard, setShakingCard] = useState(null);

  const services = [
    {
      icon: <FaCode className="text-4xl" />,
      title: "Frontend Development",
      description: "Modern React applications with responsive design using Tailwind CSS and latest web technologies.",
      technologies: ["React.js", "Tailwind CSS", "TypeScript"],
      color: "from-blue-500 to-blue-600",
      features: [
        "",
      ]
    },
    {
      icon: <FaServer className="text-4xl" />,
      title: "Backend Development",
      description: "Scalable server-side solutions with Node.js, Express and MongoDB database management.",
      technologies: ["Node.js", "Express.js", "MongoDB", "REST API"],
      color: "from-green-500 to-green-600",
      features: [
        "",
      ]
    },
    {
      icon: <FaMobileAlt className="text-4xl" />,
      title: "Full Stack Solutions",
      description: "Complete MERN stack applications from concept to deployment with focus on user experience.",
      technologies: ["MERN Stack", "Authentication", "Payment", "Deployment"],
      color: "from-orange-500 to-orange-600",
      features: [
        "",
      ]
    }
  ];

  const handleCardClick = (index) => {
  setRevealedCards(prevRevealedCards => {
    if (prevRevealedCards.includes(index)) return prevRevealedCards;
    
    return prevRevealedCards;
  });
  
  setShakingCard(index);
  
  setTimeout(() => {
    setShakingCard(null);
    setRevealedCards(prevRevealedCards => [...prevRevealedCards, index]);
  }, 500);
};

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ScrollAnimation direction="down" delay={50}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-4">
              <span className="text-orange-500">What I Do?</span>
            </h2>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const isRevealed = revealedCards.includes(index); 
            const isShaking = shakingCard === index;

            return (
              <ScrollAnimation 
                key={index}
                delay={index * 200} 
                direction="up"
                duration={700}
              >
                <div className="h-[500px]">
                  <div 
                    className={`relative h-full rounded-2xl overflow-hidden transition-all duration-500 ${
                      isShaking ? 'animate-shake' : ''
                    } ${!isRevealed ? 'cursor-pointer' : ''}`}
                    onClick={() => !isRevealed && handleCardClick(index)}
                  >
                    {/* Mystery Box - Seulement si PAS dans revealedCards */}
                    {!isRevealed && (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
                        {/* Animated sparkles */}
                        <div className="absolute inset-0 overflow-hidden">
                          {[...Array(12)].map((_, i) => (
                            <div 
                              key={i}
                              className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                              style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.2}s`
                              }}
                            ></div>
                          ))}
                        </div>
                        
                        {/* Box content */}
                        <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
                          <div className={`w-24 h-24 border-4 border-dashed border-orange-500 rounded-lg flex items-center justify-center mb-6 ${
                            isShaking ? 'animate-pulse-fast' : 'animate-pulse'
                          }`}>
                            <span className={`text-4xl font-bold text-white transition-all duration-300 ${
                              isShaking ? 'scale-125' : 'scale-100'
                            }`}>?</span>
                          </div>
                          
                          <p className="text-gray-300 text-center mb-6">
                            Click to reveal
                          </p>
                          <div className="text-orange-400 text-sm font-medium">
                            {index === 0 ? " Frontend Magic" : 
                             index === 1 ? " Backend Power" : 
                             " Full Stack Excellence"}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Carte révélée - Seulement si DANS revealedCards */}
                    {isRevealed && (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black animate-fade-in">
                        {/* Les étoiles */}
                        <div className="absolute inset-0 overflow-hidden">
                          {[...Array(8)].map((_, i) => (
                            <div 
                              key={i}
                              className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                              style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.2}s`
                              }}
                            ></div>
                          ))}
                        </div>

                        <div className="relative z-10 h-full flex flex-col">
                          <div className="p-6 border-b border-gray-700">
                            <div className="flex items-center mb-4">
                              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mr-4">
                                <div className="text-white">
                                  {service.icon}
                                </div>
                              </div>
                              <h3 className="text-2xl font-bold text-white">
                                {service.title}
                              </h3>
                            </div>
                            
                            <p className="text-gray-300">
                              {service.description}
                            </p>
                          </div>

                          {/* Contenu principal */}
                          <div className="flex-1 p-6">
                            {/* Technologies */}
                            <div className="mb-8">
                              <h4 className="text-white font-bold mb-4 text-lg flex items-center">
                                <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Core Technologies
                              </h4>
                              <div className="grid grid-cols-2 gap-3">
                                {service.technologies.map((tech, techIndex) => (
                                  <div 
                                    key={techIndex}
                                    className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700 hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                                  >
                                    <div className="flex items-center justify-center">
                                      <span className="text-white font-medium text-center">{tech}</span>
                                    </div>
                                    <div className="mt-2 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Features */}
                            <div className="mb-8">
                              <div className="space-y-3">
                                {service.features.map((feature, featureIndex) => (
                                  <div 
                                    key={featureIndex}
                                    className="flex items-center bg-gray-800/30 rounded-lg px-4 py-3 hover:bg-gray-800/50 transition-colors duration-300"
                                  >
                                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                                    <span className="text-gray-300">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Bouton CTA */}
                          <div className="p-6 border-t border-gray-700">
                            <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                              Start {service.title.split(' ')[0]} Project
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollAnimation>
            );
          })}
        </div>

        {/* Paragraphe avec bordures serpentines - Animation retardée */}
        <ScrollAnimation delay={600} direction="fade" duration={800}>
          <div className="mt-12 max-w-3xl mx-auto px-4">
            <div className="relative group">
              {/* Effet d'ombre animée */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              
              <div className="animated-border-box relative">
                <div className="border-top"></div>
                <div className="border-right"></div>
                <div className="border-bottom"></div>
                <div className="border-left"></div>
                
                {/* Points d'angle décoratifs */}
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-orange-500 rounded-full animate-ping"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-orange-500 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
                
                <div className="content-wrapper py-4">
                  <p className="text-center text-gray-800 text-2xl md:text-3xl leading-tight font-bold animated-text">
                    Where <span className="text-orange-600">vision</span> meets <span className="text-orange-600">execution</span>
                  </p>
                  
                  <p className="text-center text-gray-700 text-lg mt-1 font-medium">
                    Crafting digital experiences that <span className="text-orange-600 font-bold">transcend expectations</span>
                  </p>
                  
                  <p className="text-center text-gray-600 mt-1">
                    Precision engineering meets artistic vision
                  </p>
                  
                  {/* Ligne décorative sous le texte */}
                  <div className="mt-3 flex justify-center">
                    <div className="w-16 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Services;