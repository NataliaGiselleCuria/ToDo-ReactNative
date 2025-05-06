import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback, LayoutChangeEvent } from 'react-native';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

type Props = {
    audio: string;
    color?: string;
};

const AudioVisualizer = ({ audio, color = '#6c5ce7' }: Props) => {
    const { isPlaying, play, pause, seekTo, currentPosition, duration } = useAudioPlayer();
    const progressBarRef = useRef<View>(null);
    const progressBarWidth = useRef<number>(0);

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleSeek = (e: any) => {
        if (!duration || !progressBarWidth.current) return;
        const x = e.nativeEvent.locationX;
        const progress = x / progressBarWidth.current;
        const newPosition = progress * duration;
        seekTo(newPosition); // <- método del hook
    };

    const handleLayout = (e: LayoutChangeEvent) => {
        progressBarWidth.current = e.nativeEvent.layout.width;
    };

    const progressPercent = duration > 0 ? currentPosition / duration : 0;

    return (
        <View style={styles.wrapper}>
          <TouchableOpacity onPress={() => (isPlaying ? pause() : play(audio))}>
            <Text>{isPlaying ? '⏸' : '▶'}</Text>
          </TouchableOpacity>
          <Text>{formatTime(currentPosition)} / {formatTime(duration)}</Text>
    
          {/* Seekbar */}
          <TouchableWithoutFeedback onPress={handleSeek}>
            <View style={styles.seekBarContainer} onLayout={handleLayout} ref={progressBarRef}>
              <View style={styles.seekBarBackground} />
              <View style={[styles.seekBarProgress, { width: `${progressPercent * 100}%` }]} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    };

    const styles = StyleSheet.create({
        wrapper: {
          gap: 10,
          paddingVertical: 10
        },
        visualizer: {
          flexDirection: 'row',
          gap: 4,
          alignItems: 'flex-end',
          height: 50
        },
        bar: {
          width: 6,
          borderRadius: 4
        },
        seekBarContainer: {
          height: 8,
          backgroundColor: '#ccc',
          borderRadius: 4,
          overflow: 'hidden',
          marginTop: 8
        },
        seekBarBackground: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: '#ccc'
        },
        seekBarProgress: {
          height: '100%',
          backgroundColor: '#6c5ce7'
        }
      });

export default AudioVisualizer;