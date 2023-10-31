import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import Speech from "react-speech";
// import Navbar from "./NavBar";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [timer, setTimer] = useState(6);
  const [timer0, setTimer0] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false);
  const [value, setValue] = useState(0);
  const audioRef = React.useRef(); // Initialize audioRef within the component

  const array = ['ML.mp3', 'abc.mp3', 'abd.mp3']
  const [audioIndex, setAudioIndex] = useState(0); // Track the current audio index
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();



  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }

    if (timer0 === false) {
      handleSubmit();
    }
  }, [timer0]);
  const handleSubmit = async () => {

    const imageSrc = webcamRef.current.getScreenshot();

    try {
      const response = await axios.post("http://localhost:3001/api/user", {
        name: username,
        pin: password,
        image: imageSrc,
      });

      if (response.status === 201) {
        alert("Registration Success");
        let utterance = new SpeechSynthesisUtterance("Registration Success");
        speechSynthesis.speak(utterance);

      }
      if (response.status === 404) {
        alert("Registration Failed");
        let utterance = new SpeechSynthesisUtterance("Registration Failed");
        speechSynthesis.speak(utterance);
      }
    } catch (error) {

      console.error("Error while making the API call:", error);
    }
  };

  const gotoLoginPage = () => navigate("/");


  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  const webcamRef = React.useRef(null);

  const handleSpaceBarPress = () => {
    startListeningOnClick();
  };


  const startListeningOnClick = () => {
    SpeechRecognition.startListening();
    // Check if the transcript includes the word "name"
    if (transcript.toLowerCase().includes("name")) {
      // Extract the name from the transcript (assuming the name follows "name is" pattern)
      const nameIndex = transcript.toLowerCase().indexOf("name is");
      if (nameIndex !== -1) {
        const name = transcript.substring(nameIndex + 7); // Extract the name after "name is"
        setUsername(name.trim()); // Set the extracted name in the username field
        console.log(name.trim());
      }
    }
    if (transcript.toLowerCase().includes("password")) {
      // Extract the name from the transcript (assuming the name follows "name is" pattern)
      const nameIndex = transcript.toLowerCase().indexOf("password is");
      if (nameIndex !== -1) {
        const name = transcript.substring(nameIndex + 11); // Extract the name after "name is"
        setPassword(name.trim()); // Set the extracted name in the username field
        console.log(name.trim());
      }
    }
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " " || e.keyCode === 32) {
        // Check if the pressed key is the space bar
        // e.preventDefault(); // Prevent the space bar from scrolling the page
        startListeningOnClick();

      }
      if (e.key === "Enter" || e.keyCode === 13) {
        // Check if the pressed key is the space bar
        // e.preventDefault(); // Prevent the space bar from scrolling the page

        audioRef.current.play();

      }
    };

    // Add the event listener when the component mounts
    document.addEventListener("keydown", handleKeyDown);

    // // Remove the event listener when the component unmounts
    // return () => {
    //   document.removeEventListener("keydown", handleKeyDown);
    // };
  }, []);


  // Conditionally render the webcam part only if username and password are not empty
  const renderWebcam = username !== "" && password !== "";
  useEffect(() => {
    if (renderWebcam) {
      const interval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        }
        else {
          setTimer0(false)
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer, renderWebcam]);

  const playAudio = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const stopAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const pauseAudio = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };
  return (
    <div>
      {/* <Navbar /> */}
      <div className="signup__container">
        <h2>ලියාපදිංචි කරන්න </h2>
        < button className="abc123" onClick={handleSpaceBarPress}></button>

        {renderWebcam && (
          <div className="container">
            {timer0 && (
              <div className="timer-container">{timer}</div>
            )}
            <Webcam
              audio={false}
              height={200}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={400}
              videoConstraints={videoConstraints}
            />

          </div>
        )}
        <form className="signup__form" onSubmit={handleSubmit}>
          <label htmlFor="email">නම</label>
          <input
            type="text"
            name="text"
            id="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="tel">මුරපදය</label>
          <input
            type="password"
            name="password"
            id="password"
            minLength={4}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />


          < button className="signupBtn" onClick={handleSubmit}>ලියාපදිංචි වන්න</button>

        </form>

        {/* <button onClick={playAudio}>Play</button>
            <button onClick={stopAudio}>Stop</button> */}
        <audio
          ref={audioRef}
          src='reg.mp3'
          controls
          style={{
            width: '100%',
            marginTop: '20px',
            borderRadius: '5px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#f5f5f5',
            padding: '10px',
            display: 'none'
          }}
        />
        <div>
          <p>Microphone: {listening ? "on" : "off"}</p>
          {/* <button onClick={handleSpaceBarPress}>Start</button>
          <button onClick={SpeechRecognition.stopListening}>Stop</button>
          <button onClick={resetTranscript}>Reset</button> */}
          <p>{transcript}</p>

        </div>
        <p>
          දැනටමත් ගිණුමක් ඇත?{" "}
          <span className="link" onClick={gotoLoginPage}>
            ඇතුලු වන්න
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
