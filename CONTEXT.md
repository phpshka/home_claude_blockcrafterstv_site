# claude_blockcrafterstv_website

## Описание: лендинг для Minecraft-сервера BlockCraftersTV
## Версия: 1.1.1.0
## Статус: 🟢 Готов
## Последнее обновление: 2026-04-27 | Home PC

## Стек
HTML5, CSS3, Vanilla JS ES6+, Google Fonts, mcsrvstat.us API

## Темы (5 штук, default = Sunny Voxel)
- `style.css` — базовый, mirrors variant2 Neon Cyberpunk
- `style-variant1-dark-gaming.css` — фиолет + оранжевый, премиум-игровой
- `style-variant2-neon-cyberpunk.css` — циан + магента неон, киберпанк
- `style-variant3-minecraft-pro.css` — золото + изумруд, тёмный MC
- `style-variant4-minecraft-green.css` — тёмно-зелёный лесной MC
- `style-variant5-sunny-voxel.css` ⭐ **default** — дневной voxel-MC, 1086 строк, paper bg, hybrid fonts (Press Start 2P + Russo One + Rubik), inline SVG-декорации (солнце, облака, дерево, крипер)

Тема выбирается селектом в навбаре, сохраняется в `localStorage('selectedTheme')`. Дефолт для новых посетителей — variant5.

## Карта ключевых файлов
- `index.html` — общая HTML-структура для всех тем (default option = variant5)
- `index-variant1-dark-gaming.html`, `index-variant2-neon-cyberpunk.html` — альтернативные стартовые страницы (синхронизированы по селекту тем)
- `script.js` — логика: статус через mcsrvstat.us, смена темы (`THEMES` map line 13-34), счётчик игроков (30с), JS-параллакс на `.hero` (отключён в variant5 через `transform: none !important`)
- `style-variant5-sunny-voxel.css` — главный артефакт сессии 2026-04-26/27. CSS-vars `--font-display/--font-heading/--font-body` управляют типографикой
- `docs/superpowers/specs/2026-04-26-sunny-voxel-theme-design.md` — финальный spec v2 темы
- `docs/superpowers/plans/2026-04-26-sunny-voxel-theme.md` — 18-task implementation plan
- `THEME_SWITCHER_GUIDE.md`, `VARIANTS.md`, `README.md` — описание всех 5 тем (актуальны)

## Архитектурные принципы variant5
- **CSS-only overlay** — JS добавляет `<link>` поверх style.css, никаких изменений HTML
- **Hybrid font scheme** — Press Start 2P для латиницы/чисел, Russo One для русских заголовков, Rubik для body. Привязка через `var(--font-*)`.
- **Cascade-leak audit** — variant5 явно сбрасывает свойства из base style.css, которые иначе бы протекали (animations, transparent text-fills, neon glows, hover transforms). 5 fixup-коммитов в истории.
- **Pseudo-element декорации** — `.hero::before` (5 SVG layers: солнце/2 облака/дерево/крипер) + `.hero::after` (grass-strip)
- **Stepped анимации** — hover-transitions используют `steps(2-3, end)` для воксельного «дёрганого» feel (но scroll-* entrance-классы из base style.css не трогаем — они остаются с cubic-bezier)
- **prefers-reduced-motion** — отключает hover-transforms на доступных компонентах

## Текущая задача
Нет активной. v1.1.1.0 запушена и работает.

## Следующий шаг
Ждём задачу. Возможные кандидаты для v1.1.0.1 (известные non-blocking issues, найденные финальным review):
- iOS Safari URL-bar fix: `@supports (-webkit-touch-callout: none) { .hero { min-height: -webkit-fill-available } }`
- `@media (hover: none)` для touch-устройств — отрубить phantom-tap hover
- README косметика — упоминает "Parallax эффект" (отключён в variant5 default), не списывает variant CSS файлы в дереве структуры

## ⚠️ Ограничения и известные проблемы
- IP сервера: 185.17.10.83, порт: 25899 — не менять без явной просьбы
- Тема сохраняется в localStorage (ключ `selectedTheme`) — не ломать ключ
- API mcsrvstat.us — внешний, может быть недоступен
- **FOUC при первой загрузке** (R6 в спеке): style.css (Cyberpunk) грузится синхронно в HTML head, JS добавляет variant5.css после DOMContentLoaded — ~50-200мс новый посетитель видит Cyberpunk перед Voxel. Принято для v1.1.x, фикс отложен на 1.2.0.0
- **Press Start 2P** не имеет кириллицы — поэтому в variant5 русский текст идёт в Russo One/Rubik, а Press Start 2P только на латинских/числовых элементах
- **WCAG AA**: cloud (#fff) на grass-dark (#4a8f24) ≈ 4.0:1 — граничный для normal-text. Полагаемся на text-shadow для дополнительной читаемости

## Открытые вопросы
- Нет
