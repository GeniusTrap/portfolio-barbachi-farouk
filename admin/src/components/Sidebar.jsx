import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white h-full shadow-xl">
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
  );
};

export default Sidebar;