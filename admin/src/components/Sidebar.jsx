import React, { useState } from 'react';
import { FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Hamburger à GAUCHE - TOUJOURS 3 barres */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        {/* TOUJOURS FaBars, ne change pas en X */}
        <FaBars size={20} />
      </button>

      {/* Sidebar Desktop */}
      <div className="hidden md:block w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white h-full shadow-xl fixed left-0 top-0">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center">
            <div>
              <h2 className="font-bold text-xl">Admin Panel</h2>
              <p className="text-gray-400 text-sm">Portfolio Contacts</p>
            </div>
          </div>
        </div>

        <div className="py-6">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center px-6 py-4 hover:bg-gray-700 transition-colors border-l-4 border-orange-500"
          >
            <FaEnvelope className="text-xl mr-4" />
            <span className="font-medium">Contacts</span>
          </button>
        </div>
      </div>

      {/* Sidebar Mobile */}
      <div className={`
        md:hidden fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Overlay */}
        {isMobileOpen && (
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
        
        {/* Sidebar content - AVEC le bouton X DEDANS */}
        <div className="relative w-64 h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl">
          {/* Header AVEC bouton X */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-xl">Admin Panel</h2>
                <p className="text-gray-400 text-sm">Portfolio Contacts</p>
              </div>
              {/* X pour fermer le sidebar */}
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 hover:bg-gray-700 rounded-lg"
              >
                <FaTimes size={20} />
              </button>
            </div>
          </div>

          <div className="py-6">
            <button
              onClick={() => {
                navigate('/');
                setIsMobileOpen(false);
              }}
              className="w-full flex items-center px-6 py-4 hover:bg-gray-700 transition-colors border-l-4 border-orange-500"
            >
              <FaEnvelope className="text-xl mr-4" />
              <span className="font-medium">Contacts</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;