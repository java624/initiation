import type * as ExpoNotifications from 'expo-notifications';
import { Platform } from 'react-native';

type NotificationsModule = typeof ExpoNotifications;

const TIMER_CHANNEL_ID = 'timer';

export interface TimerNotificationTexts {
  title: string;
  body: string;
}

let notificationsPromise: Promise<NotificationsModule | null> | null = null;

/**
 * Підвантажує expo-notifications ліниво. У середовищі без потрібного нативного модуля
 * (Expo Go, веб) застосунок не падає, сповіщення просто вимкнені.
 */
function loadNotifications(): Promise<NotificationsModule | null> {
  if (Platform.OS === 'web') return Promise.resolve(null);

  if (!notificationsPromise) {
    notificationsPromise = import('expo-notifications')
      .then((module) => {
        // Поведінка сповіщень, коли додаток відкритий
        module.setNotificationHandler({
          handleNotification: async () => ({
            shouldPlaySound: true,
            shouldSetBadge: false,
            shouldShowBanner: true,
            shouldShowList: true,
          }),
        });
        return module;
      })
      .catch((error: unknown) => {
        console.warn('Сповіщення недоступні в цьому середовищі', error);
        return null;
      });
  }
  return notificationsPromise;
}

// Запит дозволів (особливо актуально для Android 13+ та iOS)
export async function registerForPushNotificationsAsync(): Promise<boolean> {
  const Notifications = await loadNotifications();
  if (!Notifications) return false;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(TIMER_CHANNEL_ID, {
      name: 'Pomodoro',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.warn('Не вдалося отримати дозвіл на сповіщення!');
    return false;
  }
  return true;
}

/** Миттєве сповіщення (залишено для сумісності). */
export async function scheduleTimerCompleteNotification(title: string, body: string) {
  const Notifications = await loadNotifications();
  if (!Notifications) return;
  await Notifications.scheduleNotificationAsync({
    content: { title, body, sound: true },
    trigger: null,
  });
}

/** Планує сповіщення через `seconds` секунд. Повертає id або null, якщо не вийшло. */
export async function scheduleTimerNotification(
  seconds: number,
  texts: TimerNotificationTexts,
): Promise<string | null> {
  const Notifications = await loadNotifications();
  if (!Notifications) return null;
  try {
    return await Notifications.scheduleNotificationAsync({
      content: { title: texts.title, body: texts.body, sound: true },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: Math.max(1, Math.round(seconds)),
        channelId: TIMER_CHANNEL_ID,
      },
    });
  } catch (error) {
    console.warn('Не вдалося запланувати сповіщення', error);
    return null;
  }
}

export async function cancelTimerNotification(id: string | null): Promise<void> {
  if (!id) return;
  const Notifications = await loadNotifications();
  if (!Notifications) return;
  try {
    await Notifications.cancelScheduledNotificationAsync(id);
  } catch (error) {
    console.warn('Не вдалося скасувати сповіщення', error);
  }
}
