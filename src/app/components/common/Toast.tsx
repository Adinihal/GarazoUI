'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideToast } from '../../reduxStore/appSlice';

const Toast = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toast = useSelector((state: any) => state.app.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (toast) {
      // Auto-dismiss the toast after 3.5 seconds globally
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toast, dispatch]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className={`fixed top-8 left-1/2 -translate-x-1/2 px-6 py-4 rounded-xl shadow-2xl z-[99999] flex items-center gap-3 transition-opacity duration-300 animate-in fade-in slide-in-from-top-4 ${isSuccess
        ? "bg-green-100 text-green-800 border-2 border-green-300"
        : "bg-red-100 text-red-800 border-2 border-red-300"
      }`}>
      {isSuccess ? (
        <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
        </svg>
      ) : (
        <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
      )}
      <span className="font-bold text-base sm:text-lg">{toast.message}</span>
    </div>
  );
};

export default Toast;
