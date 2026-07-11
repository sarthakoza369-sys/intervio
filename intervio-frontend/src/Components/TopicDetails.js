import React,{useState, useEffect, useContext} from 'react'
import InterviewContext from '../context/interview/interviewContext'
import { useParams, Link } from 'react-router-dom'
import { TOPIC_SLUG_MAP } from '../utils/topicSlugMap'
import { useNavigate } from 'react-router-dom'

const TopicDetails = () => {

   const navigate = useNavigate();
   const {topicSlug} = useParams();

    const topic = TOPIC_SLUG_MAP[topicSlug];

    const context = useContext(InterviewContext);
    const {getInterviewByTopic, startInterview } = context;

    const [starting, setStarting] = useState(false);
    const [interviews, setInterviews] = useState([]);
    const [showDifficultyPicker, setShowDifficultyPicker] = useState(false);

     useEffect(() => {
        const fetchInterviews = async () => {
            const result = await getInterviewByTopic(topic);
            if (result.success) {
                setInterviews(result.interviewsWithQuestions);
            }
        };
        fetchInterviews();
    }, []);

        const handleDifficultySelect = async (difficulty) => {
            setStarting(true);
            const result = await startInterview(topic, difficulty);
            setStarting(false);
        
            if (result.success) {
                navigate(`/interview/${result.interview._id}`);
            } else {
                alert(result.error || "Could not start interview.");
            }
        };
    
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-6 md:p-12 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        <div className="mb-6">
          <Link 
            to="/home" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-indigo-400 transition-colors bg-slate-950/40 border border-slate-800/60 rounded-lg px-3 py-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        <header className="mb-10 pb-6 border-b border-slate-800/60 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 md:text-4xl bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              {topic}
            </h1>
            <p className="text-sm text-slate-400 mt-1.5 font-light">
              Review history logs or initiate live assessment simulations for this profile track.
            </p>
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowDifficultyPicker(prev => !prev)}
              className="h-11 bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-95 text-white text-sm font-semibold px-5 rounded-xl shadow-lg shadow-indigo-500/15 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Start New AI Mock
            </button>

            {showDifficultyPicker && (
              <div className="absolute right-0 mt-2 w-48 bg-[#121824] border border-slate-800 rounded-xl shadow-xl p-2 z-20">
                {['Easy', 'Medium', 'Hard'].map((level) => (
                  <button
                    key={level}
                    onClick={() => handleDifficultySelect(level)}
                    disabled={starting}
                    className="w-full text-left px-3 py-2 text-sm text-slate-200 rounded-lg hover:bg-indigo-500/10 hover:text-indigo-400 transition-colors disabled:opacity-50"
                  >
                    {starting ? 'Starting...' : level}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        {interviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-12 bg-[#121824] border border-slate-800/80 rounded-2xl border-dashed">
            <div className="w-12 h-12 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-center mb-4 text-slate-500">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-slate-200">No session footprint recorded</h3>
            <p className="text-xs text-slate-400 max-w-sm mt-1 font-light">
              You haven't attempted any {topic} mock technical evaluations yet. Kick off your first AI simulation now!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {interviews.map((item, index) => (
              <div 
                key={item.interview._id}
                onClick={() => navigate(`/results/${item.interview._id}`)}
                className="bg-[#121824] border border-slate-800/80 hover:border-slate-700/80 rounded-xl p-5 transition-all duration-200 flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-950/60 border border-slate-800 flex flex-col items-center justify-center">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Mock</span>
                    <span className="text-xs font-extrabold text-indigo-400 mt-[-2px]">{index + 1}</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                      Technical Assessment Session
                    </h4>
                    <p className="text-xs text-slate-400 font-light mt-0.5">
                      Questions Evaluated: <span className="text-slate-300 font-medium">{item.questions?.length || 0} items</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-[10px] block font-bold text-slate-500 uppercase tracking-wider mb-0.5">Score</span>
                    <span className="text-sm font-extrabold text-emerald-400">
                      {item.interview.overallScore ? `${item.interview.overallScore.toFixed(1)}/10` : 'Evaluating'}
                    </span>
                  </div>

                  <div className="w-7 h-7 rounded-lg bg-slate-950/40 border border-slate-800 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 transition-all duration-200 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 transform group-hover:translate-x-0.5 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default TopicDetails