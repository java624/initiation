import React, { useEffect, useState } from 'react';
import {
  TextInput,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@/theme';
import { Text } from '../Text';
import { useStyles } from './FloatingInput.styles';
import { FloatingInputProps } from './FloatingInput.types';

export const FloatingInput: React.FC<FloatingInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  value,
  onChangeText,
  onFocus,
  onBlur,
  secureTextEntry,
  ...rest
}) => {
  const styles = useStyles();
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const hasValue = Boolean(value && value.length > 0);
  const isFloating = isFocused || hasValue;

  const animation = useSharedValue(isFloating ? 1 : 0);

  useEffect(() => {
    animation.value = withTiming(isFloating ? 1 : 0, { duration: 180 });
  }, [isFloating, animation]);

  const animatedLabelStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: animation.value * -11 },
        { scale: 1 - animation.value * 0.22 },
      ],
      color: isFocused
        ? colors.accent
        : error
        ? colors.danger
        : animation.value === 1
        ? colors.textSecondary
        : colors.textTertiary,
    };
  });

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          Boolean(error) && styles.inputWrapperError,
        ]}
      >
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

        <View style={styles.textContainer}>
          <Animated.Text
            style={[styles.floatingLabel, animatedLabelStyle]}
            numberOfLines={1}
          >
            {label}
          </Animated.Text>
          <TextInput
            style={styles.textInput}
            value={value}
            onChangeText={onChangeText}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            secureTextEntry={secureTextEntry}
            placeholderTextColor="transparent"
            selectionColor={colors.accent}
            accessibilityLabel={label}
            {...rest}
          />
        </View>

        {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
      </View>

      {Boolean(error) && (
        <Text style={styles.errorText} variant="small" color="danger">
          {error}
        </Text>
      )}
    </View>
  );
};
