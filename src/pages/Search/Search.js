import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import './search.css'
import yourAudioClip from '../../Audio/3.m4a'
import yourAudioClip2 from '../../Audio/wrong.m4a'
import yourAudioClip3 from '../../Audio/beep1.mp3'
import audio4 from '../../Audio/5.m4a'
import audio5 from '../../Audio/4.m4a'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const apiKey = "AIzaSyAEhteVNE6ulr2RGCqlYmYKBvf1AgL09cM"; // Replace with your Google Cloud API key

function Search() {

  const [AudioBooks, setAudioBooks] = useState([])
  const [spokenText, setSpokenText] = useState('');
  const { transcript, listening } = useSpeechRecognition();
  const [AudioBooksearch, setAudioBooksearch] = useState(null);
  const [searchError, setSearchError] = useState(false);

  const audioRef = useRef(null);
  const audioRef2 = useRef(null);
  const audioRef3 = useRef(null);
  const audioRef4 = useRef(null);
  const audioRef5 = useRef(null);

  useEffect(() => {
    retrieveAudioBooks();
    audioRef.current.play();
  }, []);

  const retrieveAudioBooks = () => {
    axios.get('https://listened.onrender.com/audiobook/')
      .then((res) => {
        setAudioBooks(res.data);
      })
      .catch((error) => {
        console.error('Error fetching Books:', error);
      });
  };

  const handleSpokenText = (event) => {
    const text = event.results[0][0].transcript;

    const punctuationRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;
    const modifiedText = text.replace(punctuationRegex, '');

    setSpokenText(modifiedText);
  };

  const startVoiceRecognition = () => {
    console.log('startVoiceRecognition');
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'si-LK'; // Set the language to Sinhala (Sri Lanka)
    recognition.start();
    recognition.onresult = handleSpokenText;
  };

  useEffect(() => {
    if (spokenText) {
      // Check if spokenText matches book title
      const matchingBook = AudioBooks.find((book) => {
        const bookWords = book.title.toLowerCase().split(' ');
        const spokenTextWords = spokenText.toLowerCase().split(' ');

        return bookWords.some((bookWord) =>
          spokenTextWords.some((spokenWord) => spokenWord.includes(bookWord))
        );
      });
      if (matchingBook) {
        setSearchError(false);
        console.log('Matching book:', matchingBook);
        setAudioBooksearch(matchingBook);
        audioRef5.current.play();
      }
      else if (spokenText != 'පොත් සෙවීම') {
        audioRef4.current.play();
        console.log('No matching book found');
        setSearchError(true);
        setAudioBooksearch(null);
      }
    }
  }, [spokenText]);

  useEffect(() => {
    if (!listening) {
      SpeechRecognition.startListening({ continuous: true });
    }
    return () => {
      SpeechRecognition.stopListening();
    };
  }, [listening]);

  useEffect(() => {
    const handleSpacebarClick = (event) => {
      if (event.key === 'Shift' && !listening) {
        audioRef3.current.play();
        startVoiceRecognition();
      }
    };
    window.addEventListener('keydown', handleSpacebarClick);
    return () => {
      window.removeEventListener('keydown', handleSpacebarClick);
    };
  }, [listening]);

  const handleShiftKeyDown = (event) => {
    if (event.key === 'Control' || event.key === 'Ctrl' || event.key === 'ControlLeft') {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleShiftKeyDown);
    return () => {
      window.removeEventListener('keydown', handleShiftKeyDown);
    };
  }, []);

  return (
    <div className="searchhh" style={{ minHeight: '400px' }}>
      <div className="App container text-center ">

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
          // value={searchTerm}
          //onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
          // onClick={handleSearch}
          ><i className="fas fa-search"></i></button>
          <button
            className="round-button2"
          // style={{}}
          // onClick={startListening}
          //  disabled={isListening}
          >
            <i className="fas fa-microphone"></i>
          </button>

          <button
            className="round-button2"
          //  onClick={stopListening}
          //  disabled={!isListening}
          >
            <i className="fas fa-microphone-slash"></i>
          </button>
          {/* {err && (
          <h3 className="mt-4" style={{ color: "red" }}>
            ඔබගේ හඬ විධානය හඳුනා ගත නොහැක. නැවත උත්සාහ කරන්න.
          </h3>
        )} */}


        </div>


        <h5 class="mt-3 text-left">
          ඔබට ඔබේ හඬ මගින් හෝ ඉහත ෆෝරමය පිරවීමෙන් පොත් සෙවීම කල හැක. කට හඬ මගින් සෙවීමට නම් යතුරු පුවරුවේ Shift යතුර ඔබන්න.

        </h5>
        <p className=" mt-4">ඔබගෙන් ලබාගත් හඬ ආදානය : {AudioBooksearch?.title}</p>

        <div className="row cardsss text-left">

          {AudioBooksearch !== null && (
            <div className="container mt-2 ">
              <h1 class="name-heading">
                ඔබ සෙවූ පොත
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

          {AudioBooksearch && (
            <center>
              <div class="card mb-3" style={{ width: "50%" }}>
                <div class="row no-gutters">
                  <div class="col-md-5">
                    <img src="http://fhss.sjp.ac.lk/audiobooks/wp-content/uploads/sites/32/2019/11/3-326x245.png" style={{ height: '90%', objectFit: 'cover' }} class="card-img" alt="..." />
                  </div>
                  <div class="col-md-7">
                    <div class="card-body">
                      <h1 class="card-title">{AudioBooksearch.title}</h1>
                      <h3 class="card-text">Author : {AudioBooksearch.author}</h3>
                      <button class="card-text btn btn-success w-100 mt-5" onClick={() => { window.location.replace(`./audio-player/${AudioBooksearch?.bookid}`) }}>Play</button>
                    </div>
                  </div>
                </div>
              </div>
            </center>

          )}
        </div>




      </div>
    </div>
  );
}

export default Search;
