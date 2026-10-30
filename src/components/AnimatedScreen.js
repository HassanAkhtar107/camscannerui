import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

const AnimatedScreen = ({ active, direction, children }) => {
  const p = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    if (active) {
      p.setValue(0);
      Animated.timing(p, {
        toValue: 1,
        duration: 280,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }
  }, [active, p]);

  if (!active) return null;

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        {
          opacity: p,
          transform: [{ translateX: p.interpolate({ inputRange: [0, 1], outputRange: [24 * direction, 0] }) }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default AnimatedScreen;
