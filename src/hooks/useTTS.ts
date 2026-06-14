"use client";

import { useEffect, useState, useCallback, useRef } from 'react';
import { useA11yStore } from '@/store/a11yStore';

/**
 * A custom React hook that provides an interface to the Web Speech Synthesis API.
 * Handles text chunking for long strings, voice selection, and speech controls
 * linked directly to the global accessibility store.
 * 
 * @returns An object containing TTS state (supported, errorMsg, voices, isSpeaking, isPaused)
 *          and control functions (play, pause, resume, stop).
 */
export function useTTS() {
  const { ttsEnabled, speechRate, speechVolume, speechPitch, selectedVoiceURI } = useA11yStore();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [supported, setSupported] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Keep track of the current utterance to prevent garbage collection issues in some browsers
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('speechSynthesis' in window) || !window.speechSynthesis) {
      setSupported(false);
      setErrorMsg("Text-to-Speech is not supported in this browser.");
      return;
    }

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length === 0) return; // Wait for async load
      
      console.log('Available voices:', availableVoices);
      setVoices(availableVoices);
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Queue for long text chunks
  const chunksQueue = useRef<string[]>([]);

  const playNextChunk = useCallback(() => {
    if (chunksQueue.current.length === 0) {
      setIsSpeaking(false);
      setIsPaused(false);
      currentUtterance.current = null;
      return;
    }

    const nextText = chunksQueue.current.shift()!;
    const utterance = new SpeechSynthesisUtterance(nextText);
    currentUtterance.current = utterance;
    
    utterance.rate = speechRate;
    utterance.volume = speechVolume;
    utterance.pitch = speechPitch;

    // Language Auto-Detection
    const isHindi = /[\u0900-\u097F]/.test(nextText);
    const isUrdu = /[\u0600-\u06FF]/.test(nextText);
    
    let targetLang = 'en';
    if (isHindi) targetLang = 'hi';
    if (isUrdu) targetLang = 'ur';

    if (selectedVoiceURI && voices.length > 0) {
      const selectedVoice = voices.find(v => v.voiceURI === selectedVoiceURI);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    } else if (voices.length > 0) {
      // Auto-select based on detected language
      const bestVoice = voices.find(v => v.lang.toLowerCase().startsWith(targetLang)) || 
                        voices.find(v => v.lang.includes('en-US')) || 
                        voices[0];
      utterance.voice = bestVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };
    
    utterance.onend = () => {
      // Recursively play next chunk
      playNextChunk();
    };
    
    utterance.onerror = (event) => {
      if (event.error !== 'canceled' && event.error !== 'interrupted') {
        console.error('TTS Error:', event);
        setErrorMsg("Unable to play speech.");
      }
      setIsSpeaking(false);
      setIsPaused(false);
      currentUtterance.current = null;
      chunksQueue.current = []; // Clear queue on error
    };

    window.speechSynthesis.speak(utterance);
  }, [speechRate, speechVolume, speechPitch, selectedVoiceURI, voices]);

  const play = useCallback((text: string) => {
    if (typeof window === 'undefined') return;
    if (!supported || !text) return;
    
    window.speechSynthesis.cancel();
    setErrorMsg(null);
    chunksQueue.current = [];

    // Chunking logic for 5000+ characters safety
    const MAX_CHUNK_LENGTH = 4000;
    
    if (text.length <= MAX_CHUNK_LENGTH) {
      chunksQueue.current.push(text);
    } else {
      // Split by periods or newlines to avoid cutting words
      const regex = /([^.!?\n]+[.!?\n]+)/g;
      const sentences = text.match(regex) || [text];
      
      let currentChunk = "";
      for (const sentence of sentences) {
        if (currentChunk.length + sentence.length > MAX_CHUNK_LENGTH) {
          chunksQueue.current.push(currentChunk.trim());
          currentChunk = sentence;
        } else {
          currentChunk += sentence;
        }
      }
      if (currentChunk.trim()) {
        chunksQueue.current.push(currentChunk.trim());
      }
    }

    console.log(`TTS Started. Queued ${chunksQueue.current.length} chunks.`);
    playNextChunk();

  }, [supported, playNextChunk]);

  const pause = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (supported && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsSpeaking(false);
    }
  }, [supported]);

  const resume = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (supported && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsSpeaking(true);
    }
  }, [supported]);

  const stop = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (supported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      currentUtterance.current = null;
    }
  }, [supported]);

  return {
    supported,
    errorMsg,
    voices,
    isSpeaking,
    isPaused,
    play,
    pause,
    resume,
    stop
  };
}
