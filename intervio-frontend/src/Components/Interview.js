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
        <div className="grid grid-cols-3 gap-6">
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
    );
}

export default Interview;