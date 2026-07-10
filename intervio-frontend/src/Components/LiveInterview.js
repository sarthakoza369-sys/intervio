import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InterviewContext from '../context/interview/interviewContext';

const LiveInterview = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const context = useContext(InterviewContext);
    const { interview, question, loading, userAnswer, stopInterview, getSpecificInterview, setInterview,      setQuestion } = context;
    const [answerText, setAnswerText] = useState('');
    const [conversationLog, setConversationLog] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [ending, setEnding] = useState(false);

    // Safety net: if this page is opened directly (refresh, shared link)
    // and context has no active question, re-fetch the interview state.
    useEffect(() => {
    if (!question) {
        const fetchQuestion = async () => {
            const result = await getSpecificInterview(id);
            if (result.success && result.questions?.length) {
                // find the most recent unanswered question
                const pending = result.questions.find(q => q.score === undefined);
                setInterview(result.interview);
                setQuestion(pending);
            }
        };
        fetchQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

    const handleSubmitAnswer = async (e) => {
        e.preventDefault();
        if (!answerText.trim() || !question) return;

        setSubmitting(true);

        const currentQuestionText = question.question;
        const currentQuestionId = question._id;

        const result = await userAnswer(id, answerText, currentQuestionId);

        setSubmitting(false);

        if (result.success) {
            // Log the just-answered exchange (no feedback shown yet)
            setConversationLog(prev => [
                ...prev,
                { question: currentQuestionText, answer: answerText }
            ]);
            setAnswerText('');
        } else {
            alert(result.error || "Something went wrong submitting your answer.");
        }
    };

    const handleEndInterview = async () => {
        const confirmEnd = window.confirm("Are you sure you want to end this interview?");
        if (!confirmEnd) return;

        setEnding(true);
        const result = await stopInterview(id);
        setEnding(false);

        if (result.success) {
            navigate(`/results/${id}`, { state: { reportCard: result.reportCard, interview: result.interview } });
        } else {
            alert(result.error || "Something went wrong ending the interview.");
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0F19] text-white p-6 md:p-10 flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/60">
                <div>
                    <h1 className="text-xl font-bold text-slate-100">
                        {interview ? interview.topic : 'Interview'}
                    </h1>
                    <p className="text-xs text-slate-400">
                        {interview ? interview.difficulty : ''} difficulty
                    </p>
                </div>
                <button
                    onClick={handleEndInterview}
                    disabled={ending}
                    className="h-10 px-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-semibold rounded-lg hover:bg-red-500/20 transition-all disabled:opacity-50"
                >
                    {ending ? 'Ending...' : 'End Interview'}
                </button>
            </div>

            {/* Conversation log — past Q&A, no feedback shown */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-6 max-w-3xl mx-auto w-full">
                {conversationLog.map((exchange, index) => (
                    <div key={index} className="space-y-2">
                        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 max-w-[85%]">
                            <p className="text-xs text-indigo-400 font-semibold mb-1">Interviewer</p>
                            <p className="text-sm text-slate-200">{exchange.question}</p>
                        </div>
                        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 max-w-[85%] ml-auto">
                            <p className="text-xs text-slate-400 font-semibold mb-1">You</p>
                            <p className="text-sm text-slate-200">{exchange.answer}</p>
                        </div>
                    </div>
                ))}

                {/* Current, unanswered question */}
                {question && (
                    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 max-w-[85%]">
                        <p className="text-xs text-indigo-400 font-semibold mb-1">Interviewer</p>
                        <p className="text-sm text-slate-200">{question.question}</p>
                    </div>
                )}

                {!question && (
                    <p className="text-sm text-slate-500 text-center mt-10">Loading question...</p>
                )}
            </div>

            {/* Answer input */}
            <form onSubmit={handleSubmitAnswer} className="max-w-3xl mx-auto w-full flex gap-3">
                <textarea
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder="Type your answer..."
                    rows={3}
                    disabled={submitting || !question}
                    className="flex-1 bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/80 resize-none"
                />
                <button
                    type="submit"
                    disabled={submitting || !question || !answerText.trim()}
                    className="h-fit self-end bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold px-6 py-3 rounded-xl disabled:opacity-40 transition-all"
                >
                    {submitting ? 'Evaluating...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default LiveInterview;