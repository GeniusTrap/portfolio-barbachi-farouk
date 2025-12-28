import React, { useState, useRef } from 'react';
import { FaDownload, FaTimes, FaLock, FaCheck, FaTimesCircle, FaKey } from 'react-icons/fa';

const DownloadModal = ({ isOpen, onClose, onDownload }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef(null);

  const CV_FILENAME = import.meta.env.VITE_CV_FILENAME || "Barbachi_Farouk_CV.pdf";

  const handleSubmit = (e) => {
  e.preventDefault();
  
  setError('');
  setLoading(true);
  
  const SECRET_CODE = import.meta.env.VITE_CV_ACCESS_CODE;
  
  if (!code.trim()) {
    console.warn('⚠️ Code vide');
    setError('Please enter the access code');
    inputRef.current?.focus();
    setLoading(false);
    return;
  }
  
  if (code !== SECRET_CODE) {
    console.warn('❌ Code incorrect');
    setError('Invalid access code');
    setCode('');
    inputRef.current?.focus();
    setLoading(false);
    return;
  }
  
  
  setTimeout(() => {
    setLoading(false);
    setSuccess(true);
    
    setTimeout(() => {
      onDownload();
      onClose();
      setCode('');
      setSuccess(false);
    }, 1000);
  }, 800);
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
        
        {/* En-tête */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center mr-4">
                <FaKey className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Protected CV Download</h2>
                <p className="text-gray-600 text-sm">Enter access code to proceed</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheck className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Access Granted!</h3>
              <p className="text-gray-600">Farouk's CV is being downloaded...</p>
              <p className="text-sm text-gray-500 mt-2">Filename: {CV_FILENAME}</p>
            </div>
          ) : (
            <>
              <div className="mb-6 text-center">

                <p className="text-gray-700 mb-3">
                  This CV is password protected for authorized access only.
                </p>
                <p className="text-sm text-gray-500">
                  Contact me directly to request the access code.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Enter 4-digit Access Code
                  </label>
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="password"
                      value={code}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                        setCode(value);
                        setError('');
                      }}
                      placeholder="• • • •"
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition text-center text-2xl tracking-widest font-mono font-bold"
                      maxLength="4"
                      autoFocus
                      inputMode="numeric"
                      pattern="\d{4}"
                    />
                    <div className="absolute left-4 top-4 text-gray-400">
                      <FaLock />
                    </div>
                    <div className="absolute right-4 top-4 text-gray-400 text-sm">
                      {code.length}/4
                    </div>
                  </div>
                  
                  {error && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center animate-modal-shake">
                      <FaTimesCircle className="text-red-500 mr-2 flex-shrink-0" />
                      <span className="text-red-600 text-sm">{error}</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition hover:border-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || code.length !== 4}
                    className={`flex-1 py-3 rounded-xl font-medium transition flex items-center justify-center ${
                      code.length === 4 && !loading
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-md hover:shadow-lg'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <FaDownload className="mr-2" />
                        Download CV
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Pied de page avec info */}
        {/* Pied de page avec contact */}
<div className="px-6 py-4 bg-gradient-to-r from-orange-50 to-orange-100 border-t border-orange-200">
  <div className="text-center">
    <p className="text-gray-700 text-sm font-medium mb-2">
      Need the access code?
    </p>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
      <p className="text-gray-600 text-sm">
        Contact me at:
      </p>
      <a 
        href="mailto:contact@barbachifarouk.com" 
        className="text-orange-600 hover:text-orange-700 font-bold text-sm transition-colors flex items-center"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        faroukbarbachi@gmail.com
      </a>
    </div>
    <p className="text-gray-500 text-xs mt-2">
      I'll provide you with the access code
    </p>
  </div>
</div>
      </div>
    </div>
  );
};

export default DownloadModal;