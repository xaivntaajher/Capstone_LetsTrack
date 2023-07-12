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

  const IP_ADDRESS = "3.134.97.22"

  const BASE_URL = `http://${IP_ADDRESS}:8000`

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
        <Route path="/events" element={<EventListPage BASE_URL={BASE_URL}/>} />
        <Route path="/events/:event_id" element={<EventDetailPage BASE_URL={BASE_URL}/>} />
        <Route exact path="/students" element={<StudentListPage BASE_URL={BASE_URL}/>} />
        <Route path="/student/:id" element={<StudentDetailPage BASE_URL={BASE_URL}/>} />
        <Route path="/promotion" element={<PromotionPage BASE_URL={BASE_URL}/>} />
        <Route path="/" element={<PrivateRoute><StudentList BASE_URL={BASE_URL}/></PrivateRoute>} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
