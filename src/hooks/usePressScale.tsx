import { useState } from 'react';
import { Animated } from 'react-native';

export const usePressScale = (initialScale = 1, pressedScale = 1.4) => {
  const [scale] = useState(new Animated.Value(initialScale));

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: pressedScale,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: initialScale,
      useNativeDriver: true,
    }).start();
  };

  return {
    scaleStyle: { transform: [{ scale }] },
    handlePressIn,
    handlePressOut,
  };
};