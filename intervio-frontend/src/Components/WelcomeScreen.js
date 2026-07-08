import React from 'react';
import { Link } from 'react-router-dom';

const WelcomeScreen=()=> {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col justify-between relative overflow-hidden font-sans">
      
      {/* Decorative Background Elements (Modern Glassmorphism/Glow effects) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Navbar Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          {/* Futuristic Logo Icon */}
          <div className="h-9 w-9 bg-gradient-to-tr from-indigo-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 2 0 002-2V6a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            intervio<span className="text-indigo-400">.ai</span>
          </span>
        </div>
        
        <span className="text-xs text-slate-500 tracking-widest uppercase bg-slate-800/40 border border-slate-700/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
          Beta v1.0
        </span>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 relative z-10 max-w-4xl mx-auto">
        
        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-4 py-1.5 rounded-full mb-8 animate-fade-in shadow-inner">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-indigo-300 tracking-wide">
            Next-gen AI Interview Simulator
          </span>
        </div>

        {/* Hero Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
          Master your next interview with{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            absolute confidence.
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 font-light leading-relaxed">
          Practice realistic, real-time audio and technical interviews tailored to your target role. Get instant behavioral metrics, code reviews, and actionable feedback.
        </p>

        {/* Action Buttons using react-router-dom Link */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          
          <Link 
            to="/signup" 
            className="group relative w-full sm:w-52 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-medium tracking-wide flex items-center justify-center transition-all duration-300 hover:opacity-95 shadow-lg shadow-indigo-500/25 active:scale-[0.98]"
          >
            {/* Subtle glow border hover effect */}
            <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            Get Started Free
            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          <Link 
            to="/login" 
            className="w-full sm:w-52 h-14 bg-slate-900 border border-slate-800 rounded-xl font-medium tracking-wide flex items-center justify-center transition-all duration-300 hover:bg-slate-800/80 hover:border-slate-700 hover:text-indigo-300 active:scale-[0.98]"
          >
            Sign In to Account
          </Link>

        </div>
      </main>

      {/* Footer Design */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-8 text-center text-xs text-slate-600 relative z-10 border-t border-slate-900/60">
        &copy; {new Date().getFullYear()} Intervio AI. Built for developers and professionals worldwide.
      </footer>

    </div>
  );
}

export default WelcomeScreen;