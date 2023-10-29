import axios from "axios";
import React, { useState, useEffect } from "react";

const apiKey = "AIzaSyAEhteVNE6ulr2RGCqlYmYKBvf1AgL09cM"; // Replace with your Google Cloud API key

function Predict() {
  const [transcript, setTranscript] = useState("");
  const [translation, setTranslation] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [predNouns, setPredNouns] = useState("");
  const [err, setErr] = useState("");
  const recognition = new window.webkitSpeechRecognition();

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

    setTimeout(() => {
      stopListening();
    }, 3000);
  };

  const stopListening = () => {
    recognition.stop();
    setIsListening(false);
  };

  //   useEffect(() => {
  //     playmusic();
  //   }, []);

  //   const playmusic = () => {
  //     const audio = new Audio(audio1); // Replace with the path to your MP3 file

  //     // Play the audio when the component mounts
  //     audio.play();

  //     // Clean up the audio element when the component unmounts
  //     return () => {
  //       audio.pause();
  //       audio.currentTime = 0;
  //     };
  //   }

  // const translateText = async (text) => {
  //   const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       q: text,
  //       target: 'en', // Translate to English
  //       source: 'si', // Sinhala
  //     }),
  //   });

  //   const data = await response.json();
  //   const translatedText = data.data.translations[0].translatedText;
  //   setTranslation(translatedText);
  // };

  // const translateText = async (text) => {
  //   const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       q: text,
  //       target: 'en', // Translate to English
  //       source: 'si', // Sinhala
  //     }),
  //   });

  //   const data = await response.json();
  //   const translatedText = data.data.translations[0].translatedText;
  //   setTranslation(translatedText);

  //   // Send translated data to the backend
  //   const backendUrl = 'http://127.0.0.1:8000/gettext/'; // Replace with your backend API URL

  //   try {
  //     const backendResponse = await axios.post(backendUrl, {
  //       text: translatedText,
  //     });

  //     // Handle the backend response if needed
  //     console.log('Backend response:', backendResponse.data);
  //   } catch (error) {
  //     // Handle error if the API call fails
  //     console.error('Error sending data to the backend:', error);
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
      const backendResponse = await axios
        .post(backendUrl, {
          text: translatedLow,
        })
        .then((res) => {
          if (res.data.predicted_verbs.length > 0) {
            const responseData = res.data.predicted_verbs[0];
            setPrediction(responseData);
            const nounData = res.data.nouns;
            // console.log('nnn',nounData);
            setPredNouns(nounData);
            if (responseData.length > 0) {
              console.log("more");

              if (nounData.length > 0) {
                const nouns = nounData.join(" ");
                console.log("nested more1");

                if (responseData > 1) {
                  console.log("errr");
                  return;
                }

                // if (responseData === "go" && nouns === "data page") {
                //   window.location.href = "/profile";
                // } else {
                //   console.log("errr");
                //   setErr(true);
                // }

                // if (responseData === "go" && nouns === "book search") {
                //   window.location.href = "/search";
                // } else {
                //   console.log("errr");
                //   setErr(true);
                // }
                switch (true) {
                  case responseData === "go" && nouns === "data page":
                    window.location.href = "/profile";
                    break;
                  case responseData === "go" && nouns === "search":
                    window.location.href = "/search";
                    break;
                  default:
                    console.log("errr");
                    setErr(true);
                    break;
                }

                // if (responseData.length > 1) {
                //     const verbs = responseData.join(' ');
                //     // setPrediction(verbs);
                //     console.log('nested more2')

                //     if(verbs === 'go' && nouns === 'data page'){
                //         window.location.replace = '/profile'
                //     }
                // }
                // else{
                //     console.log('nested')
                //     // setPrediction(verb);

                //     if(responseData === 'go' && nouns === 'data page'){
                //         window.location.replace = '/profile'
                //     }
                // }

                console.log("nnn nounData", nouns);
                console.log("rrr responseData", responseData);
              }
            }
          } else {
            console.log("no verbs");
            setErr(true);
          }
        });
      console.log("Backend response:", backendResponse.data);
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === " ") {
      startListening();
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
    <div className="App container text-center">
      <h1 className="mt-5">හඬ විධාන හදුනා ගැනීම</h1>
      <div className="text-center">
        <div className="mt-4">
          <button
            className="round-button"
            onClick={startListening}
            disabled={isListening}
          >
            <i className="fas fa-microphone"></i>
          </button>
          &nbsp; &nbsp;
          <button
            className="round-button"
            onClick={stopListening}
            disabled={!isListening}
          >
            <i className="fas fa-microphone-slash"></i>
          </button>
        </div>
      </div>

      {err && (
        <h3 className="mt-4" style={{ color: "red" }}>
          ඔබගේ හඬ විධානය හඳුනා ගත නොහැක. නැවත උත්සාහ කරන්න.
        </h3>
      )}

      {transcript && (
        <p className=" mt-4">ඔබගෙන් ලබාගත් හඬ ආදානය : {transcript}</p>
      )}

      {/* <div>{prediction.length > 0 && <p>Predicted Verbs: {prediction}</p>}</div> */}

      <div>
        {/* {predNouns.length > 0 && <p>Predicted Nouns: {predNouns.join(" ")}</p>} */}
      </div>
    </div>
  );
}

export default Predict;
