import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { Screen } from '@/shared/ui/Screen';
import { Text } from '@/shared/ui/Text';
import { useStyles } from './OnboardingView.styles';
import { OnboardingViewProps } from './OnboardingView.types';

export const OnboardingView = ({
  onGetStarted,
  onSignIn,
  onDemoLogin,
  onSkip,
}: OnboardingViewProps) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      symbol: '🧠',
      tag: 'SM-2 Algorithm',
      titleKey: 'onboarding.slide1Title',
      descKey: 'onboarding.slide1Desc',
      featureTitle: 'SuperMemo-2 Protocol',
      featureSubtitle: 'Автоматичний розрахунок інтервалів повторень',
      featureIcon: '📊',
    },
    {
      symbol: '⏱️',
      tag: 'Focus Pomodoro',
      titleKey: 'onboarding.slide2Title',
      descKey: 'onboarding.slide2Desc',
      featureTitle: '25 хв фокусу + 5 хв відпочинку',
      featureIcon: '🔔',
      featureSubtitle: 'Локальні сповіщення та фонова робота',
    },
    {
      symbol: '🔥',
      tag: 'Streak & Habits',
      titleKey: 'onboarding.slide3Title',
      descKey: 'onboarding.slide3Desc',
      featureTitle: 'Денна ціль: 20 карток',
      featureIcon: '🎯',
      featureSubtitle: 'Графіки повторень за 7 та 30 днів',
    },
  ];

  const slide = slides[currentSlide];
  const isLast = currentSlide === slides.length - 1;

  const handleNext = () => {
    if (isLast) {
      onGetStarted();
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        {/* Top Header with App Badge and Skip */}
        <View style={styles.topBar}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{t('common.appName')}</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('onboarding.skip')}
            style={styles.skipButton}
            onPress={onSkip ?? onSignIn}
          >
            <Text variant="caption" color="secondary">
              {t('onboarding.skip')}
            </Text>
          </Pressable>
        </View>

        {/* Slide Main Content */}
        <View style={styles.slideContent}>
          <View style={styles.iconHalo}>
            <Text style={styles.iconSymbol}>{slide.symbol}</Text>
          </View>

          <View style={styles.tagPill}>
            <Text style={styles.tagPillText}>{slide.tag}</Text>
          </View>

          <Text style={styles.slideTitle}>{t(slide.titleKey)}</Text>
          <Text style={styles.slideDesc}>{t(slide.descKey)}</Text>

          {/* Interactive Preview Card */}
          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Text style={styles.featureIconText}>{slide.featureIcon}</Text>
            </View>
            <View style={styles.featureTextCol}>
              <Text style={styles.featureTitle}>{slide.featureTitle}</Text>
              <Text style={styles.featureSubtitle}>{slide.featureSubtitle}</Text>
            </View>
          </View>
        </View>

        {/* Pagination Dots */}
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <Pressable
              key={`dot-${index}`}
              accessibilityRole="button"
              accessibilityLabel={`Слайд ${index + 1}`}
              onPress={() => setCurrentSlide(index)}
              style={[
                styles.dot,
                index === currentSlide ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        {/* Bottom Actions */}
        <View style={styles.actionsSection}>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            label={isLast ? t('onboarding.getStarted') : t('onboarding.next')}
            onPress={handleNext}
          />

          <View style={styles.secondaryRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t('onboarding.alreadyHaveAccount')}
              onPress={onSignIn}
            >
              <Text variant="caption" color="accent">
                {t('onboarding.alreadyHaveAccount')}
              </Text>
            </Pressable>
          </View>

          {onDemoLogin && (
            <View style={styles.demoRow}>
              <Button
                variant="ghost"
                size="sm"
                label={t('onboarding.quickDemoTour')}
                onPress={() => onDemoLogin('student')}
              />
            </View>
          )}
        </View>
      </View>
    </Screen>
  );
};
