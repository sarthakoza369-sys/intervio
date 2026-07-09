import React from 'react';
import { Link } from 'react-router-dom';

const TopicCardItem = ({ title, count = 0, avgScore = null }) => {
  // Convert title to a clean URL slug (e.g., "Node.js" becomes "node.js", "HR Interview" becomes "hr-interview")
  const urlSlug = title.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link 
      to={`/topic/${urlSlug}`}
      className="bg-slate-900/40 border border-slate-800/80 hover:border-indigo-500/50 backdrop-blur-md rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-indigo-500/5 group cursor-pointer flex flex-col justify-between h-48 relative overflow-hidden"
    >
      {/* Decorative inner gradient flash on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative z-10">
        {/* Glowing Indicator Dot */}
        <div className="h-2 w-2 rounded-full bg-indigo-500 mb-4 shadow-lg shadow-indigo-500/50 group-hover:bg-emerald-400 group-hover:shadow-emerald-400/50 transition-all duration-300" />
        
        {/* Card Title */}
        <h3 className="text-xl font-bold tracking-tight text-slate-200 group-hover:text-white transition-colors duration-300">
          {title}
        </h3>

        {/* Stats Row: interview count + average score */}
        <div className="flex items-center gap-4 mt-3">
          <span className="text-xs text-slate-400">
            {count} {count === 1 ? 'interview' : 'interviews'}
          </span>
          <span className="text-xs text-slate-400">
            Avg: {avgScore !== null ? `${avgScore.toFixed(1)}/10` : '—'}
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between mt-4 relative z-10 pt-2 border-t border-slate-800/40 group-hover:border-indigo-500/20 transition-colors">
        <span className="text-xs font-medium text-slate-400 group-hover:text-indigo-400 transition-colors duration-300">
          View History
        </span>
        
        {/* Animated Arrow Icon */}
        <svg 
          className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-all duration-300" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

export default TopicCardItem;