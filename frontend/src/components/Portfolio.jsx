import React, { useState } from 'react';
import ScrollAnimation from './ScrollAnimation';
import { assets } from '../assets/assets';

const Portfolio = () => {
  const [showInfo, setShowInfo] = useState(false);
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      image: assets.project1,
    },
    {
      id: 2,
      title: "Task Management App",
      image: assets.project2,
    },
    {
      id: 3,
      title: "Real Estate Portal",
      image: assets.project3,
    }
  ];

  const handleProjectClick = (projectId) => {
    console.log(`Clicked project ${projectId}`);
  };

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Titre de la section */}
        <ScrollAnimation direction="down" delay={50}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              My <span className="text-orange-500">Portfolio</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mb-6"></div>
            
            {/* Paragraphe avec icône juste après "technologies" */}
            <div className="max-w-2xl mx-auto">
              <p className="text-gray-600 text-lg inline">
                A showcase of my recent projects and web applications built with modern technologies .
              </p>
<div className="relative inline-block ml-2 align-middle">
  <button
    onMouseEnter={() => setShowInfo(true)}
    onMouseLeave={() => setShowInfo(false)}
    onClick={() => setShowInfo(!showInfo)}
    className="simple-rotating-icon focus:outline-none"
    aria-label="Additional information"
  >
    <div className="simple-rotating-icon-inner">
      <span className="simple-rotating-icon-text">i</span>
    </div>
  </button>
  
  {showInfo && (
    <>
      <div 
        className="md:hidden fixed inset-0 z-40"
        onClick={() => setShowInfo(false)}
      ></div>
      
      {/* Tooltip lui-même */}
      <div className="fixed md:absolute inset-x-0 md:inset-auto md:left-1/2 md:transform md:-translate-x-1/2 bottom-1/2 md:bottom-full mb-2 mx-4 md:mx-0 w-auto md:w-72 max-w-[calc(100vw-2rem)] md:max-w-none z-50 animate-fade-in">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm rounded-lg p-3 shadow-xl shadow-orange-500/20">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
            </div>
            <div className="ml-2">
              <p className="mt-1 text-white/95">
                Not all projects are shared here. Some include admin panels that are private.
              </p>
            </div>
          </div>
          {/* Pointeur du tooltip - seulement sur desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-full">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-orange-500"></div>
          </div>
          
          {/* Bouton fermer sur mobile */}
          <div className="md:hidden mt-3 text-center">
          </div>
        </div>
      </div>
    </>
  )}
</div>
              
            </div>
          </div>
        </ScrollAnimation>

        {/* Reste du code inchangé... */}
        {/* Grille des projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <ScrollAnimation 
              key={project.id} 
              delay={index * 150} 
              direction="up" 
              duration={700}
            >
              <div 
                className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-2 hover:translate-x-1"
                onClick={() => handleProjectClick(project.id)}
              >
                {/* Titre superposé sur l'image */}
                <div className="absolute bottom-4 left-4 z-20">
                  <h3 className="text-white font-bold text-xl drop-shadow-lg transition-transform duration-300 ease-out group-hover:translate-x-2">
                    {project.title}
                  </h3>
                </div>

                {/* Conteneur d'image */}
                <div className="h-80 overflow-hidden relative">
                  {/* Image du projet */}
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                  
                  {/* Overlay sur l'image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 transition-opacity duration-200 ease-out group-hover:opacity-90"></div>
                  
                  {/* Effet de brillance orange */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500/0 via-orange-400/10 to-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"></div>
                  
                  {/* Ligne orange animée en bas */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></div>
                </div>

                {/* Effet 3D d'inclinaison - RÉDUIT */}
                <div className="absolute inset-0 transition-all duration-400 ease-out transform group-hover:rotate-1 group-hover:skew-y-[-0.5deg] pointer-events-none"></div>
                
                {/* Effet de bordure glow */}
                <div className="absolute inset-0 border-2 border-transparent rounded-2xl transition-all duration-400 ease-out group-hover:border-orange-500/30 group-hover:shadow-[0_0_20px_rgba(251,146,60,0.2)] pointer-events-none"></div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Bouton More Projects */}
        <ScrollAnimation delay={600} direction="fade" duration={1000}>
          <div className="text-center">
            <button className="group relative bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 px-12 rounded-full overflow-hidden transition-all duration-250 ease-out hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25">
              
              {/* Fond animé */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-250 ease-out"></div>
              
              {/* Effet de brillance qui passe */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out"></div>
              
              {/* Contenu du bouton */}
              <div className="cursor-pointer relative z-10 flex items-center justify-center">
                <span className="transition-all duration-250 ease-out group-hover:tracking-wider group-hover:translate-x-1">
                  More Projects
                </span>
                <svg 
                  className="w-6 h-6 ml-3 transition-all duration-250 ease-out transform group-hover:rotate-90 group-hover:scale-110 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              
              {/* Effet de bordure animée */}
              <div className="absolute inset-0 border-2 border-transparent rounded-full transition-all duration-250 ease-out group-hover:border-white/20"></div>
              
              {/* Effet de glow externe */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400/0 via-orange-500/20 to-orange-600/0 rounded-full blur opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out"></div>
              
            </button>
            
            {/* Texte informatif */}
            <p className="text-gray-500 mt-6 text-sm transition-all duration-300 ease-out opacity-80 hover:opacity-100 hover:text-gray-700">
              Click on any project to view detailed case study
            </p>
          </div>
        </ScrollAnimation>

      </div>
    </section>
  );
};

export default Portfolio;