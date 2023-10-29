import './About.css'; // Import your custom CSS file
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import yourAudioClip from '../../Audio/3.m4a'
import yourAudioClip2 from '../../Audio/wrong.m4a'
import yourAudioClip3 from '../../Audio/beep1.mp3'
import audio4 from '../../Audio/5.m4a'
import audio5 from '../../Audio/4.m4a'

const apiKey = "AIzaSyAEhteVNE6ulr2RGCqlYmYKBvf1AgL09cM";

const AboutUs = () => {

  const [transcript, setTranscript] = useState("");
  const [translation, setTranslation] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [predNouns, setPredNouns] = useState("");
  const [err, setErr] = useState("");
  const recognition = new window.webkitSpeechRecognition();
  const [spacePressed, setSpacePressed] = useState(false);
  const [altPressed, setAltPressed] = useState(false);

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

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
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
      //your code here
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
    <div className="about-us-container">
      <div className="jumbotron jumbotron-fluid about-us-header">
        <div className="container text-center">
          <h1 className="display-4">අප ගැන තොරතුරු</h1>
          {transcript && (
            <p className=" mt-4">ඔබගෙන් ලබාගත් හඬ ආදානය : {transcript}</p>
          )}
          <p className="lead">Our Story, Our Team, Our Mission</p>
        </div>
      </div>

      <div className="container about-us-content">
        <div className="row">
          <div className="col-md-6">
            <h2 className="name-heading" >Our Story</h2>
            <p>
              අපගේ ගමන ආරම්භ වූයේ සරල අදහසකිනි: අධ්‍යාපනය සහ සිසුන්ගේ වේගවත් ජීවිත අතර පරතරය පියවීමට තාක්‍ෂණයේ බලය උපයෝගී කර ගැනීම. අපට අවශ්‍ය වූයේ ඉගෙනීම පහසු, වඩාත් ප්‍රීතිමත්, සහ උනන්දුවෙන් සිටින සෑම මනසකටම පහසුවෙන් ලබා ගැනීමටය.
            </p>
            <p>
              ශ්‍රී ලංකාව වැනි ගැඹුරු සාහිත්‍ය උරුමයක් ඇති රටක සිංහල භාෂාවේ සුන්දරත්වය හා සම්ප්‍රදාය රැකගැනීම අපට අත්‍යවශ්‍ය විය. ඉගෙනීම තොරතුරු පමණක් නොව සිත් ඇදගන්නාසුළු බවට පත් කරමින් අපගේ සංස්කෘතියේ විස්මිත කතාවලට ජීවය ලබා දිය හැකි යෙදුමක් අපි අපේක්ෂා කළෙමු. මෙම අදහස සමඟ අපි මෙහෙයුමක් ආරම්භ කළෙමු
              .
            </p>
          </div>
          <div className="col-md-6">
            <h2 className="name-heading">Our Mission</h2>
            <p>
              ListenEd හි අපගේ මෙහෙවර වන්නේ සාම්ප්‍රදායික ඉගෙනීම ආකර්ශනීය, ප්‍රවේශ විය හැකි සහ සංස්කෘතිකමය වශයෙන් පොහොසත් අත්දැකීමක් බවට පරිවර්තනය කරන, අධ්‍යාපනයට ආදරයක් ඇති කරවන සහ අනාගත පරපුර සඳහා අපගේ උරුමය සුරැකෙන හඬ-පාලිත ශ්‍රව්‍ය පොත් යෙදුමක් ලබා දීමෙන් ශ්‍රී ලංකාවේ විශ්ව විද්‍යාල සිසුන් සවිබල ගැන්වීමයි. දැනුම සැමට, ඕනෑම වේලාවක, ඕනෑම තැනකට පහසුවෙන් ලබා ගත හැකි බව සහතික කරමින්, ශාස්ත්‍රීය හා නවීන ජීවිතය අතර පරතරය පියවීමට අපි කැපවී සිටිමු.

            </p>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-md-12">
            <h2 className="name-heading">Our Team</h2>
            <div className="team-members">
              <div className="team-member">
                <img
                  src="team-member-1.jpg" // Replace with team member photo
                  alt="Team Member 1"
                  className="img-fluid rounded-circle"
                />
                <h4>John Doe</h4>
                <p>Co-Founder</p>
              </div>
              <div className="team-member">
                <img
                  src="team-member-2.jpg" // Replace with team member photo
                  alt="Team Member 2"
                  className="img-fluid rounded-circle"
                />
                <h4>Jane Smith</h4>
                <p>Lead Developer</p>
              </div>
              {/* Add more team members as needed */}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
        <div className="row">
          <div className="col-md-12">
            <h2 className="name-heading">Our Values</h2>
            <p>
              අපගේ ප්‍රවේශ්‍යතාවයේ මූලික වටිනාකම සෑම සිසුවෙකුටම, ඔවුන්ගේ තත්වයන් නොසලකා, අපගේ හඬ-පාලිත ශ්‍රව්‍ය පොත් යෙදුම සමඟ ඉගෙනීමට සහ සාර්ථක වීමට අවස්ථාව ඇති බව සහතික කිරීමට අපව පොලඹවයි. මේ අතර, නවෝත්පාදනයන් සඳහා අපගේ කැපවීම අඛණ්ඩව ඉගෙනුම් අත්දැකීම් පොහොසත් කරයි, කැපවීම සහ ඉදිරි චින්තන අධ්‍යාපනය පෝෂණය කිරීම සඳහා අති නවීන තාක්‍ෂණය සහ නිර්මාණාත්මක ප්‍රවේශයන් භාවිතා කරයි.

            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h2 className="name-heading">Our Values</h2>
            <p>
              අපි ශ්‍රී ලංකා තොරතුරු තාක්ෂණ ආයතනයේ (SLIIT) සිසුන් පිරිසක් වන අතර, දැනට අපගේ මෘදුකාංග ඉංජිනේරු විද්‍යාව හදාරන සිව්වන වසරේ ඉගෙනුම ලබයි. තාක්‍ෂණය සඳහා අපගේ ගැඹුරු ආදරය සහ අධ්‍යාපනය වැඩිදියුණු කිරීම සඳහා හවුල් කැපවීම තුළ මුල් බැස ඇති අපි සැබවින්ම නව්‍ය දෙයක් නිර්මාණය කිරීමට එකතු වී සිටිමු. සිසුන් ලෙස අපගේ ගමන ශ්‍රී ලංකාවේ සිටින අපගේ සෙසු විශ්ව විද්‍යාල සිසුන්ගේ ජීවිත කෙරෙහි ධනාත්මක බලපෑමක් ඇති කිරීමට අපගේ ආශාවට හේතු වී ඇති අතර, වැඩිදියුණු කිරීම සඳහා නිර්මාණය කර ඇති හඬ-පාලිත ශ්‍රව්‍ය පොත් යෙදුමක් වන ListenEd සංවර්ධනය කිරීමේ මෙහෙවර අපි ආරම්භ කළේ එබැවිනි. ඉගෙනීම සහ අධ්‍යාපනය වඩාත් ප්‍රවේශ විය හැකි සහ ආකර්ෂණීය කරන්න. අපගේ අද්විතීය ශාස්ත්‍රීය දැනුම සහ තාක්ෂණික ප්‍රවීණතාවයේ සම්මිශ්‍රණය සමඟ, අපි සිසුන් අධ්‍යාපනික අන්තර්ගතයට ප්‍රවේශ වන සහ අන්තර් ක්‍රියා කරන ආකාරය විප්ලවීය කිරීමට කැපවී සිටිමු.


            </p>
          </div>
        </div>
      </div>

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

    </div>
  );
};

export default AboutUs;
