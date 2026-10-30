@echo off
chcp 65001 > nul
title NovaFlow Kroky - Android Launcher

echo ===================================================
echo   NovaFlow Kroky - Запуск на Android Emulator
echo ===================================================

echo [1/3] Перевірка підключених емуляторів...
adb devices | findstr "emulator-" > nul
if %errorlevel% neq 0 (
    echo Емулятор не запущено. Запускаємо Pixel_10_Pro у фоні...
    start "" emulator -avd Pixel_10_Pro
    echo Очікування завантаження емулятора...
    adb wait-for-device
    echo Емулятор підключено!
) else (
    echo Емулятор вже запущено!
)

echo [2/3] Налаштування мережевого порту (adb reverse)...
adb reverse tcp:8081 tcp:8081

echo [3/3] Запуск застосунку в Expo Go...
npx expo start --go --android

pause
