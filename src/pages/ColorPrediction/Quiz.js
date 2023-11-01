import React, { useState, useEffect, useRef } from "react";
import QuizApp from "./QuizApp";
import image1 from "../../assets/images/new/color.jpg";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import yourAudioClip from "../../Audio/ishi1.m4a";
import yourAudioClip2 from "../../Audio/wrong.m4a";
import yourAudioClip3 from "../../Audio/beep1.mp3";
import audio4 from "../../Audio/5.m4a";
import audio5 from "../../Audio/4.m4a";

const apiKey = "AIzaSyAEhteVNE6ulr2RGCqlYmYKBvf1AgL09cM";

function Quiz() {
  // const [spokenText, setSpokenText] = useState("");
  // const { transcript, listening } = useSpeechRecognition();
  // const audioRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);

  const [fontSize, setfontSize] = useState("");
  const [fontSize1, setfontSize1] = useState("");
  const [fontWeight, setfontWeight] = useState("");
  const [fontWeight1, setfontWeight1] = useState("");
  const [fontStyle, setfontStyle] = useState("");
  const [fontStyle1, setfontStyle1] = useState("");

  useEffect(() => {
    // setfontSize(JSON.parse(localStorage.getItem("fontSize")));
    // setfontSize1(JSON.parse(localStorage.getItem("fontSize1")));
    // setfontWeight(JSON.parse(localStorage.getItem("fontWeight")));
    // setfontWeight1(JSON.parse(localStorage.getItem("fontWeight1")));
    // setfontStyle(JSON.parse(localStorage.getItem("fontStyle")));
    // setfontStyle1(JSON.parse(localStorage.getItem("fontStyle1")));

    const userid = localStorage.getItem("userId");

    axios
      .get(`https://listened.onrender.com/usermanagement/${userid}`)
      .then((res) => {
        console.log(res.data);
        setfontSize(res.data.fontconfig.fontSize);
        setfontWeight(res.data.fontconfig.fontWeight);
        setfontStyle(res.data.fontconfig.fontStyle);

        setfontSize1(res.data.topicfontconfig.fontSize1);
        setfontWeight1(res.data.topicfontconfig.fontWeight1);
        setfontStyle1(res.data.topicfontconfig.fontStyle1);
      });

    // let newObject = localStorage.getItem("topicfontconfigurations");
    // let newObject2 = localStorage.getItem("fontconfigurations");

    // console.log(JSON.parse(newObject), "function");
    // const topicData = JSON.parse(newObject);
    // const fontConfigurations = JSON.parse(newObject2);

    // console.log(topicData, "ssss");

    // setfontSize(fontConfigurations.fontSize);
    // setfontWeight(fontConfigurations.fontWeight);
    // setfontStyle(fontConfigurations.fontStyle);

    // setfontSize1(topicData.fontSize1);
    // setfontWeight1(topicData.fontWeight1);
    // setfontStyle1(topicData.fontStyle1);
  }, []);

  const [transcript, setTranscript] = useState("");
  const [translation, setTranslation] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [predNouns, setPredNouns] = useState("");
  const [err, setErr] = useState("");
  const recognition = new window.webkitSpeechRecognition();
  const [spacePressed, setSpacePressed] = useState(false);
  const [altPressed, setAltPressed] = useState(false);

  const [spokenText, setSpokenText] = useState("");

  useEffect(() => {
    const audio = new Audio(yourAudioClip);
    //audio.play();
  }, []);

  const synth = window.speechSynthesis;

  const audioRef = useRef(null);
  const audioRef2 = useRef(null);
  const audioRef3 = useRef(null);
  const audioRef4 = useRef(null);
  const audioRef5 = useRef(null);

  let spaceClicked = false;
  let shiftClicked = false;

  useEffect(() => {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "si-LK";

    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript;
      setTranscript(transcript);
      recognition.onend = () => {
        console.log("end");
        console.log(transcript);
        console.log(spacePressed);

        if (shiftClicked === true && spaceClicked === false) {
          //your function
          startVoiceRecognition();
        }

        if (spaceClicked === true) {
          translateText(transcript);
        }
      };
    };
    return () => {
      if (isListening) {
        recognition.stop();
      }
    };
  }, [isListening, recognition, spacePressed, altPressed]);

  useEffect(() => {
    const audio = new Audio(yourAudioClip);
    audio.play();
  }, []);

  const startListening = () => {
    // setSpacePressed(false);
    setErr(false);
    recognition.start();
    setIsListening(true);

    setTimeout(() => {
      stopListening();
    }, 3000);
  };

  const stopListening = () => {
    recognition.stop();
    setIsListening(false);
  };

  const translateText = async (text) => {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        target: "en",
        source: "si",
      }),
    });

    let translationTimeout = null;

    const data = await response.json();
    const translatedText = data.data.translations[0].translatedText;
    setTranslation(translatedText);
    clearTimeout(translationTimeout);
    translationTimeout = setTimeout(() => {
      sendTranslationToBackend(translatedText);
    }, 3000);
  };

  const sendTranslationToBackend = async (translatedText) => {
    const backendUrl = "http://127.0.0.1:8000/predict/";
    const translatedLow = translatedText.toLowerCase();

    try {
      const response = await axios.post(backendUrl, { text: translatedLow });
      const data = response.data;

      console.log("data", data);

      const sim = data.similar;

      if (data.predicted_verbs.length > 0) {
        const responseData = data.predicted_verbs[0];
        setPrediction(responseData);

        const nounData = data.nouns;
        setPredNouns(nounData);

        if (nounData.length > 0) {
          const nouns = nounData.join(" ");

          if (
            (responseData === "go" || sim.includes("go")) &&
            nouns === "data page"
          ) {
            window.location.href = "/profile";
            console.log("correct");
          } else if (responseData === "go" && nouns === "search") {
            window.location.href = "/search";
          } else if (
            (responseData === "go" || sim.includes("go")) &&
            nouns === "recommendations"
          ) {
            window.location.href = "/recommendations";
          } else if (
            (responseData === "go" || sim.includes("go")) &&
            nouns === "questionnaire"
          ) {
            window.location.href = "/quiz";
          } else {
            console.log("errr");
            setErr(true);
            playAudio2();
          }

          const synonyms = data.similar;
          if (synonyms.length > 0) {
            const syn = synonyms.join(" ");
            // Handle synonyms if needed
          }

          console.log("nnn nounData", nouns);
          console.log("rrr responseData", responseData);
        } else {
          console.log("No nouns");
          setErr(true);
          playAudio2();
        }
      } else {
        console.log("No verbs");
        setErr(true);
        playAudio2();
      }

      console.log("Backend response:", data);
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
  };

  const playAudio2 = () => {
    if (audioRef2.current) {
      audioRef2.current.play().catch((error) => {
        // Handle any errors that occur during playback
        console.error("Audio playback error:", error);
      });
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        // Handle any errors that occur during playback
        console.error("Audio playback error:", error);
      });
    }
  };

  const playAudio3 = () => {
    if (audioRef3.current) {
      audioRef3.current.play().catch((error) => {
        // Handle any errors that occur during playback
        console.error("Audio playback error:", error);
      });
    }
  };

  const start1 = () => {
    setSpacePressed(true);

    spaceClicked = true;
    console.log(spacePressed);
    startListening();
  };

  const handleKeyPress = (event) => {
    // Check if the Ctrl key is pressed (event.ctrlKey)
    if (event.ctrlKey) {
      event.preventDefault(); // Prevent spacebar from scrolling the page
      playAudio();
    }
    if (event.key === " ") {
      console.log("space");
      setSpacePressed(true);
      playAudio3();
      start1();

      event.preventDefault();
    }
    if (event.key === "Shift") {
      shiftClicked = true;
      console.log("shift");
      event.preventDefault();
      startVoiceRecognition();
    }
  };

  useEffect(() => {
    // Add an event listener for the space bar key press
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleSpokenText = (event) => {
    const text = event.results[0][0].transcript;

    const punctuationRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;
    const modifiedText = text.replace(punctuationRegex, "");

    setSpokenText(modifiedText);
  };

  const startVoiceRecognition = () => {
    console.log("startVoiceRecognition");
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "si-LK"; // Set the language to Sinhala (Sri Lanka)
    recognition.start();
    recognition.onresult = handleSpokenText;
  };

  useEffect(() => {
    if (spokenText) {
      console.log("ssssssssssප්රශ්නාවලිය අරඹන්න");
      // Check if spokenText matches book title
      const spokenTextWords = spokenText.toLowerCase().split(" ");

      if (spokenTextWords.includes("අරඹන්න")) {
        handleOpenModal();
        console.log("ප්රශ්නාවලිය අරඹන්න");
      }
    }
  }, [spokenText]);

  // useEffect(() => {
  //   if (!listening) {
  //     SpeechRecognition.startListening({ continuous: true });
  //   }
  //   return () => {
  //     SpeechRecognition.stopListening();
  //   };
  // }, [listening]);

  // useEffect(() => {
  //   const handleSpacebarClick = (event) => {
  //     if (event.key === "shift" && !listening) {
  //       startVoiceRecognition();
  //     }
  //   };
  //   window.addEventListener("keydown", handleSpacebarClick);
  //   return () => {
  //     window.removeEventListener("keydown", handleSpacebarClick);
  //   };
  // }, [listening]);

  // const handleShiftKeyDown = (event) => {
  //   if (event.keyCode === 16) {
  //     audioRef.current.play();
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("keydown", handleShiftKeyDown);
  //   return () => {
  //     window.removeEventListener("keydown", handleShiftKeyDown);
  //   };
  // }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {/* <h1>Quiz App</h1>
      <button onClick={handleOpenModal}>Start Quiz</button>
      <input /> */}

      <div className="text-center">
        <img src={image1} alt="No image" />
      </div>
      <div>
        <div className="container">
          <h1
            style={{
              fontSize: fontSize1,
              fontWeight: fontWeight1,
              fontStyle: fontStyle1,
            }}
            class="name-heading"
          >
            Ishihara වර්ණ දර්ශන පරීක්ෂණය
          </h1>
          {/* {spokenText && (
            <p className=" mt-4">ඔබගෙන් ලබාගත් හඬ ආදානය : {spokenText}</p>
          )} */}
          <div className="row">
            <div className="col-md-6">
              <p
                className="lead mt-4"
                style={{
                  fontSize: fontSize,
                  fontWeight: fontWeight,
                  fontStyle: fontStyle,
                }}
              >
                Ishihara වර්ණ දර්ශන පරීක්ෂණය ලෙසද හඳුන්වන Ishihara පරීක්ෂණය,
                විශේෂයෙන් වර්ණ පෙනීමේ ඌනතාවයන් හෝ වර්ණ අන්ධභාවය ඇති අය සඳහා වර්ණ
                හඳුනා ගැනීමට සහ වෙන්කර හඳුනා ගැනීමට පුද්ගලයෙකුගේ හැකියාව තක්සේරු
                කිරීමට භාවිතා කරන රෝග විනිශ්චය මෙවලමකි. එය 20 වන සියවසේ මුල්
                භාගයේදී ජපන් අක්ෂි වෛද්‍යවරයකු වන වෛද්‍ය ෂිනෝබු ඉෂිහාරා විසින්
                වැඩි දියුණු කරන ලද අතර එය වර්ණ පෙනීමේ දුර්වලතා සඳහා බහුලව භාවිතා
                වන පරීක්ෂණවලින් එකකි.
              </p>
            </div>

            <div className="col-md-6 ">
              <p
                className="lead mt-4 text-justify"
                style={{
                  fontSize: fontSize,
                  fontWeight: fontWeight,
                  fontStyle: fontStyle,
                }}
              >
                වර්ණ අන්ධතා පරීක්ෂණය වෙත පිවිසීම සදහා පහත බොත්තම ඔබන්න
              </p>
              <button className="btn btn-primary" onClick={handleOpenModal}>
                ප්‍රශ්නාවලිය අරඹන්න
              </button>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div>
          <div className="modal-backdrop show" onClick={handleCloseModal}></div>
          <div
            className="modal"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block" }}
          >
            <div
              className="modal-dialog modal-dialog-centered custom-width"
              role="document"
            >
              <div className="modal-content">
                <div
                  className="modal-header"
                  style={{ backgroundColor: "#FF4500" }}
                >
                  <h5 className="modal-title" style={{ color: "white" }}>
                    ඉෂිහාරා වර්ණ අන්ධතා පරීක්ෂණය
                  </h5>

                  <p onClick={handleCloseModal}>Close</p>
                </div>
                <div className="modal-body">
                  <QuizApp />
                  {/* <button onClick={ssss}> sss </button> */}
                </div>
                {/* <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}

      <audio id="myAudio" ref={audioRef} controls style={{ display: "none" }}>
        <source src={yourAudioClip} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <audio id="myAudio" ref={audioRef2} controls style={{ display: "none" }}>
        <source src={yourAudioClip2} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <audio id="myAudio" ref={audioRef3} controls style={{ display: "none" }}>
        <source src={yourAudioClip3} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <audio id="myAudio" ref={audioRef4} controls style={{ display: "none" }}>
        <source src={audio4} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <audio id="myAudio" ref={audioRef5} controls style={{ display: "none" }}>
        <source src={audio5} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* {modalOpen && (
        <div className="modal-bg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Quiz</h5>
              <button
                type="button"
                className="close"
                onClick={handleCloseModal}
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <QuizApp />
              <button onClick={ssss}> sss </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Quiz;
