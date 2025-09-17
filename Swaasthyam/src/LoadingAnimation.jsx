import React from "react";

const LoadingAnimation = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-blue-100 z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <img
            src="./src/assets/logo 2.png"
            alt="Swaasthyam"
            className="h-16 w-16 mx-auto animate-pulse"
          />
        </div>
        
        {/* Loading spinner */}
        <div className="relative mb-6">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
        </div>
        
        {/* Loading text */}
        <p className="text-blue-700 font-medium text-lg mb-2">Swaasthyam</p>
        <p className="text-blue-600 text-sm animate-pulse">{message}</p>
        
        {/* Progress bar */}
        <div className="mt-6 w-48 mx-auto">
          <div className="h-1 bg-blue-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full animate-pulse" style={{
              animation: 'progress 2s ease-in-out infinite'
            }}></div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes progress {
          0% { width: 0% }
          50% { width: 70% }
          100% { width: 100% }
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;