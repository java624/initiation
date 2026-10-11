# 🚀 Технічний план розробки застосунку «NovaFlow: Кроки» (React Native / Expo)

> **Фінальний командний проєкт на 4 тижні (100 балів + 15 бонусів)**  
> **Стек:** React Native (Expo SDK 57), Expo Router, TypeScript (strict), Zustand, TanStack Query, Supabase, FlashList, Reanimated, react-hook-form + zod, i18next, pnpm.

---

## 📌 1. Про проєкт та розподіл обов'язків

Застосунок **«NovaFlow: Кроки»** — це мобільний клієнт для вивчення мов та самоосвіти, створений як екосистема для платформи **NovaFlow**.  
Включає: інтервальне повторення за науковим алгоритмом **SM-2**, фокус-таймер **Pomodoro 25/5**, статистику з графіками, інтеграцію з **Supabase**, офлайн-режим та двомовний інтерфейс.

Команда працює за принципом **Feature-Based Architecture**: кожен розробляє власні ізольовані модулі в окремих папках та окремих гілках Git, що зводить ризик конфліктів (merge conflicts) майже до нуля.

### 👥 Склад команди та зони відповідальності:

1. **Павло (Core & Fullstack):**
   - Архітектура проєкту, конфігурація `pnpm`, `tsconfig`, ESLint/Prettier/Husky.
   - Дизайн-токени бренду NovaFlow (`src/theme/`), `makeStyles.ts`, `ThemeProvider`.
   - Бекенд Supabase (міграції, RLS-політики, клієнт `supabase.ts` з `expo-secure-store`).
   - Ядро інтервального повторення: чистий алгоритм `sm2.ts`, Unit-тести на Jest, 3D-анімація перевороту картки, сесія `StudySession`.
   - Офлайн-кешування (TanStack Query + MMKV/AsyncStorage).
   - Налаштування CI (GitHub Actions) та code review.

2. **Олександр (Feature Developer 1 — Auth, Decks & Cards):**
   - Онбординг (`Onboarding` на 3 слайди зі свайпом).
   - Авторизація (`SignIn`, `SignUp`, `ForgotPassword`) з валідацією `react-hook-form` + `zod`.
   - Модуль колод: `DecksList` (список на `FlashList` зі свайпом видалення через `react-native-gesture-handler`), `DeckDetails`, `DeckForm`.
   - Модуль карток: `CardsList`, `CardForm` (CRUD карток: слово, переклад, приклад).
   - **Бонус:** Імпорт карток із тексту / CSV файлу.

3. **Іван (Feature Developer 2 — UI-Kit, Timer, Stats, Settings & Dictionary):**
   - Базовий UI-кіт на токенах теми (`shared/ui/`): `Button`, `Text`, `Input`, `Card`, `Screen`, `EmptyState`, `Skeleton`.
   - Локалізація (`i18next` + словники `uk.json`, `en.json`).
   - Фокус-таймер Pomodoro (`features/focus/`): Zustand-стор `useTimerStore`, фоновий розрахунок часу, локальні сповіщення `expo-notifications`.
   - Профіль та налаштування (`Profile`, `Settings`): перемикання теми (світла/темна), мови, денна ціль.
   - Головний екран (`Home`): прогрес дня, серія днів (streak), швидкий запуск.
   - **Бонус 1:** Словник `WordLookup` через публічний Free Dictionary API.
   - **Бонус 2:** Екран `Stats` з графіками повторень за 7/30 днів (`react-native-gifted-charts`).

---

## 📅 2. Детальний потижневий план завдань

---

### 🟢 ТИЖДЕНЬ 1: Фундамент, UI-система та налаштування оточення

> **Мета тижня:** Налаштувати чистий проєкт, дизайн-систему, базові UI-компоненти та локалізацію.

#### 🛠 Павло:

- [x] Ініціалізувати чистий Expo SDK 57 проєкт з Expo Router через `pnpm`.
- [x] Налаштувати `tsconfig.json` з `"strict": true` та аліасами (`@/features`, `@/shared`, `@/theme`, `@/store`).
- [x] Налаштувати ESLint, Prettier, Husky pre-commit хук (перевірка `lint` та `typecheck`).
- [x] Створити структуру папок проєкту за правилами ТЗ (Розділ 4).
- [x] Створити дизайн-систему `src/theme/`:
  - `tokens/palette.ts` (фірмова палітра NovaFlow: пурпурний, смарагдовий, бурштиновий, слейт).
  - `tokens/colors.ts` (семантичні кольори для light та dark тем).
  - `tokens/spacing.ts`, `radius.ts`, `typography.ts`, `shadows.ts`.
  - `ThemeProvider.tsx`, `useTheme.ts`, `makeStyles.ts`.
- [ ] Створити GitHub репозиторій, налаштувати захист гілки `main`, надати доступ Олександру та Івану.

#### 🛠 Олександр:

- [ ] Встановити та протестувати запуск проєкту локально через `pnpm install` та `pnpm start`.
- [ ] Створити окрему гілку `feature/auth-schemas`.
- [ ] Описати Zod-схеми валідації в `src/features/auth/schemas/auth.schema.ts`:
  - Схема реєстрації (email, пароль від 6 символів, підтвердження пароля, ім'я).
  - Схема входу (email, пароль).
- [ ] Підготувати типи для користувача та сесії в `src/features/auth/types.ts`.
- [ ] Зробити Pull Request до гілки `main`.

#### 🛠 Іван:

- [ ] Встановити та протестувати запуск проєкту локально через `pnpm install` та `pnpm start`.
- [ ] Створити окрему гілку `feature/ui-kit-and-i18n`.
- [ ] Реалізувати компоненти у `src/shared/ui/` з використанням хелпера `makeStyles`:
  - `Text/Text.tsx` (варіанти: h1, h2, h3, body, bodyMedium, caption, small).
  - `Button/Button.tsx` (варіанти: primary, secondary, ghost, небезпечна danger; стани loading, disabled).
  - `Input/Input.tsx` (підтримка лейблу, помилки, іконки, очищення).
  - `Card/Card.tsx` (поверхня з радіусом та тінню).
  - `Screen/Screen.tsx` (обгортка з SafeArea та KeyboardAvoidingView).
- [ ] Налаштувати модуль `i18next` у `src/shared/lib/i18n.ts`:
  - Створити словники `src/locales/uk.json` та `src/locales/en.json`.
- [ ] Зробити Pull Request до гілки `main`.

---

### 🟡 ТИЖДЕНЬ 2: Авторизація, Моделі даних та CRUD Колод

> **Мета тижня:** Робоча авторизація, навігація (Tabs + Stack), повноцінне створення і перегляд колод та карток.

#### 🛠 Павло:

- [ ] Створити SQL-міграцію в Supabase: таблиці `decks`, `cards`, `card_reviews`, `focus_sessions` з RLS.
- [ ] Налаштувати `src/shared/lib/supabase.ts` з `expo-secure-store` для збереження сесії.
- [ ] Налаштувати TanStack Query клієнт у `src/shared/lib/queryClient.ts`.
- [ ] Реалізувати сервіс та хуки авторизації у `src/features/auth/`:
  - `auth.api.ts` (signUp, signIn, signOut, getCurrentUser).
  - `useAuth.ts` (інтеграція з `useSessionStore` у Zustand).
- [ ] Налаштувати кореневу навігацію `src/app/_layout.tsx` (перевірка сесії: якщо не залогінений -> `(auth)`, якщо залогінений -> `(tabs)`).

#### 🛠 Олександр:

- [ ] Гілка `feature/auth-screens`:
  - Екран `Onboarding`: 3 слайди з ілюстраціями, описом можливостей та кнопкою «Почати».
  - Екрани `(auth)/sign-in.tsx` та `(auth)/sign-up.tsx`: форми на `react-hook-form` + `zod`, відображення помилок через UI-компоненти Івана.
- [ ] Гілка `feature/decks-crud`:
  - Створити Zod-схему для колоди: назва, опис, вибір кольору, вибір іконки.
  - Сервіс `features/decks/services/decks.api.ts` (fetchDecks, createDeck, updateDeck, deleteDeck).
  - Хук `useDecks.ts` на базі `useQuery` та `useMutation` з TanStack Query.
  - Екран `DecksList` на базі `@shopify/flash-list`: відображення карток колод, свайп вліво для видалення з діалогом підтвердження.
  - Екрани `DeckForm` (створення/редагування) та `DeckDetails`.

#### 🛠 Іван:

- [ ] Гілка `feature/profile-and-settings`:
  - Створити Zustand-стор налаштувань `src/store/settingsStore.ts` (тема, мова, денна ціль карток).
  - Екран `(tabs)/profile.tsx`: інформація про користувача (аватар, email, ім'я, кнопка виходу).
  - Екран `(tabs)/settings.tsx`: перемикання теми (Світла / Темна / Системна) в один клік, перемикач мови (Українська / English), налаштування денної цілі (напр., 20 карток).
- [ ] Додати до UI-кіту відсутні допоміжні компоненти:
  - `EmptyState` (іконка, заголовок, опис, кнопка дії).
  - `ErrorState` (повідомлення про помилку + кнопка «Спробувати знову»).
  - `Skeleton` (анімований плейсхолдер завантаження карток).

---

### 🟠 ТИЖДЕНЬ 3: Серце застосунку — SM-2, Анімації та Pomodoro

> **Мета тижня:** Інтервальне повторення SM-2 з 3D-анімацією, робочий фокус-таймер, головний екран.

#### 🛠 Павло:

- [ ] Створити чистий модуль алгоритму `src/features/study/lib/sm2.ts`:
  - Функція `calculateSM2({ rating, repetitionNumber, easinessFactor, intervalDays })`.
  - Покрити модуль Unit-тестами `sm2.test.ts` (всі 4 оцінки: again, hard, good, easy; перевірка граничного EF >= 1.3).
- [ ] Реалізувати екран сесії навчання `StudySession`:
  - 3D-анімація перевороту картки на 180° по осі Y за допомогою `react-native-reanimated` та `react-native-worklets`.
  - 4 кнопки оцінки відповіді («Не згадав», «Важко», «Добре», «Легко»).
  - Розрахунок наступного дня повторення та збереження в `card_reviews`.
  - Екран підсумку сесії `SessionResult` (скільки карток пройдено, відсоток успіху, кнопка виходу).
- [ ] Налаштувати офлайн-роботу карток: кешування запитів TanStack Query через `AsyncStorage` / `MMKV`.

#### 🛠 Олександр:

- [ ] Гілка `feature/cards-crud`:
  - Описати схему `card.schema.ts` (слово/термін, переклад/визначення, контекст/приклад).
  - Сервіс `cards.api.ts` та хук `useCards.ts`.
  - Компоненти `CardsList` та `CardForm` (додавання і редагування картки всередині колоди).
- [ ] **Бонусна задача:** Модуль імпорту карток `features/decks/utils/csvImport.ts`:
  - Можливість вставити текст у форматі `слово;переклад;приклад` або завантажити CSV-файл і створити пачку карток в один тап.

#### 🛠 Іван:

- [ ] Гілка `feature/focus-timer`:
  - Створити Zustand-стор `useTimerStore.ts` (режими: Фокус 25 хв, Коротка перерва 5 хв, Довга перерва 15 хв; стани: idle, running, paused).
  - Реалізувати захист від згортання: фіксація `targetEndTimestamp`, щоб таймер не збивався у фоні.
  - Інтегрувати `expo-notifications`: локальне сповіщення з вібрацією та звуком по завершенню сесії.
  - Екран `(tabs)/focus.tsx`: круговий індикатор прогресу, кнопки Старт / Пауза / Скидання.
  - Збереження завершених хвилин фокусу в таблицю `focus_sessions`.
- [ ] Гілка `feature/home-screen`:
  - Екран `(tabs)/home.tsx`:
    - Карточка «На повторення сьогодні» з лічильником та кнопкою «Почати вчити».
    - Віджет стріку (серії днів поспіль) з іконкою вогника 🔥.
    - Прогрес-бар денної цілі (напр., 12/20 карток).
    - Швидкий запуск Pomodoro таймера.

---

### 🔴 ТИЖДЕНЬ 4: Бонуси (на 115 балів), Тести, Полірування та Здача

> **Мета тижня:** Бонусні фічі, графіки, перевірка лінтерами, збірка EAS, підготовка виступу.

#### 🛠 Павло:

- [ ] Налаштувати GitHub Actions Workflow (`.github/workflows/ci.yml`):
  - Автоматичний запуск `pnpm lint`, `pnpm tsc --noEmit` та `pnpm test` на кожен Pull Request.
- [ ] Провести повний аудит коду:
  - Перевірити відсутність типів `any`.
  - Перевірити повну відсутність інлайн-стилів `style={{ ... }}` та прямих HEX-кольорів (за це вчитель знімає бали!).
  - Перевірити `accessibilityLabel` та розмір клікабельних зон (мінімум 44×44).
- [ ] Створити прев'ю-збірку через EAS: `eas build -p android --profile preview`.
- [ ] Оформити головний `README.md` (скриншоти, архітектура, стек, інструкція запуску, посилання на білд).

#### 🛠 Олександр:

- [ ] Перевірити роботу всіх форм на реальному Android / iOS (підйом клавіатури `KeyboardAvoidingView`, safe areas).
- [ ] Написати компонентний тест для `DeckForm` на базі React Native Testing Library (RNTL).
- [ ] Перевірити валідацію та обробку помилок бекенду (відображення тостів або `ErrorState` при відсутності зв'язку).
- [ ] Підготувати свою частину розповіді на демо (авторизація, робота з колодами та картками, імпорт CSV).

#### 🛠 Іван:

- [ ] **Бонус 1 — Словник (`WordLookup`):**
  - Екран пошуку слова через відкритий API: `https://api.dictionaryapi.dev/api/v2/entries/en/{word}`.
  - Відображення транскрипції, аудіо вимови, визначень та прикладів.
  - Кнопка «Додати в мою колоду» з випадаючим списком існуючих колод.
- [ ] **Бонус 2 — Статистика (`Stats`):**
  - Екран `(tabs)/stats.tsx` з графіками за 7 та 30 днів (бібліотека `react-native-gifted-charts`):
    - Стовпчиковий графік кількості повторених карток по днях.
    - Кількість хвилин у фокус-таймері за тиждень.
    - Відсоток точності відповідей.
- [ ] Підготувати свою частину розповіді на демо (таймер Pomodoro, графіки статистики, словник, тема/мова).

---

## 📋 3. Суворі правила коду та Git (За чим стежить викладач)

1. **Команди встановлення та запуску:**
   - Усі бібліотеки додаємо виключно через `pnpm add <package>` або `npx expo install <package>` для нативних модулів.
   - Жодного `npm` чи `yarn` у терміналі, щоб не поламати `pnpm-lock.yaml`.
2. **Ніяких «сирих» стилів:**
   - ❌ ЗАБОРОНЕНО: `<View style={{ padding: 16, backgroundColor: '#ffffff' }} />` (мінус 5 балів за кожен випадок!).
   - ПРАВИЛЬНО: через `makeStyles`:
   ```typescript
   export const useStyles = makeStyles(({ colors, spacing, radius }) => ({
     container: {
       padding: spacing.base,
       backgroundColor: colors.surface,
       borderRadius: radius.md,
     },
   }));
   ```
3. **Ніякого захардкодscopeженого тексту:**
   - ❌ ЗАБОРОНЕНО: `<Text>Увійти</Text>`
   - ПРАВИЛЬНО: `<Text>{t('auth.signIn')}</Text>`
4. **Формат комітів (Conventional Commits):**
   - `feat(auth): add sign in form with zod validation`
   - `feat(timer): create pomodoro countdown store`
   - `feat(decks): add swipe to delete gesture`
   - `fix(ui): adjust button padding for small screens`
5. **Робота з Git:**
   - Ніхто не пушить напряму в `main`!
   - Створюємо гілку: `git checkout -b feature/назва-фічі`.
   - Робимо коміти, пушимо: `git push origin feature/назва-фічі`.
   - Створюємо Pull Request на GitHub, інший напарник або тимлід тисне «Approve», після чого зливаємо в `main`.

---

## 🎯 Чеклист готовності до здачі (115/100 балів)

- [ ] Всі [MVP]-модулі працюють без вильотів на Android та iOS.
- [ ] Дизайн-система реалізована через токени NovaFlow, працюють обидві теми (Light / Dark).
- [ ] Алгоритм SM-2 написаний чисто та має 100% покриття Jest-тестами.
- [ ] Фокус-таймер працює у фоні та надсилає системні сповіщення.
- [ ] Реалізовано офлайн-режим (сесія працює без інтернету).
- [ ] Бонус: Словник з публічного Free Dictionary API.
- [ ] Бонус: Інтерактивні графіки повторень на екрані статистики.
- [ ] Бонус: Імпорт карток з CSV / тексту.
- [ ] Зелений CI у GitHub Actions на кожному PR.
- [ ] Професійний README зі скриншотами та посиланням на збірку.
