import React from 'react';
import { Link } from 'react-router-dom';

const TopicCardItem = ({ title, count = 0, avgScore = null }) => {
  // Convert title to a clean URL slug (e.g., "Node.js" becomes "node.js", "HR Interview" becomes "hr-interview")[cite: 2]
  const urlSlug = title.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link 
      to={`/topic/${urlSlug}`}
      className="bg-[#151c2c] border border-slate-700/50 hover:border-indigo-500/80 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-[0_0_30px_rgba(99,102,241,0.18)] group cursor-pointer flex flex-col justify-between h-44 relative overflow-hidden text-white"
    >
      {/* Decorative inner gradient flash on hover */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.08),transparent_55%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          {/* Card Title */}
          <h3 className="text-lg font-extrabold tracking-tight text-slate-100 group-hover:text-indigo-400 transition-colors duration-300">
            {title}
          </h3>
          {/* Glowing Indicator Dot */}
          <div className="h-2 w-2 rounded-full bg-slate-600 group-hover:bg-indigo-400 group-hover:shadow-[0_0_12px_rgba(129,140,248,1)] transition-all duration-300" />
        </div>

        {/* Stats Row: interview count + average score */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="text-[11px] font-medium tracking-wide text-slate-300 bg-slate-950/60 border border-slate-800/80 rounded-lg px-2.5 py-1">
            {count} {count === 1 ? 'interview' : 'interviews'}
          </span>
          <span className="text-[11px] font-medium tracking-wide text-slate-300 bg-slate-950/60 border border-slate-800/80 rounded-lg px-2.5 py-1">
            Avg:{' '}
            <span className={avgScore !== null ? "text-emerald-400 font-bold" : "text-slate-400"}>
              {avgScore !== null ? `${avgScore.toFixed(1)}/10` : '—'}
            </span>
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between mt-4 relative z-10 pt-3 border-t border-slate-800/60 group-hover:border-indigo-500/20 transition-colors">
        <span className="text-xs font-semibold text-slate-400 group-hover:text-indigo-400 transition-colors duration-300">
          View History
        </span>
        
        {/* Animated Arrow Icon */}
        <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-slate-950/40 border border-slate-800 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all duration-300 shadow-sm">
          <svg 
            className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400 transform group-hover:translate-x-0.5 transition-all duration-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default TopicCardItem;