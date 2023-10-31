import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import audio8 from '../../Audio/8.m4a'

function AudioBooksPage() {

    const [AudioBooks, setAudioBooks] = useState([])
    const [spokenText, setSpokenText] = useState('');
    const { transcript, listening } = useSpeechRecognition();
    const audioRef = useRef(null);

    const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
    console.log(currentAudioIndex);
    const audioRef2 = useRef(null);

    useEffect(() => {
        audioRef.current.play();
        const delay = 9000; // 5000 milliseconds = 5 seconds

        setTimeout(() => {
            retrieveAudioBooks();
        }, delay);
    }, []);

    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const playAudio = (index) => {
            if (index < AudioBooks.length) {
                audioRef2.current.src = AudioBooks[index]?.nameurl;

                // Add an event
                audioRef2.current.addEventListener("canplay", () => {
                    audioRef2.current.play();
                    setIsPlaying(true);
                });

                // Add an event listener
                audioRef2.current.addEventListener("ended", () => {
                    setIsPlaying(false);
                    setCurrentAudioIndex(currentAudioIndex + 1);
                    audioRef2.current.removeEventListener("canplay", () => { });
                    audioRef2.current.removeEventListener("ended", () => { });
                });
            }
        };

        if (!isPlaying) {
            playAudio(currentAudioIndex);
        }

        return () => {
            audioRef2.current.removeEventListener("canplay", () => { });
            audioRef2.current.removeEventListener("ended", () => { });
        };
    }, [AudioBooks, currentAudioIndex, isPlaying]);


    const retrieveAudioBooks = () => {
        axios.get('http://127.0.0.1:8000/audiobook/')
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

    const playAudio = (bookid) => {
        window.location.replace(`./audio-player/${bookid}`)
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
                console.log('Matching book:', matchingBook);
                playAudio(matchingBook.bookid);
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

    return (
        <div>
            <audio
                ref={audioRef}
                src={audio8}
                controls
                style={{
                    width: '100%',
                    marginTop: '20px',
                    borderRadius: '5px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    backgroundColor: '#f5f5f5',
                    padding: '10px',
                    display: 'none',
                }}
            />
            <audio ref={audioRef2} controls style={{ display: 'none' }} />
            <div className="pagemargin">
                <div className="">
                    <div >
                        <div class="col-md-12 pt-4 d-flex justify-content-center">
                            <h1 style={{ fontWeight: '700', fontSize: '50px' }}>Audio පොත් පිටුව</h1>
                        </div>
                        <div class="col-md-12 d-flex justify-content-center">
                            <h1 >
                                Space බටන් එක Click කර ඔබට අවශ්‍ය පොතෙහි නම පවසන්න.
                            </h1>
                        </div>
                    </div>

                    <div class=" documentpagecss ">
                        <div class="container d-flex justify-content-center">
                            <ul class="list-group mt-5 text-white">
                                {AudioBooks.map((audioBook) => (

                                    <li class="list-group-item d-flex justify-content-between align-content-center " onClick={() => { window.location.replace(`./audio-player/${audioBook?.bookid}`) }}>
                                        <div class="d-flex flex-row">
                                            <img src="https://cdn-icons-png.flaticon.com/512/59/59284.png" className='me-3' width="70" />
                                            <div class="ml-2">
                                                <h2 class="mt-3 ms-4" style={{ fontWeight: '700' }}>{audioBook.title}</h2>
                                            </div>
                                        </div>
                                        <div >
                                            <i class="fa fa-play fa-2x mt-3 me-3" style={{ fontSize: '50px' }}></i>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AudioBooksPage