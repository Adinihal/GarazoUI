'use client';
import React from 'react';
import { useSelector } from 'react-redux';

const Loader = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { isLoader, loaderMessage } = useSelector((state: any) => state.app);

  if (!isLoader) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/30 transition-opacity duration-300">
      <div className="bg-white px-10 py-8 rounded-3xl shadow-2xl flex flex-col items-center justify-center min-w-[280px] transform transition-all">
        <div className="relative flex items-center justify-center">
          {/* Outer rotating ring */}
          <div className="absolute w-16 h-16 border-4 border-t-blue-600 border-r-transparent border-b-indigo-600 border-l-transparent rounded-full animate-spin"></div>
          {/* Inner rotating ring */}
          <div className="absolute w-10 h-10 border-4 border-t-transparent border-r-purple-600 border-b-transparent border-l-teal-500 rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
          {/* Core pulsing dot */}
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
        
        {loaderMessage && (
          <p className="mt-8 text-sm sm:text-base text-gray-800 font-semibold tracking-wide animate-pulse text-center">
            {loaderMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loader;
