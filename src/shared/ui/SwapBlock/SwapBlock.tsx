import React, { useEffect, useRef } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

// Налаштування швидкості. Змінюй ці числа, щоб зробити анімацію швидшою чи повільнішою.
export const SWAP_EXIT = 200; // скільки блок "виїжджає", мс
export const SWAP_ENTER = 340; // скільки блок "приїжджає", мс
export const SWAP_STAGGER = 28; // затримка між рядками, мс
export const SWAP_BLOCKS = 8; // скільки всього блоків (індекси 0..7)
export const SWAP_GAP = 80; // пауза, коли все сховано і міняється мова, мс

const SWAP_MAX_DELAY = (SWAP_BLOCKS - 1) * SWAP_STAGGER;
const DISTANCE = 36;

// Через скільки мс після старту треба викликати i18n.changeLanguage
export const SWAP_TEXT_CHANGE_MS = SWAP_EXIT + SWAP_MAX_DELAY + SWAP_GAP / 2;
// Повна тривалість анімації
export const SWAP_TOTAL_MS =
  SWAP_EXIT + SWAP_MAX_DELAY + SWAP_GAP + SWAP_MAX_DELAY + SWAP_ENTER;

interface SwapBlockProps {
  /** Збільшується на 1 при кожному перемиканні мови */
  signal: number;
  /** 1 = повзунок поїхав праворуч, -1 = ліворуч */
  direction: 1 | -1;
  /** Порядковий номер блоку (0..SWAP_BLOCKS-1), задає каскад */
  index?: number;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export const SwapBlock: React.FC<SwapBlockProps> = ({
  signal,
  direction,
  index = 0,
  style,
  children,
}) => {
  const x = useSharedValue(0);
  const opacity = useSharedValue(1);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const dir = direction;
    const delay = index * SWAP_STAGGER;
    const hold = SWAP_MAX_DELAY + SWAP_GAP;

    // Старий текст їде в бік повзунка й зникає,
    // потім новий приїжджає з протилежного боку
    x.value = withSequence(
      withDelay(
        delay,
        withTiming(dir * DISTANCE, { duration: SWAP_EXIT, easing: Easing.in(Easing.quad) }),
      ),
      withDelay(hold, withTiming(-dir * DISTANCE, { duration: 0 })),
      withTiming(0, { duration: SWAP_ENTER, easing: Easing.out(Easing.cubic) }),
    );

    opacity.value = withSequence(
      withDelay(delay, withTiming(0, { duration: SWAP_EXIT })),
      withDelay(hold, withTiming(0, { duration: 0 })),
      withTiming(1, { duration: SWAP_ENTER }),
    );
  }, [signal, direction, index, x, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: x.value }],
  }));

  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
};