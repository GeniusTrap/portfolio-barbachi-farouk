import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import DownloadModal from './DownloadModal';

const Banner = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  
  const parts = [
    { text: "Hi, I'm ", color: "text-gray-800" },
    { text: "Barbachi Farouk ", color: "text-orange-500" },
    { text: "Web Developer", color: "text-gray-800" }
  ];
  
  const fullText = parts.map(p => p.text).join('');
  
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);
  
  useEffect(() => {
    let i = 0;
    const typingEffect = () => {
      if (i < fullText.length) {
        setDisplayedText(fullText.substring(0, i + 1));
        i++;
        setTimeout(typingEffect, 80);
      }
    };
    const timer = setTimeout(() => {
      typingEffect();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const renderTextWithColors = () => {
    let currentIndex = 0;
    let result = [];
    
    parts.forEach(part => {
      const partText = part.text;
      const displayedPart = displayedText.substring(currentIndex, currentIndex + partText.length);
      
      if (displayedPart.length > 0) {
        result.push(
          <span key={currentIndex} className={part.color}>
            {displayedPart}
          </span>
        );
      }
      
      currentIndex += partText.length;
    });
    
    return result;
  };

const handleDownloadCV = (filename = 'Barbachi_Farouk_CV.pdf') => {
  
  const cvFilename = import.meta.env.VITE_CV_FILENAME || filename;
  
  const baseUrl = window.location.origin;
  
  const cvUrl = `${baseUrl}/CV.pdf`;
  
  fetch(cvUrl, { method: 'HEAD' })
    .then(response => {
      
      if (!response.ok) {
        throw new Error(`Fichier non trouvable: ${response.status} ${response.statusText}`);
      }
      
      return fetch(cvUrl);
    })
    .then(response => {
      
      if (!response.ok) {
        throw new Error(`Erreur de téléchargement: ${response.status}`);
      }
      
      return response.blob();
    })
    .then(blob => {
      
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = cvFilename;
      a.style.display = 'none';
      
      a.addEventListener('click', () => {
      });
      
      document.body.appendChild(a);
      
      a.click();
      
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 100);
    })
    .catch(error => {
      console.error('❌ ERREUR dans handleDownloadCV:', error);
      console.error('- Message:', error.message);
      console.error('- Stack:', error.stack);
      
      alert(`Erreur de téléchargement:\n\n${error.message}\n\nVérifiez la console (F12) pour plus de détails.`);
    });
};

<DownloadModal 
  isOpen={showDownloadModal}
  onClose={() => setShowDownloadModal(false)}
  onDownload={handleDownloadCV}
/>

  return (
    <>
      <section id="home" className="pt-16 bg-gradient-to-b from-white to-gray-50 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 min-h-[4.5rem] md:min-h-[5.5rem]">
                {renderTextWithColors()}
                {displayedText.length === fullText.length && (
                  <span className="text-orange-500">{showCursor ? '.' : ' '}</span>
                )}
                {displayedText.length < fullText.length && (
                  <span className="text-orange-500 animate-pulse">|</span>
                )}
              </h1>
              
              <h2 className="text-2xl md:text-3xl text-gray-700 mb-6">
                Specialized in <span className="font-bold">MERN Stack</span>
              </h2>
              
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                I'm passionate about creating modern, responsive, and scalable web applications. 
                With expertise in MongoDB, Express.js, React.js, and Node.js, I bring ideas to life 
                with clean code and innovative solutions. Whether it's front-end design or back-end 
                architecture, I deliver high-quality digital experiences.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-lg">
                  View My Work
                </button>
                <button 
  onClick={() => {
    setShowDownloadModal(true);
  }}
  className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-medium py-3 px-8 rounded-full transition duration-300 flex items-center group"
>
  <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
  Download CV
</button>
              </div>
            </div>
            
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="relative w-96 h-96">
                  <div className="absolute inset-0 w-full h-full z-20">
                    <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl">
  <img 
    src={assets.smiling} 
    alt="Barbachi Farouk" 
    className="w-full h-full object-cover" 
    loading="lazy"
  />
</div>
                  </div>
                  
                  <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/2 w-16 h-16 bg-orange-200 rounded-full opacity-50 animate-orbit-outside" 
                         style={{ transform: 'translate(-50%, -50%)' }}>
                    </div>
                    
                    <div className="absolute bottom-0 left-1/2 w-20 h-20 bg-orange-100 rounded-full opacity-50 animate-orbit-inside"
                         style={{ transform: 'translate(-50%, 50%)' }}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de téléchargement */}
      <DownloadModal 
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        onDownload={handleDownloadCV}
      />
    </>
  );
};

export default Banner;