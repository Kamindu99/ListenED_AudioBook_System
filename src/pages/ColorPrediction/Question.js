import React, { useEffect } from "react";

function Question({ question, image, answers, onSelect }) {
  useEffect(() => {
    console.log(image);

    const handleKeyPress = (e) => {
      if (e.key === "z") {
        startVoiceRecognition();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [question]);

  const startVoiceRecognition = () => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "si-LK"; // Set language to Sinhala

      recognition.onresult = (event) => {
        const voiceInput = event.results[0][0].transcript;
        console.log("Voice input:", voiceInput);

        // Extract the number from the voice input
        const numberMatch = voiceInput.match(/\d+/);
        if (numberMatch) {
          const selectedNumber = parseInt(numberMatch[0]);
          if (selectedNumber >= 1 && selectedNumber <= answers.length) {
            // A valid number within the answer options was detected
            const selectedAnswer = answers[selectedNumber - 1];
            onSelect(
              selectedAnswer.mark,
              selectedAnswer.type,
              selectedAnswer.overlay,
              selectedAnswer.overlay2
            );
          } else {
            console.log(
              "Invalid number. Please repeat your choice with a valid number."
            );
          }
        } else {
          console.log(
            "No valid number detected. Please repeat your choice with a number."
          );
        }
      };

      recognition.onerror = (event) => {
        console.log("Speech recognition error:", event.error);
        console.log("Please check your microphone and try again.");
      };

      recognition.start();
    } else {
      console.log("Speech recognition not supported in this browser");
    }
  };

  return (
    <div className="question">
      <h5 className="mb-4">{question}</h5>
      <div className="row">
        <div className="col-md-6 text-center">
          {image && <img src={image} alt="Question" />}
        </div>
        <div className="col-md-6">
          <ul>
            {answers.map((answer, index) => (
              <div className="row">
                <button
                  className="btn mb-2"
                  style={{
                    width: "200px",
                    backgroundColor: "black",
                    color: "white",
                  }}
                  key={index}
                  onClick={() =>
                    onSelect(
                      answer.mark,
                      answer.type,
                      answer.overlay,
                      answer.overlay2
                    )
                  }
                >
                  {index + 1}) {answer.text}
                </button>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Question;
