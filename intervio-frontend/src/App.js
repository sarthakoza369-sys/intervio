import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import WelcomeScreen from "./Components/WelcomeScreen";

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<WelcomeScreen/>}/>
        </Routes>
      </Router>
  );
}

export default App;
