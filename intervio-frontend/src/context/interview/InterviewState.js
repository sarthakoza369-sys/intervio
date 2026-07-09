import React,{useState} from 'react'
import InterviewContext from './interviewContext'

const InterviewState = (props) => {

    const host = "http://localhost:5000"

    const [interview, setInterview] = useState(null);
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(false);
 
    //START AN INTERVIEW
    const startInterview = async(topic, difficulty)=>{

        //API CALL
        const response = await fetch(`${host}/api/interview/start`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ topic, difficulty })
        });

        const json = await response.json();
        setLoading(false);

        if(response.ok){
            setInterview(json.interview);
            setQuestion(json.question);
            return {success: true}
        }else{
            return {success: false, error: json.error}
        }
    }

    //ANSWER A QUESTION
    const userAnswer = async(id, answer, questionId)=>{

        //API CALL
        const response = await fetch(`${host}/api/interview/${id}/answer`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body : JSON.stringify({answer, questionId}),
        });

        const json = await response.json();
        setLoading(false);

        if(response.ok){
            setQuestion(json.nextQuestion);
            return {success: true}
        }else{
            return { success: false, error: json.error };
        }
    }

    //STOP AN INTERVIEW
    
    const stopInterview = async(id)=>{

        //API CALL
        const response = await fetch(`${host}/api/interview/${id}/stop`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });

        const json = await response.json();
        setLoading(false);

        if(response.ok){
            setInterview(json.interview);
            return { success: true, questionsAnswered: json.questionsAnswered, reportCard: json.reportCard }
        }else{
            return { success: false, error: json.error };
        }
    }

    //GET ALL INTERVIEWS BASED ON THEIR TOPICS
    const getInterviewByTopic = async(topic)=>{

        //API CALL
        const response = await fetch(`${host}/api/interview/topic/${topic}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });

        const json = await response.json();
        setLoading(false);

        if(response.ok){
            return { success: true, interviewsWithQuestions: json };
        }else{
            return { success: false, error: json.error };
        }
    }

    //GET ALL INTERVIEWS FOR DASHBOARD
    const getDashboardInterview = async()=>{

        //API CALL
        const response = await fetch(`${host}/api/interview/dashboard`,{
              method: 'GET',
                headers: {
                   'Content-Type': 'application/json',
                   'auth-token': localStorage.getItem('token')
             },
        });
        const json = await response.json();
        setLoading(false);

        if(response.ok){
            return {
                success: true, 
                totalInterviews: json.totalInterviews, 
                overallAvgScore: json.overallAvgScore,
                strongestTopic: json.strongestTopic,
                weakestTopic: json.weakestTopic,
                topicStats: json.topicStats
            }
        }else{
            return { success: false, error: json.error };
        }
    }

    const getSpecificInterview=async(id)=>{

        //API CALL
        const response = await fetch(`${host}/api/interview/${id}`,{
             method: 'GET',
             headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
          },
        });
        const json = await response.json();
        setLoading(false);

        if(response.ok){
            return {success: true, interview: json.interview, questions: json.questions}
        }else{
            return { success: false, error: json.error };
        }
    }
    
    return (
        <InterviewContext.Provider 
            value={{ 
                interview, 
                question, 
                loading, 
                startInterview, 
                userAnswer, 
                stopInterview, 
                getInterviewByTopic, 
                getDashboardInterview, 
                getSpecificInterview 
            }}
        >
            {props.children}
        </InterviewContext.Provider>
    )

}

export default InterviewState
