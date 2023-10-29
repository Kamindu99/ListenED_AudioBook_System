import React, { useState, useEffect, useRef } from "react";
import QuizApp from "./QuizApp";
import image1 from "../../assets/images/new/color.jpg";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Quiz() {

  const [spokenText, setSpokenText] = useState('');
  const { transcript, listening } = useSpeechRecognition();
  const audioRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);

  const [fontSize, setfontSize] = useState("");
  const [fontSize1, setfontSize1] = useState("");
  const [fontWeight, setfontWeight] = useState("");
  const [fontWeight1, setfontWeight1] = useState("");
  const [fontStyle, setfontStyle] = useState("");
  const [fontStyle1, setfontStyle1] = useState("");

  useEffect(() => {
    setfontSize(JSON.parse(localStorage.getItem("fontSize")));
    setfontSize1(JSON.parse(localStorage.getItem("fontSize1")));
    setfontWeight(JSON.parse(localStorage.getItem("fontWeight")));
    setfontWeight1(JSON.parse(localStorage.getItem("fontWeight1")));
    setfontStyle(JSON.parse(localStorage.getItem("fontStyle")));
    setfontStyle1(JSON.parse(localStorage.getItem("fontStyle1")));
  }, []);

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
      console.log("ssssssssssප්රශ්නාවලිය අරඹන්න");
      // Check if spokenText matches book title
      const spokenTextWords = spokenText.toLowerCase().split(' ');

      if (spokenTextWords.includes("අරඹන්න")) {
        handleOpenModal();
        console.log("ප්රශ්නාවලිය අරඹන්න");
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
      if (event.key === ' ' && !listening) {
        startVoiceRecognition();
      }
    };
    window.addEventListener('keydown', handleSpacebarClick);
    return () => {
      window.removeEventListener('keydown', handleSpacebarClick);
    };
  }, [listening]);

  const handleShiftKeyDown = (event) => {
    if (event.keyCode === 16) {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleShiftKeyDown);
    return () => {
      window.removeEventListener('keydown', handleShiftKeyDown);
    };
  }, []);

  //const [showModal, setShowModal] = useState(false);

  // const openModal = () => {
  //   setShowModal(true);
  // };

  // const closeModal = () => {
  //   setShowModal(false);
  // };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // const ssss = () => {
  //   window.location.reload();
  // };

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
          {spokenText && (
            <p className=" mt-4">ඔබගෙන් ලබාගත් හඬ ආදානය : {spokenText}</p>
          )}
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
                  <button
                    type="button"
                    style={{ color: "white" }}
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={handleCloseModal}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
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
