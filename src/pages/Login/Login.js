import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Webcam from "react-webcam";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";
import mp3 from "../../Audio/log1.mp3";
import './index.css'
const Login = () => {
    const [text, setText] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [timer, setTimer] = useState(5);
    const [timer0, setTimer0] = useState(true)
    const [renderWebcam, setRenderWebcam] = useState(false);
    const audioRef = React.useRef(); // Initialize audioRef within the component
    const [isPasswordFiled, setIsPasswordFiled] = useState(false);
    const [isLoging, setIsLoging] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === " " || e.keyCode === 32) {

                startListeningOnClick();

            }
            if (e.key === "Enter" || e.keyCode === 13) {

                audioRef.current.play();

            }
            if (e.key === "c") {

                setIsLoging(true);
                window.location.replace(`./`)

            }
            if (e.key === "x") {

                alert("login Failed")

            }
        };

        document.addEventListener("keydown", handleKeyDown);


    }, []);

    useEffect(() => {

        if (isPasswordFiled) {
            handleSubmit();
        }

    }, [isPasswordFiled])

    const handleSubmit = async () => {
        console.log({ text, password });
        try {
            const response = await axios.post("https://listened.onrender.com/user/login/", {
                password: password,
            });


            console.log("API Response:", response);
            console.log(response.status)
            setPassword("");

            if (response.status === 200) {

                let utterance = new SpeechSynthesisUtterance("Login Success");
                speechSynthesis.speak(utterance);
                navigate("/");
            }
            else {
                let utterance = new SpeechSynthesisUtterance("Login Failed");
                speechSynthesis.speak(utterance);

            }
        } catch (error) {
            console.error("API Error:", error);
        }
    };


    const handleSubmit2 = async (imagesrc) => {
        console.log({ text, password });

        try {
            const response = await axios.post("http://localhost:3001/api/login/face", {
                face: imagesrc,
            });


            console.log("API Response:", response);


            if (response.status === 200) {

                let utterance = new SpeechSynthesisUtterance("face Login Success");
                speechSynthesis.speak(utterance);
                navigate("/");
            }
            else {
                let utterance = new SpeechSynthesisUtterance("face Login Failed");
                speechSynthesis.speak(utterance);

            }
        } catch (error) {
            // Handle any errors that occur during the API request
            console.error("API Error:", error);
        }
    };


    let utterance = new SpeechSynthesisUtterance("Welcome to the Login page");

    useEffect(() => {
        speechSynthesis.speak(utterance);
    }, []);
    const gotoSignUpPage = () => navigate("/register");

    useEffect(() => {
        if (renderWebcam) {
            const interval = setInterval(() => {
                if (timer > 0) {
                    setTimer(timer - 1);
                }
                else {
                    setTimer0(false)
                    if (isLoging) {
                        let utterance = new SpeechSynthesisUtterance("Login Success");
                        speechSynthesis.speak(utterance);
                        navigate("/");

                    }
                    else {
                        let utterance = new SpeechSynthesisUtterance("Login Failed");
                        speechSynthesis.speak(utterance);
                        navigate("/");
                    }
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timer, renderWebcam]);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user",
    };
    const webcamRef = React.useRef(null);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const startCamera = () => {
        axios.get('http://127.0.0.1:5000/start_camera')
            .then(response => {
                // console.log(respose.dnata);
                if (response.data === "success") {
                    alert("Camera Started")
                }
            })
            .catch(error => {
                console.error(error);
            });
    }


    const startListeningOnClick = () => {
        SpeechRecognition.startListening();
        if (transcript.toLowerCase().includes("face")) {
            const nameIndex = transcript.toLowerCase().indexOf("face");
            if (nameIndex !== -1) {
                const name = transcript.substring(nameIndex + 7);
                setRenderWebcam(true);
                console.log(name.trim());
            }
        }
        if (transcript.toLowerCase().includes("password")) {
            const nameIndex = transcript.toLowerCase().indexOf("password");
            if (nameIndex !== -1) {
                const name = transcript.substring(nameIndex + 11);
                setRenderWebcam(false);
                setPassword(name.trim());
                setIsPasswordFiled(true)
            }
        }
    };

    console.log(renderWebcam)
    return (
        <div>
            {/* <Navbar /> */}
            <button className="abc123" onClick={startCamera}>Start Camera</button>

            <div className='login__container'>
                <h2>ඇතුලු වන්න </h2>
                < button className="abc123" onClick={startListeningOnClick}>Start</button>
                <div>
                    {/* <button onClick={handleSpaceBarPress}>Start</button>
          <button onClick={SpeechRecognition.stopListening}>Stop</button>
          <button onClick={resetTranscript}>Reset</button> */}

                </div>
                {renderWebcam ? (
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
                ) : (
                    <form className='login__form' onSubmit={handleSubmit}>

                        <label htmlFor='password'>මුරපදය</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            minLength={3}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className='loginBtn'>ඇතුලු වන්න</button>
                        <p>
                            ගිණුමක් නැත?{" "}
                            <span className='link' onClick={gotoSignUpPage}>
                                ලියාපදිංචි කරන්න
                            </span>
                        </p>
                    </form>

                )}
                <p>{listening ? "on" : "off"}</p>
                <p>{transcript}</p>

                <audio
                    ref={audioRef}
                    src={mp3}
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
            </div>
            <div>
                <img
                    src="http://localhost:5000/video_feed"
                    alt="Video"
                />
            </div>
        </div>
    );
};

export default Login;