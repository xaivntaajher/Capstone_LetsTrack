// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import EventListPage from "./pages/EventListPage/EventListPage";
import StudentListPage from "./pages/StudentListPage/StudentListPage";
import StudentDetailPage from "./pages/StudentDetailPage/StudentDetailPage";
import PromotionPage from "./pages/PromotionPage/PromotionPage";
import EventDetailPage from "./pages/EventDetailPage/EventDetailPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import StudentList from "./components/StudentList/StudentList";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";



function App() {
  return (
    <div className="background">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/events" element={<EventListPage />} />
        <Route path="/events/:event_id" element={<EventDetailPage />} />
        <Route exact path="/students" element={<StudentListPage />} />
        <Route path="/student/:id" element={<StudentDetailPage />} />
        <Route path="/promotion" element={<PromotionPage />} />
        <Route path="/" element={<PrivateRoute><StudentList /></PrivateRoute>} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
