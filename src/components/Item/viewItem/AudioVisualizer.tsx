import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback, LayoutChangeEvent, StyleProp } from 'react-native';
import { useAudioPlayer } from '../../../hooks/useAudioPlayer';
import { useTheme } from '../../../context/ThemeContext';
import { globalStyles } from '../../../styles/globalStyles';
import StyledText from '../../styledComponets/StyledText';
import StyledIcon from '../../styledComponets/StyledIcon';

type Props = {
   audio: string;
   color?: string;
};

const AudioVisualizer = ({ audio, color = '#6c5ce7' }: Props) => {
   const { theme } = useTheme();
   const gStyles = globalStyles(theme);
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
         <View style={gStyles.row}>
            <TouchableOpacity
               onPress={() => (isPlaying ? pause() : play(audio))}
               style={styles.buttonPlay}
            >
               <StyledIcon
                  src={isPlaying
                     ? require('../../../assets/icons-general/pause.png')
                     : require('../../../assets/icons-general/play.png')}
               />
            </TouchableOpacity>
            <View style={styles.visualizerAudio}>            
               <TouchableWithoutFeedback onPress={handleSeek}>
                  <View style={styles.seekBarContainer} onLayout={handleLayout} ref={progressBarRef}>
                     <View style={styles.seekBarBackground} />
                     <View style={[styles.seekBarProgress, { width: `${progressPercent * 100}%` }]} />
                  </View>
               </TouchableWithoutFeedback>
               <Text>{formatTime(currentPosition)} / {formatTime(duration)}</Text>
            </View>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   wrapper: {
      paddingVertical: 10,
   },
   buttonPlay: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'flex-start',
      fontSize: 40,

   },
   visualizerAudio:{
      width:'82%',
     
   },
   bar: {
      width: 6,
      borderRadius: 4
      
   },
   seekBarContainer: {
      height: 8,
      width: '100%',
      backgroundColor: '#ccc',
      borderRadius: 4,
      overflow: 'hidden',
      marginTop: 8,
      
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