import React, { useContext } from 'react';
import AlertContext from '../context/alert/AlertContext';

const Alert = () => {
  const context = useContext(AlertContext);
  const { alert } = context;

  if (!alert) return null;

  const isSuccess = alert.type === 'success';

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 animate-in fade-in slide-in-from-top-4 duration-300">
      <div 
        className={`backdrop-blur-md rounded-xl p-4 flex items-center gap-3 border shadow-2xl transition-all duration-300 ${
          isSuccess 
            ? 'bg-emerald-950/40 border-emerald-500/30 shadow-emerald-500/10' 
            : 'bg-rose-950/40 border-rose-500/30 shadow-rose-500/10'
        }`}
      >
        {/* Dynamic Status Icon Housing Box */}
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
          isSuccess 
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
            : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          {isSuccess ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )}
        </div>

        {/* Message Info Text Context */}
        <div className="flex-1">
          <p className={`text-xs font-bold tracking-wide uppercase ${isSuccess ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isSuccess ? 'Success' : 'Attention Required'}
          </p>
          <p className="text-slate-200 text-sm font-medium mt-0.5 leading-tight">
            {alert.msg}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Alert;