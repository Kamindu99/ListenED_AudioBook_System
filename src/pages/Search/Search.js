import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import './search.css'
import Card from "../Home/Card";
import yourAudioClip from '../../Audio/3.m4a'
import yourAudioClip2 from '../../Audio/wrong.m4a'
import yourAudioClip3 from '../../Audio/beep1.mp3'
import audio4 from '../../Audio/5.m4a'
import audio5 from '../../Audio/4.m4a'

const apiKey = "AIzaSyAEhteVNE6ulr2RGCqlYmYKBvf1AgL09cM"; // Replace with your Google Cloud API key

function Search() {
  const [transcript, setTranscript] = useState("");
  const [translation, setTranslation] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [predNouns, setPredNouns] = useState("");
  const [err, setErr] = useState("");
  const recognition = new window.webkitSpeechRecognition();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [text, setText] = useState('');
  const [spacePressed, setSpacePressed] = useState(false);
  const [ctrlPressed, setCtrlPressed] = useState(false);
  const [altPressed, setAltPressed] = useState(false);
  const [searchError, setSearchError] = useState(false);


  const synth = window.speechSynthesis;

  const audioRef = useRef(null);
  const audioRef2 = useRef(null);
  const audioRef3 = useRef(null);
  const audioRef4 = useRef(null);
  const audioRef5 = useRef(null);

  let spaceClicked = false;
  let shiftClicked = false;

  useEffect(() => {
    // Start playing the audio when the component mounts
    const audio = new Audio(yourAudioClip);
    audio.play();

    // Optionally, you can add event listeners for audio control
    // For example, to pause the audio when the component unmounts

  }, []);

  const speakText = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'si-LK';
    synth.speak(utterance);
  };


  const speakText2 = (textToSpeak) => {



    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Detect if the text contains Sinhala characters, then set the language accordingly

    utterance.lang = 'si-LK'; // Sinhala (Sri Lanka)



    synth.speak(utterance);
  };


  const handleSearch = async () => {
    console.log(searchTerm);

    const backendUrl = "http://127.0.0.1:8000/students/";
    // const translatedLow = translatedText.toLowerCase();
    try {
      // const backendResponse = await axios
      //   .post(backendUrl, {
      //     text: translatedLow,
      //   })
      console.log(searchTerm);
      // const translatedText1 = translatedText.slice(0, -1);

      await axios
        .get(backendUrl, {
          params: {
            studentName: searchTerm,
          }
        })
        .then((res) => {
          console.log(res.data);
          setSearchData(res.data);

          res.data.forEach((item) => {
            console.log("sss");
            console.log(item.studentName, "sss");
            speakText2(item.studentName);
          });
        });
      // console.log("Backend response:", backendResponse.data);
    } catch (error) {
      console.error("Error sending data to the backend:", error);
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
        console.log("end");
        console.log(transcript);
        console.log(spacePressed);

        if (shiftClicked === true && spaceClicked === false) {

          sendNametoBackend(transcript);
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
              // playAudio2();

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
                  case responseData === "go" && nouns === "home page":
                    window.location.href = "/";
                    break;
                  default:
                    console.log("errr");
                    setErr(true);
                    playAudio2();
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
            playAudio2();
          }
        });
      console.log("Backend response:", backendResponse.data);
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
  };


  const playAudio2 = () => {
    if (audioRef2.current) {
      audioRef2.current.play().catch(error => {
        // Handle any errors that occur during playback
        console.error('Audio playback error:', error);
      });
    }
  };



  const sendNametoBackend = async (translatedText) => {
    setSearchError(false);
    const backendUrl = "http://127.0.0.1:8000/students/";
    // const translatedLow = translatedText.toLowerCase();
    try {
      // const backendResponse = await axios
      //   .post(backendUrl, {
      //     text: translatedLow,
      //   })
      console.log(translatedText);
      const translatedText1 = translatedText.slice(0, -1);

      const backendResponse = await axios
        .get(backendUrl, {
          params: {
            studentName: translatedText1,
          }
        })
        .then((res) => {

          if (res.data.length > 0) {

            console.log(res.data);
            console.log(res.data);
            setSearchData(res.data);
            playAudio5();


            setTimeout(() => {
              res.data.forEach((item) => {
                console.log("sss");
                console.log(item.studentName, "sss");
                speakText2("පොත්ඒ න්අම්අ" + "...." + item.studentName);
                speakText2("කත්ත්ර්ඌගඒ න්අම්අ" + "....." + item.words);

              });

            }, 5000);





          }
          else {
            console.log("no data");
            setSearchData([]);
            playAudio4();
            setSearchError(true);

          }

        });
      // console.log("Backend response:", backendResponse.data);
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        // Handle any errors that occur during playback
        console.error('Audio playback error:', error);
      });
    }
  };

  const playAudio4 = () => {
    if (audioRef4.current) {
      audioRef4.current.play().catch(error => {
        // Handle any errors that occur during playback
        console.error('Audio playback error:', error);
      });
    }
  };

  const playAudio5 = () => {
    if (audioRef5.current) {
      audioRef5.current.play().catch(error => {
        // Handle any errors that occur during playback
        console.error('Audio playback error:', error);
      });
    }
  };



  const playAudio3 = () => {

    if (audioRef3.current) {
      audioRef3.current.play().catch(error => {
        // Handle any errors that occur during playback
        console.error('Audio playback error:', error);
      });
    }
  };

  const start1 = () => {
    setSpacePressed(true);

    spaceClicked = true;
    console.log(spacePressed)
    startListening();
  }

  const handleKeyPress = (event) => {
    // Check if the Ctrl key is pressed (event.ctrlKey)
    if (event.ctrlKey) {
      event.preventDefault(); // Prevent spacebar from scrolling the page
      playAudio();

    }
    if (event.key === ' ') {
      console.log('space')
      setSpacePressed(true);
      playAudio3();
      start1()

      event.preventDefault();
    }
    if (event.key === 'Shift') {
      shiftClicked = true;
      console.log('shift')
      event.preventDefault(); // Prevent spacebar from scrolling the page
      // playAudio();
      setAltPressed(true);
      playAudio3();
      startListening();



    }
  };


  useEffect(() => {
    // Add an event listener for the space bar key press
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);



  return (
    <div className="App container text-center searchhh ">

      <h1 className="search-bar mt-3 ">
        Audiobook සොයන්න</h1>
      <div className="search-bar mt-2 
">
        <audio id="myAudio" ref={audioRef} controls style={{ display: 'none' }}>
          <source src={yourAudioClip} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <audio id="myAudio" ref={audioRef2} controls style={{ display: 'none' }}>
          <source src={yourAudioClip2} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <audio id="myAudio" ref={audioRef3} controls style={{ display: 'none' }}>
          <source src={yourAudioClip3} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <audio id="myAudio" ref={audioRef4} controls style={{ display: 'none' }}>
          <source src={audio4} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <audio id="myAudio" ref={audioRef5} controls style={{ display: 'none' }}>
          <source src={audio5} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <input
          type="text" className="round-button2"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}><i className="fas fa-search"></i></button>
        <button
          className="round-button2"
          // style={{}}
          onClick={startListening}
          disabled={isListening}
        >
          <i className="fas fa-microphone"></i>
        </button>

        <button
          className="round-button2"
          onClick={stopListening}
          disabled={!isListening}
        >
          <i className="fas fa-microphone-slash"></i>
        </button>
        {err && (
          <h3 className="mt-4" style={{ color: "red" }}>
            ඔබගේ හඬ විධානය හඳුනා ගත නොහැක. නැවත උත්සාහ කරන්න.
          </h3>
        )}

        {transcript && (
          <p className=" mt-4">ඔබගෙන් ලබාගත් හඬ ආදානය : {transcript}</p>
        )}
      </div>


      <h5 class="mt-3 text-left">
        ඔබට ඔබේ හඬ මගින් හෝ ඉහත ෆෝරමය පිරවීමෙන් පොත් සෙවීම කල හැක. කට හඬ මගින් සෙවීමට නම් යතුරු පුවරුවේ Shift යතුර ඔබන්න.

      </h5>


      <div className="row cardsss text-left">

        {searchData.length !== 0 && (
          <div className="container mt-2 ">
            <h1 class="name-heading">
              ඔබ සෙවූ පොත්
            </h1>
          </div>

        )}
        {searchError && (
          <div className="container mt-2 ">
            <h3 className="mt-4" style={{ color: "red" }}>
              ඔබ සෙවූ පොත සොයාගත නොහැක


            </h3>
          </div>
        )}

        {searchData.map((item) => (

          <Card
            title={item.studentName}
            author={item.words}

          />

        ))}
      </div>




    </div>
  );
}

export default Search;
