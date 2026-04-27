# Архитектурные решения — claude_blockcrafterstv_website

## 2026-02-19 — mcsrvstat.us для статуса сервера
**Решение:** публичный API mcsrvstat.us
**Причина:** нет своего бэкенда, API бесплатный
**Последствия:** зависимость от стороннего сервиса, возможные задержки

## 2026-02-19 — 4 отдельных CSS файла для тем
**Решение:** каждая тема — отдельный CSS файл, смена через JS
**Причина:** изоляция стилей, легко добавлять новые темы
**Последствия:** при смене темы перезагружается stylesheet

## 2026-02-19 — Статичный сайт без сборщика
**Решение:** чистый HTML/CSS/JS, без npm/webpack
**Причина:** простота деплоя, открывается с любого хостинга
**Последствия:** нет модульности, всё в глобальном скоупе

## 2026-04-26 — Добавление 5-й темы «☀️ Sunny Voxel» как default
**Решение:** добавить пятую CSS-only тему в эстетике дневного voxel-Minecraft (небо/трава/земля градиент в hero, пиксельные декорации солнца/облаков/дерева/крипера, paper-on-cloud карточки) и сделать дефолтом для новых посетителей. Возвращающиеся юзеры с saved variant1-4 в localStorage сохраняют свой выбор.
**Причина:** существующие 4 темы все тёмные (Cyberpunk/Dark Gaming/Minecraft Pro чёрный/Green Forest тёмный лес) — нет дневной светлой ниши. Brainstorming-сессия с visual-companion подтвердила выбор направления A2 (Voxel-аутентичный, тональность Cheerful/Daytime).
**Последствия:** variant5 — самая большая тема (1086 строк CSS, 5 inline SVG-декораций). Архитектурно identical с variant1/3/4 (CSS-overlay поверх style.css). Tема хорошо изолирована — variant1-4 продолжают работать без регрессии.

## 2026-04-26 — CSS-only overlay для variant5 (без правок HTML)
**Решение:** все декорации voxel-темы (солнце, облака, дерево, крипер, grass-strip) реализуются через `background-image` с inline SVG data-URI и псевдоэлементы `::before/::after` на существующих селекторах `.hero` и `.footer`. HTML структуру не меняем.
**Причина:** существующая theme-switcher архитектура завязана на одной HTML-разметке для всех тем. Добавлять DOM-элементы только для variant5 сломало бы паттерн.
**Последствия:** variant5 ограничен тем, что можно покрасить через CSS. Хорошо для consistency, но requires careful cascade-leak audit (variant5 явно сбрасывает анимации/тени/transparent-text-fill из base style.css).

## 2026-04-26 — JS-параллакс выключаем только для variant5
**Решение:** `script.js:323` устанавливает `hero.style.transform = translateY(...)` на скролле для всех тем. variant5 переопределяет через `transform: none !important` (CSS `!important` побеждает inline style без important). На variant1-4 параллакс продолжает работать как раньше.
**Причина:** variant5 hero — фиксированный градиент с пиксельной полосой травы на 28% высоты. Параллакс смещает гранадиент и ломает визуальный «земляной шов».
**Последствия:** consistency только в variant5. JS не знает о теме — `!important` достаточно.

## 2026-04-27 — Hybrid font scheme через CSS-vars
**Решение:** заменить single-font Pixelify Sans 400/500/700 на 3 шрифта через CSS-переменные:
- `--font-display: 'Press Start 2P', 'Courier New', monospace` — 8-bit пиксель, ТОЛЬКО латиница/числа (BLOCKCRAFTERS, IP, цифры, .step-number)
- `--font-heading: 'Russo One', sans-serif` — chunky geometric, full Cyrillic (русские uppercase заголовки и кнопки)
- `--font-body: 'Rubik', sans-serif` — clean modern sans-serif, full Cyrillic (body, descriptions, navbar status)

**Причина:** пользователь сказал «криво отображается, плохо читается шрифт». Pixelify Sans на body-размерах (14-18px) с кириллицей рендерится плохо. Press Start 2P — настоящий 8-bit пиксель, идеален для латиницы/чисел, но НЕ имеет кириллицы. Russo One — единственный «блочный» шрифт на Google Fonts с полноценной кириллицей. Rubik — read-friendly с поддержкой русского.

**Последствия:** variant5 теперь использует 3 разных Google Fonts (плюс fallback `monospace` / `sans-serif`). Каждый компонент явно выбирает шрифт через `var(--font-*)`. При желании сменить шрифт-схему в будущем — менять только 3 строки `:root`. Размеры на Press Start 2P-целях были уменьшены implementer'ом, потому что 8-bit рендерится крупнее Pixelify Sans на тех же px (предотвращает overflow).

## 2026-04-27 — Out of scope для v1.1.x: рефакторинг style.css в theme-neutral базу
**Решение:** не переделывать style.css в нейтральный базовый стиль (сейчас он зеркалит variant2 Neon Cyberpunk). FOUC при первой загрузке (~50-200мс показывается Cyberpunk перед Voxel) принят как known limitation в v1.1.x.
**Причина:** инвазивный рефакторинг увеличил бы scope сессии в 2-3 раза, риск регресса variant1-4.
**Последствия:** для нового посетителя есть короткая вспышка Cyberpunk при первой загрузке. В будущем (v1.2.0.0) можно добавить inline `<script>` в `<head>` ДО `<link href="style.css">`, который читает localStorage и инжектит правильный variant CSS первым.
