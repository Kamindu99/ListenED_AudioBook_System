import React, { useEffect, useState } from 'react'

import Navbar from './components/Navbar/NavBar'
import Footer from './components/Footer/Footer'
import Predict from './pages/Predict'
import Profile from './pages/Profile'
import AudioPlayer from './pages/Recommendation/AudioPlayer'
import AudioBooksPage from './pages/Recommendation/AudioBooksPage'
import Recommendations from './pages/Recommendation/Recommendations'
import Home from './pages/Home/Home'
import Search from './pages/Search/Search'
import AboutUs from './pages/AboutUs/About'
import Quiz from "./pages/ColorPrediction/Quiz";
import FontSelector from "./pages/ColorPrediction/FontSize/FontSizeQuiz";

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Signup from './pages/Login/Signup'


function App() {

  const [overlayType, setOverlayType] = useState("");
  const [sevierity, setSevierity] = useState("");
  const [overlayOnOff, setOverlayOnOff] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("dataKey")) {
      const userData = JSON.parse(localStorage.getItem("dataKey"));
      console.log("overlay", userData);
      // setOverlayType(userData)
      if (Array.isArray(userData) && userData.length > 0) {
        const overlayType = userData[0]; // Extract the first element from the array
        setOverlayType(overlayType);
        console.log("overlay", overlayType);
      }
    }

    if (localStorage.getItem("severity")) {
      const Severity = JSON.parse(localStorage.getItem("severity"));
      console.log("severity", Severity);
      if (Severity === "Mild") {
        setSevierity(0.15);
      }
      if (Severity === "Moderate") {
        setSevierity(0.4);
      }
      if (Severity === "Severe") {
        setSevierity(0.65);
      }
      if (Severity === "Strong") {
        setSevierity(0.7);
      }
      // python manage.py runserver
    }

    // localStorage.clear();
  }, [localStorage.getItem("dataKey"), overlayType]);

  const buttonStyle = {
    position: "fixed",
    bottom: "20px", // Adjust this value to control the vertical position
    right: "20px", // Adjust this value to control the horizontal position
    zIndex: "1000", // Set a higher z-index if needed to ensure the button is above other content
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
  };

  const onOff = () => {
    setOverlayOnOff(!overlayOnOff);
  };

  return (
    <div>

      {overlayType && (
        <button onClick={onOff} style={buttonStyle}>
          {overlayOnOff ? "වර්ණ ආවරණය ඉවත් කරන්න" : "වර්ණ ආවරණය යොදන්න"}
        </button>
      )}

      <div
        className={`${overlayOnOff ? "color-overlay" : ""}`}
        style={{
          backgroundColor: overlayOnOff
            ? `rgba(${overlayType}, ${sevierity})`
            : "transparent",
        }}
      ></div>

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/audio-player/:id" element={<AudioPlayer />} />
          <Route path="/books-home" element={<AudioBooksPage />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/fontselect" element={<FontSelector />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App