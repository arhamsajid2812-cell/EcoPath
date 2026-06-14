"use client";

import { useEffect, useState, useRef, useCallback } from 'react';

export function useSTT(onResult?: (text: string) => void) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [supported, setSupported] = useState(true);
  

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

  
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

  
    recognition.onresult = (event: any) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptSegment = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          currentTranscript += transcriptSegment + ' ';
        }
      }
      
      const cleaned = currentTranscript.trim();
      if (cleaned) {
        setTranscript(prev => (prev + ' ' + cleaned).trim());
        if (onResult) {
          onResult(cleaned);
        }
      }
    };

    recognition.onerror = (event: ErrorEvent) => {
      console.error("Speech Recognition Error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onResult]);

  const startListening = useCallback(() => {
    if (supported && recognitionRef.current) {
      setTranscript('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, [supported]);

  const stopListening = useCallback(() => {
    if (supported && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [supported]);

  return {
    supported,
    isListening,
    transcript,
    startListening,
    stopListening,
  };
}
