import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, Eye, EyeOff, ExternalLink, ArrowRight } from 'lucide-react-native';
import { useTheme } from '@/theme';
import { FloatingInput } from '@/shared/ui/FloatingInput';
import { Text } from '@/shared/ui/Text';
import { SwapBlock, SWAP_TEXT_CHANGE_MS, SWAP_TOTAL_MS } from '@/shared/ui/SwapBlock';
import { useAuth } from '../../hooks/useAuth';
import { useStyles, LANG_OPTION_WIDTH } from './AuthView.styles';
import { AuthViewProps } from './AuthView.types';

const logoSource = require('@/../assets/images/novaflow-logo.png');

const LANGUAGES = [
  { code: 'uk', label: 'UA' },
  { code: 'en', label: 'EN' },
] as const;

const LANG_SPRING = { damping: 16, stiffness: 180, mass: 0.8 };
const PRESS_SPRING = { damping: 14, stiffness: 260 };

export const AuthView: React.FC<AuthViewProps> = ({ onSuccess }) => {
  const styles = useStyles();
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const { signIn, demoLogin, isSubmitting } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // У станах зберігаємо ключі перекладу, щоб помилки змінювали мову разом з інтерфейсом
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  // Анімація зміни мови: сигнал і напрямок руху повзунка
  const [swapSignal, setSwapSignal] = useState(0);
  const [swapDirection, setSwapDirection] = useState<1 | -1>(1);
  const isSwitching = useRef(false);

  const currentLang = i18n.language?.startsWith('en') ? 'en' : 'uk';

  // Анімації появи
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(12);
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(16);
  const bottomOpacity = useSharedValue(0);
  const bottomTranslateY = useSharedValue(12);

  // Перемикач мови: 0 = UA, 1 = EN
  const langProgress = useSharedValue(currentLang === 'en' ? 1 : 0);

  // Кнопка "Увійти"
  const buttonScale = useSharedValue(1);
  const arrowX = useSharedValue(0);
  const shineX = useSharedValue(-120);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 400 });
    headerTranslateY.value = withSpring(0, { damping: 15, stiffness: 100 });

    cardOpacity.value = withDelay(100, withTiming(1, { duration: 400 }));
    cardTranslateY.value = withDelay(100, withSpring(0, { damping: 15, stiffness: 100 }));

    bottomOpacity.value = withDelay(200, withTiming(1, { duration: 400 }));
    bottomTranslateY.value = withDelay(200, withSpring(0, { damping: 15, stiffness: 100 }));

    // Один світловий відблиск по кнопці після появи
    shineX.value = withDelay(
      900,
      withTiming(480, { duration: 1100, easing: Easing.inOut(Easing.quad) }),
    );
  }, [
    headerOpacity,
    headerTranslateY,
    cardOpacity,
    cardTranslateY,
    bottomOpacity,
    bottomTranslateY,
    shineX,
  ]);

  const headerAnimStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const cardAnimStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }],
  }));

  const bottomAnimStyle = useAnimatedStyle(() => ({
    opacity: bottomOpacity.value,
    transform: [{ translateY: bottomTranslateY.value }],
  }));

  // Повзунок, що перелітає між UA і EN
  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(langProgress.value, [0, 1], [0, LANG_OPTION_WIDTH]) },
    ],
  }));

  // Кольори підписів змінюються синхронно з повзунком
  const uaTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      langProgress.value,
      [0, 1],
      [colors.onAccent, colors.textSecondary],
    ),
  }));
  const enTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      langProgress.value,
      [0, 1],
      [colors.textSecondary, colors.onAccent],
    ),
  }));

  const buttonScaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: arrowX.value }],
  }));

  const shineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shineX.value }, { rotate: '20deg' }],
  }));

  const validate = (): boolean => {
    let isValid = true;
    setEmailError(null);
    setPasswordError(null);
    setGeneralError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailError('auth.emailRequired');
      isValid = false;
    } else if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setEmailError('validation.invalidEmail');
      isValid = false;
    }

    if (!password) {
      setPasswordError('auth.passwordRequired');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('validation.minPassword');
      isValid = false;
    }

    return isValid;
  };

  const handleSignIn = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // Haptics optional on unsupported platforms
    }

    if (!validate()) {
      return;
    }

    try {
      await signIn({
        email: email.trim(),
        password,
      });
      onSuccess?.();
    } catch (err) {
      setGeneralError(err instanceof Error ? err.message : t('auth.signInFailed'));
    }
  };

  const handleForgotPassword = () => {
    setShowInfo(true);
  };

  const handleOpenWebsite = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // ignore
    }
    await Linking.openURL('https://novaflow-school.com');
  };

  const handleDemoAccess = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // ignore
    }
    demoLogin('student');
    onSuccess?.();
  };

  const handleChangeLanguage = (code: string) => {
    if (code === currentLang || isSwitching.current) return;
    isSwitching.current = true;

    Haptics.selectionAsync().catch(() => undefined);

    const nextIndex = LANGUAGES.findIndex((l) => l.code === code);
    const prevIndex = LANGUAGES.findIndex((l) => l.code === currentLang);

    // Повзунок їде вправо (до EN) = 1, вліво (до UA) = -1.
    // Текст рухається в той самий бік, що й повзунок.
    setSwapDirection(nextIndex > prevIndex ? 1 : -1);
    setSwapSignal((s) => s + 1);
    langProgress.value = withSpring(nextIndex, LANG_SPRING);

    // Мову міняємо в момент, коли весь текст уже сховано
    setTimeout(() => {
      i18n.changeLanguage(code);
    }, SWAP_TEXT_CHANGE_MS);

    setTimeout(() => {
      isSwitching.current = false;
    }, SWAP_TOTAL_MS);
  };

  const swapProps = { signal: swapSignal, direction: swapDirection };

  return (
    <SafeAreaView style={styles.safe}>
      {/* М'яке фіолетове сяйво зверху екрана */}
      <LinearGradient
        colors={[colors.accentSubtle, colors.background]}
        style={styles.glow}
        pointerEvents="none"
      />

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 12 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.innerContainer}>
            {/* Перемикач мови з повзунком */}
            <View style={styles.topBar}>
              <View
                style={styles.langSwitch}
                accessibilityLabel={t('auth.languageSwitch')}
              >
                <Animated.View style={[styles.langIndicator, indicatorStyle]} />
                {LANGUAGES.map(({ code, label }) => (
                  <Pressable
                    key={code}
                    style={styles.langOption}
                    onPress={() => handleChangeLanguage(code)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: code === currentLang }}
                  >
                    <Animated.Text
                      style={[styles.langText, code === 'uk' ? uaTextStyle : enTextStyle]}
                    >
                      {label}
                    </Animated.Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Центральний блок: лого + форма */}
            <View style={styles.content}>
              <Animated.View style={[styles.header, headerAnimStyle]}>
                <View style={styles.logoCircle}>
                  <Image
                    source={logoSource}
                    style={styles.logo}
                    contentFit="contain"
                    transition={200}
                  />
                </View>
                <SwapBlock {...swapProps} index={0}>
                  <Text style={styles.welcomeTitle}>{t('auth.brandName')}</Text>
                </SwapBlock>
                <SwapBlock {...swapProps} index={1}>
                  <Text style={styles.welcomeSubtitle}>{t('auth.tagline')}</Text>
                </SwapBlock>
              </Animated.View>

              <Animated.View style={[styles.mainCard, cardAnimStyle]}>
                {generalError && (
                  <View style={styles.errorBanner}>
                    <Text style={styles.errorBannerText}>{generalError}</Text>
                  </View>
                )}

                {showInfo && (
                  <View style={styles.infoBanner}>
                    <Text style={styles.infoBannerText}>
                      {t('auth.forgotPasswordInfo')}
                    </Text>
                  </View>
                )}

                <View style={styles.form}>
                  <SwapBlock {...swapProps} index={2} style={styles.swapFull}>
                    <FloatingInput
                      label={t('auth.emailLabel')}
                      value={email}
                      onChangeText={(val) => {
                        setEmail(val);
                        if (emailError) setEmailError(null);
                        if (generalError) setGeneralError(null);
                      }}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      error={emailError ? t(emailError) : null}
                      leftIcon={<Mail size={20} color={colors.textTertiary} />}
                    />
                  </SwapBlock>

                  <SwapBlock {...swapProps} index={3} style={styles.swapFull}>
                    <FloatingInput
                      label={t('auth.password')}
                      value={password}
                      onChangeText={(val) => {
                        setPassword(val);
                        if (passwordError) setPasswordError(null);
                        if (generalError) setGeneralError(null);
                      }}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      error={passwordError ? t(passwordError) : null}
                      leftIcon={<Lock size={20} color={colors.textTertiary} />}
                      rightIcon={
                        <Pressable
                          style={styles.passwordToggle}
                          onPress={() => setShowPassword(!showPassword)}
                          accessibilityLabel={
                            showPassword ? t('auth.hidePassword') : t('auth.showPassword')
                          }
                          accessibilityRole="button"
                          hitSlop={8}
                        >
                          {showPassword ? (
                            <EyeOff size={20} color={colors.textTertiary} />
                          ) : (
                            <Eye size={20} color={colors.textTertiary} />
                          )}
                        </Pressable>
                      }
                    />
                  </SwapBlock>
                </View>

                <SwapBlock {...swapProps} index={4} style={styles.swapFull}>
                  <Pressable
                    style={styles.forgotPasswordContainer}
                    onPress={handleForgotPassword}
                    accessibilityRole="button"
                    accessibilityLabel={t('auth.forgotPassword')}
                  >
                    <Text style={styles.forgotPasswordText}>{t('auth.forgotPassword')}</Text>
                  </Pressable>
                </SwapBlock>

                {/* Кнопка "Увійти" */}
                <SwapBlock {...swapProps} index={5} style={styles.swapFull}>
                  <Animated.View style={[styles.submitButtonWrapper, buttonScaleStyle]}>
                    <LinearGradient
                      colors={[colors.gradientStart, colors.gradientMid, colors.gradientEnd]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0.4 }}
                      style={styles.gradientButton}
                    >
                      <LinearGradient
                          colors={[colors.onAccent, 'transparent']}
                          style={styles.buttonHighlight}
                          pointerEvents="none"
                      />
                      <View style={styles.buttonBorder} pointerEvents="none" />
                      <Animated.View
                        style={[styles.buttonShine, shineStyle]}
                        pointerEvents="none"
                      />
                      <Pressable
                        style={[
                          styles.submitButton,
                          isSubmitting && styles.submitButtonDisabled,
                        ]}
                        onPress={handleSignIn}
                        onPressIn={() => {
                          buttonScale.value = withSpring(0.97, PRESS_SPRING);
                          arrowX.value = withSpring(4, PRESS_SPRING);
                        }}
                        onPressOut={() => {
                          buttonScale.value = withSpring(1, PRESS_SPRING);
                          arrowX.value = withSpring(0, PRESS_SPRING);
                        }}
                        disabled={isSubmitting}
                        accessibilityRole="button"
                        accessibilityLabel={t('auth.submitSignIn')}
                      >
                        {isSubmitting ? (
                          <ActivityIndicator color={colors.onAccent} size="small" />
                        ) : (
                          <>
                            <Text style={styles.submitButtonText}>
                              {t('auth.submitSignIn')}
                            </Text>
                            <View style={styles.arrowSlot}>
                              <View style={styles.arrowCircle}>
                                <View style={styles.arrowCircleBg} />
                                <Animated.View style={arrowStyle}>
                                  <ArrowRight size={20} color={colors.onAccent} />
                                </Animated.View>
                              </View>
                            </View>
                          </>
                        )}
                      </Pressable>
                    </LinearGradient>
                  </Animated.View>
                </SwapBlock>
              </Animated.View>
            </View>

            {/* Низ екрана */}
            <Animated.View style={[styles.bottomSection, bottomAnimStyle]}>
              <SwapBlock {...swapProps} index={6} style={styles.swapFull}>
                <Pressable
                  style={styles.trialButton}
                  onPress={handleOpenWebsite}
                  accessibilityRole="button"
                  accessibilityLabel={t('auth.freeTrialA11y')}
                >
                  <Text style={styles.trialText}>{t('auth.freeTrial')}</Text>
                  <ExternalLink size={16} color={colors.accent} />
                </Pressable>
              </SwapBlock>

              <SwapBlock {...swapProps} index={7}>
                <Pressable
                  style={styles.demoButton}
                  onPress={handleDemoAccess}
                  accessibilityRole="button"
                  accessibilityLabel={t('auth.viewDemo')}
                >
                  <Text style={styles.demoText}>{t('auth.viewDemo')}</Text>
                </Pressable>
              </SwapBlock>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};