import { useEffect, useRef, useState } from 'react';

export const useVoiceInput = ({ onFinalTranscript, lang = 'en-IN' } = {}) => {
  const recognitionRef = useRef(null);
  const onFinalTranscriptRef = useRef(onFinalTranscript);
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    onFinalTranscriptRef.current = onFinalTranscript;
  }, [onFinalTranscript]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return undefined;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.lang = lang;
    recognition.onstart = () => {
      setError('');
      setInterimTranscript('');
      setIsListening(true);
    };
    recognition.onresult = (event) => {
      let interim = '';
      let final = '';
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const phrase = event.results[index][0].transcript;
        if (event.results[index].isFinal) final += phrase;
        else interim += phrase;
      }
      setInterimTranscript(interim);
      if (final.trim()) onFinalTranscriptRef.current?.(final.trim());
    };
    recognition.onerror = (event) => {
      const errors = {
        'audio-capture': 'No microphone was detected. Connect a microphone and try again.',
        'network': 'Browser speech service is unavailable. Check your internet connection.',
        'no-speech': 'No speech detected. Try speaking closer to the microphone.',
        'not-allowed': 'Microphone permission is blocked. Allow microphone access in browser settings.',
        'service-not-allowed': 'Speech recognition is blocked by the browser. Use Chrome or Edge on localhost/HTTPS.'
      };
      if (event.error !== 'aborted') setError(errors[event.error] || `Voice input failed (${event.error}).`);
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript('');
    };
    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
      recognitionRef.current = null;
    };
  }, [lang]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setError('Voice search is not supported in this browser.');
      return;
    }
    if (isListening) recognitionRef.current.stop();
    else recognitionRef.current.start();
  };

  return {
    isListening,
    interimTranscript,
    error,
    supported: Boolean(typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)),
    toggleListening
  };
};
