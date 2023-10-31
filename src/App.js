import React, { useEffect, useState } from "react";

import Navbar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";
import Predict from "./pages/Predict";
import Profile from "./pages/Profile";
import AudioPlayer from "./pages/Recommendation/AudioPlayer";
import AudioBooksPage from "./pages/Recommendation/AudioBooksPage";
import Recommendations from "./pages/Recommendation/Recommendations";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import AboutUs from "./pages/AboutUs/About";
import Quiz from "./pages/ColorPrediction/Quiz";
import FontSelector from "./pages/ColorPrediction/FontSize/FontSizeQuiz";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import axios from "axios";

function App() {
  const [overlayType, setOverlayType] = useState("");
  const [sevierity, setSevierity] = useState("");
  const [overlayOnOff, setOverlayOnOff] = useState(true);
  const [fontConfigurations, setFontConfigurations] = useState("");
  const [topicfontconfigurations, setTopicfontconfigurations] = useState("");

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

    const userid = 9;

    axios
      .get(`https://listened.onrender.com/usermanagement/${userid}`)
      .then((res) => {
        console.log(res.data);
        setFontConfigurations(res.data.fontconfig);
        setTopicfontconfigurations(res.data.topicfontconfig);

        const fontConfigurations = JSON.stringify(res.data.fontconfig);
        const topicfontconfigurations = JSON.stringify(
          res.data.topicfontconfig
        );

        localStorage.setItem("fontconfigurations", fontConfigurations);
        localStorage.setItem(
          "topicfontconfigurations",
          topicfontconfigurations
        );

        console.log(res.data.fontconfig);
      });

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
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
  };

  const newStyles = {
    position: "fixed",
    bottom: "20px", // Adjust this value to control the vertical position
    right: "20px", // Adjust this value to control the horizontal position
    zIndex: "1000",
  };

  const onOff = () => {
    setOverlayOnOff(!overlayOnOff);
  };

  const removeAll = () => {
    localStorage.removeItem("dataKey");
    window.location.reload();
  };

  return (
    <div>
      {overlayType && (
        <div className="row" style={newStyles}>
          <div className="col-md-6">
            <button onClick={onOff} style={buttonStyle}>
              {overlayOnOff ? "වර්ණ ආවරණය ඉවත් කරන්න" : "වර්ණ ආවරණය යොදන්න"}
            </button>
          </div>

          <div className="col-md-6">
            <button style={buttonStyle} onClick={removeAll}>
              වර්ණ ආවරණය ඉවත් sampurnaye කරන්න
            </button>
          </div>
        </div>
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
          <Route path="/:id" element={<AudioPlayer />} />
          <Route path="/books-home" element={<AudioBooksPage />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/fontselect" element={<FontSelector />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
