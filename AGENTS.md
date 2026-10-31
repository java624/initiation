This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md

# ВИМОГИ ДО ПРОЄКТУ ВІД ВИКЛАДАЧА ОБОВЯЗКОВО

ТЗ: фінальний проєкт React Native — «Кроки»
2 жовт. 2026 р. · @Someone

1. Ідея застосунку
   «Кроки» — мобільний застосунок для самонавчання: картки з інтервальним повторенням, фокус-таймер і трекер навчальних цілей зі статистикою прогресу. Користувач створює колоди (наприклад, «Англійські слова B2» чи «Хуки React»), вчить їх щодня, а застосунок сам планує, що і коли повторити.
   Чому саме такий проєкт:
   • Корисний одразу — студенти можуть вчити ним англійську чи підготовку до співбесід уже під час розробки.
   • Охоплює все, що є в реальних продакшн-застосунках: авторизація, синхронізація з бекендом, офлайн-режим, анімації, жести, push-сповіщення, графіки, темна тема, локалізація.
   • Має справжню бізнес-логіку (алгоритм SM-2), яку треба покрити тестами — а не лише верстку.
   • Готовий проєкт не соромно показати в портфоліо й на співбесіді.
   Формат: індивідуально або в парі, 4 тижні, здача — репозиторій на GitHub + збірка (Expo Go / EAS preview) + демо 7–10 хв.
2. Функціональні вимоги
   Обов'язкові модулі позначені [MVP], решта — для вищої оцінки.
   Модуль
   Екрани
   Що має вміти
   Рівень
   Онбординг і авторизація
   Onboarding (3 слайди), SignIn, SignUp, ForgotPassword
   Реєстрація email/пароль, валідація форм, збереження сесії, автологін, вихід
   [MVP]
   Головна (Сьогодні)
   Home
   Скільки карток на повторення сьогодні, серія днів (streak), швидкий старт сесії, прогрес денної цілі
   [MVP]
   Колоди
   DecksList, DeckDetails, DeckForm
   CRUD колод: назва, опис, колір, іконка; пошук і сортування; свайп для видалення з підтвердженням
   [MVP]
   Картки
   CardForm, CardsList
   CRUD карток (лицьова/зворотна сторона, приклад), імпорт карток з CSV або вставкою тексту
   [MVP] / імпорт — бонус
   Сесія навчання
   StudySession, SessionResult
   Перевертання картки анімацією, оцінка «Не згадав / Важко / Добре / Легко», розрахунок наступного повторення за SM-2, підсумок сесії
   [MVP]
   Фокус-таймер
   Focus
   Pomodoro 25/5 з налаштуванням, коректна робота у фоні, локальне сповіщення по завершенню
   [MVP]
   Статистика
   Stats
   Графік повторень за 7/30 днів, точність відповідей, кількість хвилин фокусу, найкраща серія
   Бонус
   Словник
   WordLookup
   Пошук слова через публічне API (напр. Free Dictionary API) і додавання в колоду в один тап
   Бонус
   Профіль і налаштування
   Profile, Settings
   Денна ціль, час нагадування, тема (світла/темна/системна), мова (uk/en), вихід, видалення акаунта
   [MVP]
   Нефункціональні вимоги:
   • Офлайн-режим: навчання працює без інтернету, зміни синхронізуються при появі мережі.
   • Кожен екран має стани loading / empty / error / success — без «білих екранів».
   • Підтримка iOS та Android, коректні safe area, клавіатура не перекриває поля вводу.
   • Доступність: accessibilityLabel на інтерактивних елементах, мінімальна зона тапу 44×44.
   • Холодний старт до 2 с на середньому Android, списки — плавні 60 fps.
3. Технічний стек
   Використовуємо актуальну стабільну версію Expo SDK на момент старту проєкту; версії бібліотек фіксуються в package.json.
   Задача
   Обов'язково
   Навіщо студенту
   Мова
   TypeScript, strict: true
   Типізація як стандарт індустрії
   Платформа
   Expo (managed) + EAS Build
   Реальна збірка і роздача застосунку
   Навігація
   Expo Router (file-based): stack + tabs + modal
   Сучасний підхід до роутингу, deep links
   Клієнтський стан
   Zustand (сесія, налаштування, таймер)
   Легкий глобальний стан без бойлерплейту
   Серверний стан
   TanStack Query
   Кешування, рефетч, оптимістичні оновлення
   Бекенд
   Supabase (Auth + Postgres)
   Реальна авторизація та БД без власного сервера
   Локальне сховище
   MMKV або expo-sqlite
   Офлайн-режим і швидкий доступ
   Форми
   react-hook-form + zod
   Валідація на схемах, типи з однієї точки
   Анімації та жести
   react-native-reanimated + react-native-gesture-handler
   Переворот картки, свайпи
   Списки
   FlashList
   Продуктивність великих списків
   Сповіщення
   expo-notifications
   Нагадування і завершення таймера
   Локалізація
   i18next + react-i18next
   Мультимовність, жодних рядків у JSX
   Графіки
   victory-native або react-native-gifted-charts
   Екран статистики
   Якість
   ESLint, Prettier, Husky + lint-staged, Jest + React Native Testing Library
   Командні стандарти
   Заборонено: any без коментаря-пояснення, Redux без обґрунтування, UI-кіти, що підміняють власну дизайн-систему (NativeBase, UI Kitten тощо).
4. Архітектура та структура папок
   Архітектура — feature-based з чіткими шарами: екран лише збирає компоненти, логіка живе в хуках, робота з даними — в сервісах, чисті функції — в утилітах.
   src/
   ├── app/ # Expo Router: лише роути, без логіки
   │ ├── (auth)/sign-in.tsx
   │ ├── (tabs)/home.tsx
   │ ├── (tabs)/decks/[id].tsx
   │ └── _layout.tsx
   ├── features/ # бізнес-фічі, ізольовані одна від одної
   │ ├── auth/
   │ ├── decks/
   │ │ ├── components/ # DeckCard/, DeckForm/
   │ │ ├── hooks/ # useDecks.ts, useDeckForm.ts
   │ │ ├── services/ # decks.api.ts
   │ │ ├── schemas/ # deck.schema.ts (zod)
   │ │ ├── types.ts
   │ │ └── index.ts # публічний API фічі
   │ ├── study/
   │ │ └── lib/sm2.ts # алгоритм повторень + sm2.test.ts
   │ ├── focus/
   │ └── stats/
   ├── shared/ # перевикористовуване всіма фічами
   │ ├── ui/ # Button/, Text/, Input/, Card/, Screen/
   │ ├── hooks/ # useDebounce, useAppState, useNetworkStatus
   │ ├── utils/ # date.ts, format.ts, validation.ts, platform.ts
   │ ├── lib/ # supabase.ts, queryClient.ts, storage.ts, i18n.ts
   │ ├── constants/ # routes.ts, config.ts, queryKeys.ts, storageKeys.ts
   │ └── types/
   ├── theme/ # дизайн-токени (див. розділ 5)
   ├── store/ # Zustand-стори: session, settings, timer
   └── locales/ # uk.json, en.json
   Структура компонента — кожен у власній папці:
   DeckCard/
   ├── DeckCard.tsx # лише JSX і пропси
   ├── DeckCard.styles.ts # StyleSheet на токенах
   ├── DeckCard.types.ts # інтерфейс пропсів
   ├── useDeckCard.ts # локальна логіка, якщо є
   └── index.ts
   Правила шарів:
5. app/ імпортує з features/ і shared/; жодних запитів, обчислень і стилів прямо в роутах.
6. Фічі не імпортують одна одну напряму — лише через index.ts (публічний API) або через shared/.
7. shared/ не знає про фічі.
8. Компонент не викликає Supabase чи fetch — лише хук, який використовує сервіс.
9. Утиліти — чисті функції без React і побічних ефектів, кожна покрита тестом.
10. Магічні рядки та числа заборонені: ключі запитів, роутів, сховища, таймінги — в constants/.
11. Абсолютні імпорти через аліаси @/features, @/shared, @/theme (tsconfig paths).
12. Файл компонента — до ~150 рядків; більше — розбити.
    Потік даних: Компонент → хук фічі (useDecks) → TanStack Query → сервіс (decks.api.ts) → Supabase / локальне сховище. Глобальний UI-стан (тема, сесія, таймер) — лише через Zustand-стори з селекторами.
13. Дизайн-токени та стилізація
    Усі візуальні значення живуть лише в src/theme/; у компонентах заборонені інлайн-стилі та «сирі» кольори, відступи й розміри шрифтів.
    theme/
    ├── tokens/
    │ ├── palette.ts # базова палітра: blue500, gray100… (лише тут hex)
    │ ├── colors.ts # семантичні: background, surface, textPrimary, accent, danger — для light і dark
    │ ├── spacing.ts # шкала 4pt: xs=4, sm=8, md=12, lg=16, xl=24, xxl=32
    │ ├── radius.ts # sm=6, md=12, lg=20, full=999
    │ ├── typography.ts # fontFamily, fontSize, lineHeight, варіанти: h1, h2, body, caption
    │ ├── shadows.ts # elevation для iOS/Android
    │ └── motion.ts # тривалості та easing анімацій
    ├── ThemeProvider.tsx # світла/темна/системна тема
    ├── useTheme.ts
    ├── makeStyles.ts # хелпер: (theme) => StyleSheet.create(...)
    └── index.ts
    Два рівні токенів: palette (що є) → semantic colors (для чого). Компоненти використовують лише семантичні токени, тому темна тема вмикається без змін у компонентах.
    Правильно:
    // DeckCard.styles.ts
    export const useStyles = makeStyles(({ colors, spacing, radius }) => ({
    container: {
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    },
    }));
    Заборонено:
    <View style={{ padding: 16, backgroundColor: '#fff' }} />
    Вимоги:
    • Типографіка — лише через компонент <Text variant="h2" /> зі shared/ui.
    • Мінімальний набір UI-компонентів у shared/ui: Button (primary/secondary/ghost, loading, disabled), Text, Input, Card, Screen, EmptyState, ErrorState, Skeleton.
    • Контраст тексту — не нижче WCAG AA в обох темах.
    • Перед кодом — макет основних екранів у Figma (можна простий), токени в макеті збігаються з кодом.
14. Код-стайл і правила
    Код має виглядати так, ніби його писала одна людина: правила закріплені в ESLint і Prettier, а не лише в домовленостях.
    Іменування:
    Що
    Формат
    Приклад
    Компоненти, типи, інтерфейси
    PascalCase
    DeckCard, DeckCardProps
    Хуки
    camelCase з use
    useStudySession
    Утиліти, змінні, функції
    camelCase, дієслово для функцій
    formatDuration, calculateNextReview
    Константи
    UPPER_SNAKE_CASE
    DEFAULT_DAILY_GOAL
    Файли сервісів і схем
    <entity>.<role>.ts
    decks.api.ts, deck.schema.ts
    Обробники подій
    handle* у компоненті, on* у пропсах
    handlePress / onPress
    Правила коду:
    • Лише функціональні компоненти і export const (без default export, крім роутів Expo Router).
    • Пропси описані через interface, деструктуризуються в сигнатурі.
    • Жодних рядків для користувача в JSX — лише t('decks.empty.title').
    • useMemo / useCallback / React.memo — там, де є вимірювана причина (списки, важкі обчислення), а не всюди.
    • Обробка помилок централізована: сервіси кидають типізовані помилки, UI показує їх через ErrorState або toast.
    • Секрети — лише в .env (EXPO_PUBLIC_*), .env.example у репозиторії, сам .env — у .gitignore.
    • Жодних console.log у main-гілці (правило ESLint no-console).
    • Порядок імпортів — автоматично через eslint-plugin-import (зовнішні → @/ аліаси → відносні).
    Git:
    • Гілки feature/…, fix/…; зміни — через pull request, навіть якщо працюєш сам.
    • Коміти за Conventional Commits: feat(decks): add swipe to delete.
    • Pre-commit хук запускає lint, prettier і typecheck — коміт з помилками не проходить.
15. Тести, CI та якість
    Мінімум — 70% покриття для utils/ і features/*/lib, плюс тести ключових компонентів; CI має бути зеленим на кожному PR.
    • Unit-тести (Jest): алгоритм SM-2 (усі 4 оцінки, граничні випадки), утиліти дат і форматування, zod-схеми.
    • Компонентні тести (RNTL): Button, DeckForm (валідація), StudyCard (переворот і оцінка), стани EmptyState / ErrorState.
    • Моки: Supabase і мережа мокаються, тести не ходять в інтернет.
    • GitHub Actions: на кожен PR — lint, typecheck (tsc --noEmit), test.
    • README: опис, скриншоти/GIF, як запустити, структура проєкту, змінні оточення, посилання на збірку.
    • Бонус: E2E-сценарій у Maestro (реєстрація → створити колоду → пройти сесію).
16. Етапи та здача
    Проєкт триває 4 тижні; наприкінці кожного тижня — короткий чек-ін з ментором і merge в main.
17. Тиждень 1 — фундамент. Ініціалізація Expo + TypeScript, ESLint/Prettier/Husky, аліаси, структура папок, дизайн-токени, ThemeProvider, базові компоненти shared/ui, i18n, макет у Figma.
18. Тиждень 2 — авторизація і дані. Supabase (таблиці decks, cards, reviews, RLS-політики), авторизація, навігація (auth / tabs), CRUD колод і карток, TanStack Query.
19. Тиждень 3 — ядро. Сесія навчання з SM-2 і анімацією, фокус-таймер, сповіщення, головна зі streak, офлайн-режим і синхронізація.
20. Тиждень 4 — полірування. Налаштування, темна тема, статистика, тести та CI, оптимізація списків, README, EAS-збірка, підготовка демо.
    Що здати:
    [ ] Публічний репозиторій GitHub з історією PR
    [ ] README зі скриншотами та інструкцією запуску
    [ ] Посилання на збірку (EAS preview / Expo Go)
    [ ] Відео-демо до 3 хв або живий показ 7–10 хв
    [ ] Відповіді на питання по коду: чому така архітектура, як працює SM-2, як влаштовані токени
21. Критерії оцінювання
    Максимум — 100 балів + 15 бонусних; прохідний поріг — 60 балів за умови, що всі [MVP]-модулі працюють.
    Критерій
    Що перевіряємо
    Бали

Архітектура
Шари і правила з розділу 4, винесені хуки, сервіси, утиліти, константи; фічі ізольовані
20

Функціонал MVP
Усі [MVP]-модулі працюють на iOS і Android, без крашів
20

Дизайн-система
Токени, теми, жодного інлайну чи «сирих» значень, shared/ui
15

Якість коду
TypeScript без any, код-стайл, ESLint без помилок, читабельність
15

Робота з даними
TanStack Query, офлайн, обробка loading/empty/error
10

Тести і CI
Покриття, зелений CI
10

UX і анімації
Плавність, жести, доступність, клавіатура, safe area
5

Git і README
PR, Conventional Commits, документація
5

Бонус
Статистика з графіками, словник через API, імпорт CSV, E2E на Maestro, публікація в TestFlight / Google Play Internal
до 15

Автоматичне зниження оцінки: інлайн-стилі або hex-кольори в компонентах (−5 за кожен випадок, до −15), запити до API прямо з компонента (−5), закомічені секрети (−10), копіювання чужого проєкту — 0 балів.



   npx expo start -c --android