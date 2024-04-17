import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home";
import Contact from "./Pages/Contectus";
import About from "./Pages/About";
import Courses from "./Pages/Courses";
import ErrorPage from "./Pages/ErrorPage";
import Registration from "./Pages/Registration";
import EnrollmentStatus from "./Pages/EnrollmentStatus";
import Login from "./Pages/Login";
import Management from "./Pages/Management";
import StudentDashboard from "./Pages/StudentDashboard";
import Apps from "./Pages/Test";
import Transition from "./Pages/Transition"
import Payment from './Pages/Payment';
import ScrollToTop from './scroll';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/management" element={<Management />} />
        <Route path="/staff-login" element={<Login />} />
        <Route path="/student-dash" element={<StudentDashboard />} />  
        <Route path="/transition" element={<Transition />} />        
        <Route path="/payment" element={<Payment />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/regInfo" element={<EnrollmentStatus/>}/>
        <Route path="/registration" element={<Registration />} />
        <Route path="/test" element={<Apps />} />
      </Routes>
    </Router>

  );
}

export default App;
