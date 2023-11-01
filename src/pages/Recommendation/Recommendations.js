import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import audio10 from "../../Audio/10.m4a";

const Recommendations = () => {
  const userid = localStorage.getItem("userId");
  const [UserDetails, setUserDetails] = useState(null);

  const retrieveUserDetailsById = (id) => {
    axios
      .get(`https://listened.onrender.com/usermanagement/${id}`)
      .then((res) => {
        setUserDetails(res.data);
      })
      .catch((error) => {
        console.error("Error fetching UserDetails by ID:", error);
      });
  };

  useEffect(() => {
    if (UserDetails != null) {
      console.log(UserDetails);
      getRecommndbooks(UserDetails?.usehistory, UserDetails?.studyarea);
      audioRef.current.play();
    } else {
      retrieveUserDetailsById(userid);
    }
  }, [UserDetails]);

  function playRecommendationsSequentially(recommendations) {
    let index = 0;

    function playNextRecommendation() {
      if (index < recommendations.length) {
        const spokenText = recommendations[index];
        playVoice(`${index + 1}: ${spokenText}`);
        index++;
        setTimeout(playNextRecommendation, 1000); //1 second
      }
    }
    playNextRecommendation();
  }

  const [recommndbooks, setRecommndbooks] = useState([]);
  const [error, setError] = useState(null);

  const getRecommndbooks = (user_History, study_Area) => {
    try {
      axios
        .post("https://listened.onrender.com/bookrecommend/", {
          user_history_books: user_History,
          user_study_area: study_Area,
        })
        .then((res) => {
          console.log(res.data);
          setRecommndbooks(res.data);
          setError(null);
        })
        .catch((error) => {
          console.log(error);
          setError("Error occurred during API call. Please try again.");
          setRecommndbooks([]);
          playVoice(`give a correct book name`);
        });
    } catch (error) {
      console.log(error);
      setError("Error occurred. Please try again.");
      setRecommndbooks([]);
      playVoice(`give a correct book name`);
    }
  };

  const playVoice = (text) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speechSynthesis.speak(speech);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Play book names when the spacebar is pressed
      if (event.key === " " && recommndbooks.length > 0) {
        playVoice(`recommendations related to the ${UserDetails?.name}`);
        playRecommendationsSequentially(recommndbooks);
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [recommndbooks]);

  const audioRef = useRef(null);

  const handleShiftKeyDown = (event) => {
    if (event.keyCode === 16) {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleShiftKeyDown);
    return () => {
      window.removeEventListener("keydown", handleShiftKeyDown);
    };
  }, []);

  return (
    <div>
      <>
        <br />

        <audio
          ref={audioRef}
          src={audio10}
          controls
          style={{
            width: "100%",
            marginTop: "20px",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#f5f5f5",
            padding: "10px",
            display: "none",
          }}
        />

        {error == null ? (
          <div
            class="row text-center text-lg-start"
            style={{ textAlign: "center" }}
          >
            <h1
              style={{
                textAlign: "center",
                marginTop: "20px",
                fontWeight: "700",
              }}
            >
              {UserDetails?.name} ඔබට අදාල අනෙකුත් Audio පොත් නිර්දේශයන්
            </h1>
            <div className="row mt-5">
              {recommndbooks.map((book, idx) => (
                <div className="col-md-10 container" key={idx}>
                  <div
                    className="card mt-3 trendingev"
                    style={{ height: "100px" }}
                  >
                    <div className="row no-gutters">
                      <div className="col-md-3">
                        <img
                          style={{
                            height: "90px",
                            width: "100px",
                            padding: "5px",
                            objectFit: "cover",
                            borderRadius: "0",
                          }}
                          className="card-img"
                          src="https://i.tribune.com.pk/media/images/676522-books-1393480226/676522-books-1393480226.JPG"
                          alt="Card image cap"
                        />
                      </div>
                      <div className="col-md-9">
                        <div
                          className="card-body"
                          style={{
                            position: "relative",
                            height: "50px",
                            marginLeft: "-14%",
                          }}
                        >
                          <h1
                            className="card-title"
                            style={{
                              color: "#a80319",
                              fontWeight: "700",
                              fontSize: "40px",
                            }}
                          >
                            {book}
                          </h1>

                          <button
                            className="btn btn-warning btn-sm"
                            style={{
                              position: "absolute",
                              bottom: -20,
                              left: "86%",
                              transform: "translateX(-50%)",
                              fontSize: "20px",
                              fontWeight: "600",
                              width: "200px",
                            }}
                          >
                            සවන් දෙන්න
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        ) : (
          <>
            <div className="row no-gutters">
              <div
                class="alert alert-danger"
                role="alert"
                style={{ width: "100%" }}
              >
                නිවැරදි පොතක් නිර්දේශයන් ලබා ගැනීමට උත්සාහ කරන්න.
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default Recommendations;
