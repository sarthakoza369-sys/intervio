import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import WelcomeScreen from "./Components/WelcomeScreen";
import Login from "./Components/Login";

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<WelcomeScreen/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
  );
}

export default App;
