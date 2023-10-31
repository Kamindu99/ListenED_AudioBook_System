import React, { useEffect } from "react";
import "./Home.css";
import react, { useRef, useState } from "react";
import AudiobookGif from "../../Audio/Audiobook.gif";
import Card from "./Card";
import yourAudioClip from "../../Audio/aaa.m4a";
import yourAudioClip2 from "../../Audio/wrong.m4a";
import yourAudioClip3 from "../../Audio/beep1.mp3";
import axios from "axios";
const apiKey = "AIzaSyAEhteVNE6ulr2RGCqlYmYKBvf1AgL09cM";

function Home() {
  const [transcript, setTranscript] = useState("");
  const [translation, setTranslation] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [predNouns, setPredNouns] = useState("");
  const [err, setErr] = useState("");
  const recognition = new window.webkitSpeechRecognition();
  const targetRef = useRef(null);
  const audioRef = useRef(null);
  const audioRef2 = useRef(null);
  const audioRef3 = useRef(null);

  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    // Start playing the audio when the component mounts
    const audio = new Audio(yourAudioClip);
    audio.play();
    // Optionally, you can add event listeners for audio control
    // For example, to pause the audio when the component unmounts
  }, []);

  const handleScrollToElement = () => {
    if (targetRef.current) {
      setTimeout(() => {
        targetRef.current.scrollIntoView({
          behavior: "smooth", // Smooth scrolling animation
        });
      }, 100); // Adjust the timeout duration as needed
    }
  };

  useEffect(() => {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "si-LK";

    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript;
      setTranscript(transcript);
      recognition.onend = () => {
        translateText(transcript);
      };
    };
    return () => {
      if (isListening) {
        recognition.stop();
      }
    };
  }, [isListening, recognition]);

  const startListening = () => {
    setErr(false);
    recognition.start();
    setIsListening(true);
    setIsButtonVisible(true);

    setTimeout(() => {
      stopListening();
    }, 3000);
  };

  const stopListening = () => {
    recognition.stop();
    setIsListening(false);
    setIsButtonVisible(false);
  };

  // useEffect(() => {
  //   // Play audio when the component mounts
  //   // const audioElement = new Audio(yourAudioClip);
  //   // audioElement.play();

  //   // // Optionally, you can pause the audio when the component unmounts
  //   // return () => {
  //   //   audioElement.pause();
  //   //   audioElement.currentTime = 0; // Reset the audio to the beginning
  //   // };
  //   handlePlayAudio();
  // }, []);

  // const handlePlayAudio = () => {
  //   if (audioRef.current) {
  //     audioRef.current.play();
  //   }
  // };

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

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        // Handle any errors that occur during playback
        console.error("Audio playback error:", error);
      });
    }
  };

  // Auto-play the audio when the component mounts (with user interaction)
  React.useEffect(() => {}, []);

  const playAudio2 = () => {
    if (audioRef2.current) {
      audioRef2.current.play().catch((error) => {
        // Handle any errors that occur during playback
        console.error("Audio playback error:", error);
      });
    }
  };

  // Auto-play the audio when the component mounts (with user interaction)
  React.useEffect(() => {}, []);

  const playAudio3 = () => {
    if (audioRef3.current) {
      audioRef3.current.play().catch((error) => {
        // Handle any errors that occur during playback
        console.error("Audio playback error:", error);
      });
    }
  };

  // Auto-play the audio when the component mounts (with user interaction)
  React.useEffect(() => {}, []);

  const handleKeyPress = (event) => {
    // Check if the Ctrl key is pressed (event.ctrlKey)
    if (event.ctrlKey) {
      event.preventDefault(); // Prevent spacebar from scrolling the page
      playAudio();
    }
    if (event.key === " ") {
      playAudio3();
      startListening();

      event.preventDefault();
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

  return (
    <div className="homepagecss ">
      <main className="main-content">
        <div className="container">
          {isButtonVisible && (
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: "999",
                width: "300px",

                backgroundColor: "black", // Change the background color as desired
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
              }}
            >
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                සවන් දෙමින්...
              </button>
              {transcript && (
                <p className="mt-2" style={{ color: "white", padding: "20px" }}>
                  ඔබගෙන් ලබාගත් හඬ ආදානය: {transcript}
                </p>
              )}
            </div>
          )}
          <audio
            id="myAudio"
            ref={audioRef}
            controls
            style={{ display: "none" }}
          >
            <source src={yourAudioClip} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <audio
            id="myAudio"
            ref={audioRef2}
            controls
            style={{ display: "none" }}
          >
            <source src={yourAudioClip2} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <audio
            id="myAudio"
            ref={audioRef3}
            controls
            style={{ display: "none" }}
          >
            <source src={yourAudioClip3} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="row">
            <div className="col-lg-6 animate-fade-left mt-5">
              <h1 style={{ fontSize: "100px" }} className="display-4">
                ListenEd
              </h1>

              <form
                method="get"
                title="Search Form"
                action="https://cse.google.com/cse/publicurl"
              >
                <div>
                  <input
                    type="text"
                    id="q"
                    name="q"
                    title="Search this site"
                    alt="Search Text"
                    maxlength="256"
                  />
                  <input
                    type="hidden"
                    id="cx"
                    name="cx"
                    value="013626029654558379071:ze3tw4csia4"
                  />
                  <input
                    type="image"
                    id="searchSubmit"
                    name="submit"
                    src="https://www.flaticon.com/free-icon/active-search-symbol_34148"
                    alt="Go"
                    title="Submit Search Query"
                  />
                </div>
              </form>
              <p className="lead">
                ශ්‍රී ලංකාවෙ පළමු කටහඬ හරහා පාලනය වන Audiobook පුස්තකාලය වෙත ඔබව
                සාදරෙයෙන් පිලිගනිමු.
              </p>
              <button
                onClick={handleScrollToElement}
                className="btn btn-primary btn-lg"
                style={{ backgroundColor: "#FF4500", borderColor: "#FF4500" }}
              >
                තව දැනගන්න
              </button>
            </div>
            <div className="col-lg-6 ">
              {/* <img
                src="https://via.placeholder.com/400"
                alt="App Screenshot"
                className="img-fluid"
              /> */}
              <img src={AudiobookGif} alt="Audiobook" />
            </div>
          </div>
        </div>
      </main>

      <div className="container mb-5">
        <h1 class="name-heading">අලුතින් එකතුවූ පොත්</h1>
        <div className="row cardsss">
          <Card title={"අඹ යහළුවෝ"} author={"ටී.බී. ඉලංගරත්න"} />
          <Card title={"මඩොල් දූව"} author={"මාර්ටින් වික්‍රමසිංහ"} />
          <Card title={"අපේ ගම"} author={"මාර්ටින් වික්‍රමසිංහ"} />
        </div>
      </div>

      <div ref={targetRef}>{/* Your content */}</div>

      {/* Other content */}
      <div className="container mt-5 ">
        <h1 class="name-heading">ListenEd ගැන</h1>
        <p className="lead mt-4">
          ListenEd ශ්‍රී ලංකාවෙ පළමු කටහඬ හරහා පාලනය වන Audiobook පුස්තකාලයයයි.
          ශ්‍රී ලංකාවෙ විශ්වවිද්‍යාලයයන් වල ඉගෙනුම ලබන දෘශ්‍යාභාතිත සිසුන් සඳහා
          විශේෂයෙන් මෙම මෘදුකාංගය නිර්මාණය කර ඇත. සියලුම විධානයන් සිංහල භාෂාවෙන්
          කටහඬ විධාන මගින් පාලනය කල හැකි පරිදි ListenEd නිර්මාණය කර ඇත.
        </p>
        {/* Content below the target element */}
      </div>
    </div>
  );
}

export default Home;
