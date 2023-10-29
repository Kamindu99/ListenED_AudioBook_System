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

    useEffect(() => {
        playAudio();
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
        if (spokenText === 'Play') {
            playAudio();
        } else if (spokenText === 'Stop') {
            stopAudio();
        } else if (spokenText === 'Pause') {
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
