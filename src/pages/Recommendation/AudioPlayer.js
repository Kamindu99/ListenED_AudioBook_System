import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SpeechRecognition, {
    useSpeechRecognition,
} from 'react-speech-recognition';

const AudioPlayer = () => {
    const { id } = useParams();
    const [AudioBooks, setAudioBooks] = useState(null);
    const [spokenText, setSpokenText] = useState('');
    const audioRef = React.createRef();
    const [isPlaying, setIsPlaying] = useState(false);

    let playicon = 'https://cdn-icons-png.flaticon.com/512/0/375.png'
    let pauseicon = 'https://cdn-icons-png.flaticon.com/512/16/16427.png'
    let stopicon = 'https://cdn-icons-png.flaticon.com/512/152/152789.png'

    const [iconName, setIconName] = useState(stopicon);

    useEffect(() => {
        retrieveAudioBookById(id);
    }, [id]);

    const userid = 9

    const updateUseHistory = async (newHistory) => {
        try {
            // Fetch the user's old history
            const response = await axios.get(`https://listened.onrender.com/usermanagement/${userid}`);
            const oldHistory = response.data.usehistory;

            // Check if the new book name is already in the user's history
            if (!oldHistory.includes(newHistory)) {
                // Update the user's history by appending the new book name
                const updatedHistory = [...oldHistory, newHistory];

                // Update the user's history using a PUT request
                const updateResponse = await axios.put('https://listened.onrender.com/usermanagement/', {
                    userid: userid,
                    usehistory: updatedHistory,
                });

                if (updateResponse.status === 200) {
                    console.log('User history updated successfully');
                } else {
                    console.error('Failed to update user history');
                }
            } else {
                console.log('Book is already in user history. No update needed.');
            }
        } catch (error) {
            console.error('Error updating user history', error);
        }
    };



    useEffect(() => {
        playAudio();
        //call the update api and push the book name to the user history
        const updatedHistory = AudioBooks?.title;
        updateUseHistory(updatedHistory);
    }, [AudioBooks]);

    const retrieveAudioBookById = (id) => {
        axios.get(`https://listened.onrender.com/audiobook/${id}`)
            .then((res) => {
                setAudioBooks(res.data);
            })
            .catch((error) => {
                console.error('Error fetching AudioBooks by ID:', error);
            });
    };

    const handleSpokenText = (event) => {
        console.log('handleSpokenText');
        const text = event.results[0][0].transcript;

        const punctuationRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;
        const modifiedText = text.replace(punctuationRegex, '');

        setSpokenText(modifiedText);
    };

    const startVoiceRecognition = () => {
        console.log('startVoiceRecognition');
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US'; // Set the language to Sinhala (Sri Lanka)
        recognition.start();
        recognition.onresult = handleSpokenText;
    };

    const playAudio = () => {
        audioRef.current.play();
        setIsPlaying(true);
        setIconName(playicon)
    };

    const stopAudio = () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
        setIconName(stopicon)
    };

    const pauseAudio = () => {
        audioRef.current.pause();
        setIsPlaying(false);
        setIconName(pauseicon)
    };

    const commands = [
        {
            command: 'Play.',
            callback: playAudio,
        },
        {
            command: 'Stop.',
            callback: stopAudio,
        },
        {
            command: 'Pause.',
            callback: pauseAudio,
        },
    ];

    const { transcript, listening } = useSpeechRecognition({ commands });

    useEffect(() => {
        if (!listening) {
            SpeechRecognition.startListening({ continuous: true });
        }
        return () => {
            SpeechRecognition.stopListening();
        };
    }, [listening]);

    useEffect(() => {
        if (spokenText === 'play') {
            playAudio();
        } else if (spokenText === 'stop') {
            stopAudio();
        } else if (spokenText === 'pause') {
            pauseAudio();
        }
    }, [spokenText]);


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

    return (
        <div>
            <div className='mt-5' >
                <h1 className="container text-center" style={{ fontSize: '60px', fontWeight: '700', color: 'blue' }}>Audio Books Play පිටුව</h1>
                <h1 className="container text-center" style={{ fontSize: '40px', fontWeight: '700', letterSpacing: '2px' }}>{AudioBooks?.title}</h1>
            </div>

            {/* {spokenText && (
                <div className='container text-center'>
                    <p style={{ fontSize: '20px', fontWeight: '700' }}>You said: {spokenText}</p>
                </div>
            )} */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '50vh',
                    backgroundColor: '#d4d4d4',
                    marginLeft: '5%',
                    marginRight: '5%',
                    marginTop: '50px',
                }}
            >
                <img src={iconName} alt='' style={{ width: '300px', height: '300px', marginTop: '20px' }} onClick={() => { iconName == 'https://cdn-icons-png.flaticon.com/512/0/375.png' ? pauseAudio() : iconName == 'https://cdn-icons-png.flaticon.com/512/152/152789.png' ? playAudio() : playAudio() }} />
                <audio
                    ref={audioRef}
                    src={AudioBooks?.url}
                    controls
                    style={{
                        width: '100%',
                        marginTop: '20px',
                        borderRadius: '5px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        backgroundColor: '#d4d4d4',
                        padding: '10px',
                    }}
                />
            </div>
        </div>
    );
};

export default AudioPlayer;
