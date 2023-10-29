// src/components/QuizApp.js
import React, { useState, useEffect } from "react";
import quizData from "./quizData";
import Question from "./Question";
import axios from "axios";

function QuizApp() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [type, setType] = useState([]);
  const [grade, setGrade] = useState("");
  const [severity, setSeverity] = useState("");
  const [colorblindType, setColorblindType] = useState("");
  const [overlayType, setOverlayType] = useState("");
  const [overlayType2, setOverlayType2] = useState("");

  const [protanopia, setProtanopia] = useState(false);
  const [deuteranopia, setDeuteranopia] = useState(false);

  const [overlayColor, setOverlayColor] = useState("");

  const [uiColors, setUIColors] = useState("");

  const handleAnswerSelect = (
    selectedAnswerMark,
    selectedAnswerType,
    selectedOverlayPro,
    selectedOverlayDeu
  ) => {
    setScore(score + selectedAnswerMark);
    setType([...type, selectedAnswerType]);
    setOverlayType([...overlayType, selectedOverlayPro]);
    setOverlayType2([...overlayType2, selectedOverlayDeu]);

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentQuestionIndex(-1); // Quiz completed
    }
  };

  const currentQuestion = quizData[currentQuestionIndex];

  useEffect(() => {
    const calculateGrade = () => {
      const fullScore = 440;
      const scorePercentage = (score / fullScore) * 100;

      const roundedScorePercentage = Math.round(scorePercentage * 100) / 100;

      setSeverity(roundedScorePercentage);

      if (scorePercentage >= 0 && scorePercentage <= 25) {
        setGrade("Mild");
        localStorage.setItem("severity", JSON.stringify("Mild"));
      } else if (scorePercentage > 25 && scorePercentage <= 50) {
        setGrade("Moderate");
        localStorage.setItem("severity", JSON.stringify("Moderate"));
      } else if (scorePercentage > 50 && scorePercentage <= 75) {
        setGrade("Severe");
        localStorage.setItem("severity", JSON.stringify("Severe"));
      } else if (scorePercentage > 75 && scorePercentage <= 100) {
        setGrade("Strong");
        localStorage.setItem("severity", JSON.stringify("Strong"));
      }
    };

    if (currentQuestionIndex === -1) {
      calculateGrade();

      const typeCounts = type.reduce((acc, curr) => {
        if (curr !== "normal") {
          // Exclude "normal" type
          acc[curr] = (acc[curr] || 0) + 1;
        }
        return acc;
      }, {});

      // Find the most frequent colorblind type
      let mostFrequentType = "";
      let maxCount = 0;

      for (const [type, count] of Object.entries(typeCounts)) {
        if (count > maxCount) {
          mostFrequentType = type;
          maxCount = count;
        }
      }

      // Check if occurrences of deuteranopia and protanopia are equal
      if (typeCounts.deuteranopia === typeCounts.protanopia) {
        // Check if severity percentage is over 60
        console.log("wwwwwww", typeCounts.deuteranopia);
        console.log("ccccccccc", typeCounts.protanopia);

        if (
          typeCounts.deuteranopia === undefined &&
          typeCounts.protanopia === undefined
        ) {
          mostFrequentType = "normal";
        } else {
          mostFrequentType = "deuteranopia";
        }
      }

      setColorblindType(mostFrequentType);
      console.log(mostFrequentType);

      if (mostFrequentType === "protanopia") {
        setProtanopia(true);

        setOverlayColor(overlayType);
        console.log(overlayType);
        const filteredArray = overlayType.filter((item) => item !== undefined);

        console.log(filteredArray);

        localStorage.setItem("dataKey", JSON.stringify(filteredArray));
        axios
          .post("http://127.0.0.1:8000/colorspred/", {
            type: mostFrequentType,
          })
          .then((response) => {
            console.log(response.data);

            if (localStorage.getItem("firstColor")) {
              localStorage.removeItem("firstColor");
            }

            const firstColor = response.data[0]; // Get the first color
            console.log(firstColor);

            // Store the first color in localStorage
            localStorage.setItem("firstColor", firstColor);
          });
      }
      if (mostFrequentType === "deuteranopia") {
        setDeuteranopia(true);

        setOverlayColor(overlayType2);
        console.log(overlayType2);
        const filteredArray = overlayType2.filter((item) => item !== undefined);

        console.log(filteredArray);
        localStorage.setItem("dataKey", JSON.stringify(filteredArray));
        axios
          .post("http://127.0.0.1:8000/colorspred/", {
            type: mostFrequentType,
          })
          .then((response) => {
            console.log(response.data);
            setUIColors(response.data);

            if (localStorage.getItem("firstColor")) {
              localStorage.removeItem("firstColor");
            }

            const firstColor = response.data[0]; // Get the first color
            console.log(firstColor);

            // Store the first color in localStorage
            localStorage.setItem("firstColor", firstColor);
          });
      }
    }
  }, [currentQuestionIndex, score]);

  const refresh = () => {
    window.location.reload();
  };

  return (
    <div className="quiz-app">
      {currentQuestionIndex !== -1 ? (
        <Question
          question={currentQuestion.question}
          answers={currentQuestion.answers}
          image={currentQuestion.image}
          onSelect={(mark, type, overlay, overlay2) =>
            handleAnswerSelect(mark, type, overlay, overlay2)
          }
        />
      ) : (
        <div className="result">
          <h4>ප්‍රශ්නාවලිය සම්පූර්ණයි!</h4>
          {/* <p>ඔබ ලබාගත් මුළු ලකුණු: {score}</p>
          <p>Types of Answers: {type.join(", ")}</p> */}
          <p>දෘශ්‍යතා ප්‍රතිශතය : {severity}%</p>
          {/* <p>Grade: {grade}</p> */}
          <p>
            වර්ණ අන්ධතා වර්ගය :{" "}
            {colorblindType === "normal"
              ? "ඔබට වර්ණ අන්ධතාවය නොමැත"
              : colorblindType}
          </p>

          <p>
            ඔබගේ වර්ණ අන්ධතා වර්ගය හා දෘශ්‍යතා ප්‍රතිශතය අනුව වර්ණ ආවාරණයක්
            (Color Overlay) නිර්මාණය කරන ලදි එමගින් ඔබගේ දුබලතාවය මහහරවා ඔබට
            වඩාත් නිවැරදි වර්ණ හදඳුනාගැනීමකට ඉඩ සලස්වයි. වර්ණ ආවරණය භාවිතා
            කිරීමට පහත බොත්තම ඔබන්න
          </p>

          <button className="btn btn-primary" onClick={refresh}>
            වර්ණ ආවරණය යොදන්න
          </button>

          {/* <p>Overlay Type: {overlayType}</p> */}

          {/* {protanopia && overlayType ? (
            <>
              <p>Protanopia</p>
              <p>{overlayType}</p>
            </>
          ) : null}
          {deuteranopia && overlayType2 ? (
            <>
              <p>deuteranopia</p>
              <p>{overlayType2}</p>
            </>
          ) : null} */}

          {/* Display the types */}
        </div>
      )}
    </div>
  );
}

export default QuizApp;
