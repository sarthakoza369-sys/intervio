import React, { useContext, useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import InterviewContext from '../context/interview/interviewContext';

const InterviewResults = () => {
    const { id } = useParams();
    const location = useLocation();

    const context = useContext(InterviewContext);
    const { getSpecificInterview } = context;

    const [interview, setInterview] = useState(location.state?.interview || null);
    const [reportCard, setReportCard] = useState(location.state?.reportCard || null);
    const [loading, setLoading] = useState(!location.state);

    useEffect(() => {
        if (!location.state) {
            const fetchData = async () => {
                const result = await getSpecificInterview(id);
                if (result.success) {
                    setInterview(result.interview);
                    setReportCard(result.questions);
                }
                setLoading(false);
            };
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center">
                <p className="text-slate-400">Loading results...</p>
            </div>
        );
    }

    if (!interview) {
        return (
            <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center">
                <p className="text-slate-400">Could not load this interview.</p>
            </div>
        );
    }

    // Filter out the trailing unanswered question generated right before stopping
    const answeredQuestions = (reportCard || []).filter(q => q.score !== undefined);

    return (
        <div className="min-h-screen bg-[#0B0F19] text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto">

                <Link
                    to="/home"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-indigo-400 transition-colors bg-slate-950/40 border border-slate-800/60 rounded-lg px-3 py-1.5 mb-8"
                >
                    Back to Dashboard
                </Link>

                <div className="bg-[#121824] border border-slate-800/80 rounded-2xl p-8 mb-8 text-center">
                    <p className="text-sm text-slate-400 mb-2">{interview.topic} · {interview.difficulty}</p>
                    <h1 className="text-5xl font-extrabold text-indigo-400 mb-2">
                        {interview.overallScore ? interview.overallScore.toFixed(1) : '0.0'}
                        <span className="text-2xl text-slate-500">/10</span>
                    </h1>
                    <p className="text-sm text-slate-400">
                        {answeredQuestions.length} questions answered
                    </p>
                </div>

                <div className="space-y-6">
                    {answeredQuestions.map((q, index) => (
                        <div key={q._id || index} className="bg-[#121824] border border-slate-800/80 rounded-xl p-6">
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-sm font-bold text-slate-200">
                                    Question {index + 1}
                                </h3>
                                <span className="text-sm font-extrabold text-emerald-400">
                                    {q.score !== undefined ? `${q.score}/10` : '—'}
                                </span>
                            </div>

                            <p className="text-sm text-slate-300 mb-3">{q.question}</p>

                            <div className="bg-slate-950/50 rounded-lg p-3 mb-4">
                                <p className="text-xs text-slate-500 mb-1">Your answer</p>
                                <p className="text-sm text-slate-300">{q.intervieweeAnswer}</p>
                            </div>

                            {q.strengths?.length > 0 && (
                                <div className="mb-3">
                                    <p className="text-xs font-semibold text-emerald-400 mb-1">Strengths</p>
                                    <ul className="text-xs text-slate-400 list-disc list-inside space-y-0.5">
                                        {q.strengths.map((s, i) => <li key={i}>{s}</li>)}
                                    </ul>
                                </div>
                            )}

                            {q.weaknesses?.length > 0 && (
                                <div className="mb-3">
                                    <p className="text-xs font-semibold text-amber-400 mb-1">Weaknesses</p>
                                    <ul className="text-xs text-slate-400 list-disc list-inside space-y-0.5">
                                        {q.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                                    </ul>
                                </div>
                            )}

                            {q.improvements?.length > 0 && (
                                <div className="mb-3">
                                    <p className="text-xs font-semibold text-indigo-400 mb-1">Improvements</p>
                                    <ul className="text-xs text-slate-400 list-disc list-inside space-y-0.5">
                                        {q.improvements.map((imp, i) => <li key={i}>{imp}</li>)}
                                    </ul>
                                </div>
                            )}

                            {q.idealAnswer && (
                                <div className="mt-3 pt-3 border-t border-slate-800/60">
                                    <p className="text-xs text-slate-500 mb-1">Ideal answer</p>
                                    <p className="text-xs text-slate-400">{q.idealAnswer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InterviewResults;