import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Налаштування поведінки сповіщень, коли додаток відкритий
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowBadge: true,
    shouldShowList: true,
  }),
});

// Функція запиту дозволів (особливо актуально для Android 13+ та iOS)
export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    console.log('Повідомлення працюють лише на реальних пристроях');
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Не вдалося отримати дозвіл на сповіщення!');
    return;
  }
}
export async function scheduleTimerCompleteNotification(title: string, body: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      sound: true,
    },
    trigger: null, // Показати одразу
  });
}