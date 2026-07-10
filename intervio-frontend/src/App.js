import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import WelcomeScreen from "./Components/WelcomeScreen";
import Login from "./Components/Login";
import Home from "./Components/Home"
import Signup from "./Components/Signup";
import InterviewState from '../src/context/interview/InterviewState'
import TopicDetails from "./Components/TopicDetails";
import LiveInterview from "./Components/LiveInterview";
import InterviewResults from "./Components/InterviewResults";

function App() {
  return (
    <>
    <InterviewState>
      <Router>
        <Routes>
          <Route path='/' element={<WelcomeScreen/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path="/topic/:topicSlug" element={<TopicDetails />} />
          <Route path="/interview/:id" element={<LiveInterview />} />
          <Route path="/results/:id" element={<InterviewResults />} />
        </Routes>
      </Router>
    </InterviewState>
    </>
  );
}

export default App;
