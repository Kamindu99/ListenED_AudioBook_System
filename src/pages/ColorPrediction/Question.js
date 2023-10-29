// src/components/Question.js
import React, { useEffect } from "react";

function Question({ question, image, answers, onSelect }) {
  useEffect(() => {
    console.log(image);
  }, [question]);

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
                  {answer.text}
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
