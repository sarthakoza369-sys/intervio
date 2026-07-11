import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import WelcomeScreen from "./Components/WelcomeScreen";
import Login from "./Components/Login";
import Home from "./Components/Home"
import Signup from "./Components/Signup";
import InterviewState from '../src/context/interview/InterviewState'
import TopicDetails from "./Components/TopicDetails";
import LiveInterview from "./Components/LiveInterview";
import InterviewResults from "./Components/InterviewResults";
import AlertState from "./context/alert/AlertState";
import Alert from "./Components/Alert";

const ProtectedRoute = ({children})=>{
  const token = localStorage.getItem('token');

  //If no token exists, immediately redirect to landing page instead of flashing
  if(!token){
    return <Navigate to='/' replace/>
  } 
  return children;
}

function App() {
  return (
    <>
   <AlertState>
    <InterviewState>
      <Alert />
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>

          {/* Public Entry Points */}
          <Route path='/' element={<WelcomeScreen/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>

          {/* Protected Dashboards (Wrapped Safe) */}
          <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="/topic/:topicSlug" element={<ProtectedRoute><TopicDetails /></ProtectedRoute>} />
          <Route path="/interview/:id" element={<ProtectedRoute><LiveInterview /></ProtectedRoute>} />
          <Route path="/results/:id" element={<ProtectedRoute><InterviewResults /></ProtectedRoute>} />
        </Routes>
      </Router>
    </InterviewState>
  </AlertState>
    </>
  );
}

export default App;
