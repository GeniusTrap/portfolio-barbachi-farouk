import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ onLogout }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 py-4 px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            <FaSignOutAlt />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;