import React, { useEffect } from 'react';
import { ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { makeStyles } from '@/theme/makeStyles';

export interface SkeletonProps extends ViewProps {
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
}

const useStyles = makeStyles(({ colors, radius }) => ({
  base: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
}));

export const Skeleton = ({
  width = '100%',
  height = 16,
  borderRadius,
  style,
  ...rest
}: SkeletonProps) => {
  const styles = useStyles();
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 600 }),
        withTiming(0.4, { duration: 600 }),
      ),
      -1,
      false,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.base,
        animatedStyle,
        { width, height, borderRadius: borderRadius ?? styles.base.borderRadius },
        style,
      ]}
      accessibilityLabel="Завантаження..."
      {...rest}
    />
  );
};
