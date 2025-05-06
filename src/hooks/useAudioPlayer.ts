import { useState, useRef, useEffect } from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

export const useAudioPlayer = () => {
  const audioPlayer = useRef(new AudioRecorderPlayer()).current;
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);

  const play = async (uri: string) => {
    try {
      await audioPlayer.startPlayer(uri);
      setIsPlaying(true);

      audioPlayer.addPlayBackListener((e) => {
        setCurrentPosition(e.currentPosition);
        setDuration(e.duration);
        if (e.currentPosition >= e.duration) {
          stop();
        }
      });
    } catch (e) {
      console.error('Error al reproducir', e);
    }
  };

  const pause = async () => {
    try {
      await audioPlayer.pausePlayer();
      setIsPlaying(false);
    } catch (e) {
      console.error('Error al pausar', e);
    }
  };

  const resume = async () => {
    try {
      await audioPlayer.resumePlayer();
      setIsPlaying(true);
    } catch (e) {
      console.error('Error al reanudar', e);
    }
  };

  const stop = async () => {
    try {
      await audioPlayer.stopPlayer();
      audioPlayer.removePlayBackListener();
    } catch (e) {
      console.error('Error al detener', e);
    } finally {
      setIsPlaying(false);
      setCurrentPosition(0);
    }
  };

  const seekTo = async (ms: number) => {
    try {
      await audioPlayer.seekToPlayer(ms);
    } catch (e) {
      console.error('Error al seek', e);
    }
  }

  useEffect(() => {
    return () => {
      stop(); // Cleanup
    };
  }, []);

  return {
    isPlaying,
    duration,
    currentPosition,
    play,
    pause,
    resume,
    stop,
    seekTo
  };
};