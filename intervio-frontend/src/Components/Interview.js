import React, { useContext, useEffect, useState } from 'react';
import InterviewContext from '../context/interview/interviewContext';
import TopicCardItem from './TopicCardItem';

const VALID_TOPICS = [
    'JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB',
    'MERN Stack', 'HTML/CSS', 'Data Structures',
    'Operating Systems', 'DBMS', 'OOP', 'HR Interview'
];

const Interview = () => {
    const context = useContext(InterviewContext);
    const { getDashboardInterview } = context;

    const [topicStats, setTopicStats] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            const result = await getDashboardInterview();
            if (result.success) {
                setTopicStats(result.topicStats);
            }
        };
        fetchStats();
    }, []);

    return (
        // Added deep background, padding, and layout wrappers to fix the look completely
        <div className="min-h-screen bg-[#0B0F19] p-8 md:p-12 text-white relative overflow-hidden">
            {/* Ambient Background Lights */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="mb-10">
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100">
                        Interview Prep Tracks
                    </h1>
                    <p className="text-sm text-slate-400 mt-1 font-light">
                        Select a domain to review your metrics or start an AI-powered simulation panel.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {VALID_TOPICS.map((topic) => {
                        const stats = topicStats.find(t => t._id === topic);
                        return (
                            <TopicCardItem 
                                key={topic}
                                title={topic}
                                count={stats ? stats.count : 0}
                                avgScore={stats ? stats.avgScore : null}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Interview;