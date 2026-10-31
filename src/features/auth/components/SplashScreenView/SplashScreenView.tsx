import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { Image } from 'expo-image';
import { useStyles } from './SplashScreenView.styles';

const logoSource = require('@/../assets/images/novaflow-logo.png');

export const SplashScreenView = () => {
  const styles = useStyles();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600 });
    scale.value = withSpring(1, { damping: 14, stiffness: 90 });
  }, [opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, animatedStyle]}>
        <View style={styles.glow} />
        <Image
          source={logoSource}
          style={styles.logo}
          contentFit="contain"
          transition={200}
        />
      </Animated.View>
    </View>
  );
};
