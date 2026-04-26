# Спецификация: тема ☀️ Sunny Voxel (v2)

**Проект:** claude_blockcrafterstv_website
**Дата brainstorming:** 2026-04-26
**Версия спеки:** 2 (после self-review с фиксами F1–F12)
**Тип:** добавление пятой темы оформления + смена дефолта
**Версия после внедрения:** 1.1.0.0

---

## 1. Цель

Добавить на лендинг сервера BlockCraftersTV пятую тему оформления — **«☀️ Sunny Voxel»** — в эстетике дневного майнкрафт-мира (солнечное небо, трава, дерево, дружелюбный крипер). Сделать её темой по умолчанию для новых посетителей.

## 2. Контекст

Сейчас в проекте 4 темы: Dark Gaming Premium, Neon Cyberpunk (default), Minecraft Professional, Minecraft Green Forest. Все четыре — **тёмные**. Дневная светлая «voxel»-эстетика отсутствует. Решение принято в brainstorming-сессии 2026-04-26 (направление A · Voxel-аутентичный, тональность A2 · Дневной/Cheerful). Превью утверждено пользователем.

## 3. Архитектурные ограничения

- **HTML структуру `index.html` не меняем** — она общая для всех тем.
- Тема — **CSS-only overlay**. Подгружается JS поверх базового `style.css` точно так же, как variant1/3/4.
- Декоративные элементы (солнце, облака, дерево, крипер, grass strip) реализуются через `background-image` (inline SVG data-URI) и псевдоэлементы `::before/::after` на существующих селекторах `.hero` и `.footer`. В других темах их не видно — их CSS не подгружен.

## 4. Палитра (CSS-переменные)

| Переменная | Hex | Назначение |
|---|---|---|
| `--sky-deep` | `#6cb5e8` | верхняя полоса градиента неба |
| `--sky` | `#87ceeb` | основной цвет неба |
| `--sky-light` | `#b3e0f7` | низ неба перед травой |
| `--cloud` | `#ffffff` | облака, светлый текст |
| `--grass` | `#5cb02e` | трава, акцент-кнопки, статус-дот, прогресс-бар |
| `--grass-dark` | `#4a8f24` | trim травы, navbar background, hover |
| `--grass-shadow` | `#3a6f1c` | дно травы, тёмная сторона креплера |
| `--sun` | `#ffe066` | солнце, акцент-кнопки CTA |
| `--wood` | `#6b3e1a` | стволы, рамки карточек 3px, нижний бордер navbar |
| `--wood-dark` | `#5a341a` | дно дерева, borders dark |
| `--earth` | `#463017` | дно ground-strip |
| `--paper` | `#fffacd` | фон stats / hover-фон карточек / IP-блок / body |
| `--text-dark` | `#2d1810` | основной текст на светлом |
| `--shadow-grass` | `#2d5a17` | смещённая тень за зелёными элементами |
| `--shadow-wood` | `#1a3a0a` | смещённая тень за деревянными элементами |

**Дублирование под общую систему имён** (variant1–4 используют `--primary-color`, `--accent-color`, `--bg-card`):

```css
--primary-color: var(--grass);
--accent-color: var(--sun);
--bg-black: var(--paper);       /* фон body — paper, не чёрный */
--bg-card: var(--cloud);
--text-primary: var(--text-dark);
--text-secondary: var(--wood);
--border-color: var(--wood);
```

## 5. Типографика

**[FIX F1]** Press Start 2P не поддерживает кириллицу. VT323 на Google Fonts тоже не имеет Cyrillic-subset (только Latin/Vietnamese). Используем **одно семейство Pixelify Sans** (поддержка Latin + Cyrillic + Latin Extended) с двумя весами для иерархии:

```css
@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;500;700&display=swap');
```

| Уровень | Шрифт | Применение |
|---|---|---|
| Display / headings / numbers / buttons | **Pixelify Sans 700** | h1, h2, .feature-title, .stat-value, .step-number, button labels, .navbar-brand |
| Body / labels / descriptions | **Pixelify Sans 400** | абзацы, navbar status text, .stat-label, .feature-text, footer, .hero-subtitle |
| Tabular (опционально для IP/латинских данных) | **Pixelify Sans 500** | `.ip-text`, `.count-max`, технические метки |
| Fallback | `'Courier New', monospace` | offline / font-load fail |

**Размеры (clamp для responsive):**
- Hero title (`.hero-title`): `clamp(28px, 6vw, 48px)` Pixelify Sans 700
- Hero subtitle (`.hero-subtitle`): `clamp(16px, 2.5vw, 22px)` Pixelify Sans 400
- Section title (`.section-title`): `clamp(20px, 3vw, 28px)` Pixelify Sans 700
- Body / description: `16-18px` Pixelify Sans 400
- Numbers (`.stat-value`, `.count-number`): `clamp(22px, 3vw, 32px)` Pixelify Sans 700
- Button label (`.connect-btn`, `.ip-copy-btn`): `13-15px` Pixelify Sans 700, uppercase, letter-spacing 1px
- Navbar brand: `15-17px` Pixelify Sans 700
- Navbar status: `14-15px` Pixelify Sans 400

## 6. Стилевые принципы

1. **`border-radius: 0`** везде. Все углы прямые (включая `.status-dot` — переопределить с `border-radius: 0 !important`).
2. **Тени = смещённые блоки**, не blur. `box-shadow: 4px 4px 0 var(--shadow-*)`. Hover → `6px 6px 0` (или 7px для крупных карточек).
3. **`image-rendering: pixelated`** на конкретных SVG-контейнерах (`.hero::before`, `.feature-icon`, `.stat-icon`) — не глобально на `body`, чтобы не искажать рендер шрифтов.
4. **[FIX F3] Анимации:** stepped-таминг применяется **только к собственным hover-transitions новых компонентов variant5** (например `transition: transform 0.15s steps(3, end)`). **Существующие entrance-классы** (`.scroll-fade-in`, `.scroll-assemble`, `.scroll-build-up`, `.scroll-fragment`, `.scroll-glide-in`, `.scroll-slide-left`, `.scroll-slide-right`, `.scroll-scale-up` — все из `style.css:60–170`) **сохраняем как есть** с их cubic-bezier таймингом. Они срабатывают один раз на entrance — переписывать их на steps() сделает появление секций «дёрганым» вместо плавного. Воксельная характерность держится на ФОРМАХ (квадраты, ступенчатые тени) и ШРИФТАХ, не на тайминге.
5. **Бордеры**: `3px solid var(--wood)` для карточек, `4px solid var(--wood)` для крупных контейнеров (connect-card), `6px solid var(--wood)` для секционных разделителей (top-border stats-section).
6. **Текстуры**: `repeating-linear-gradient(45deg, transparent 0 12px, rgba(107,62,26,0.06) 12px 13px)` поверх stats-band — имитация бумаги в клетку.
7. **[FIX F12] `prefers-reduced-motion`**: добавить блок отключающий hover-transforms для пользователей с этой настройкой.
8. **[FIX F5] Псевдоэлементы**: для каждого `::before/::after` родитель должен быть `position: relative`, и контент-обёртка (`.hero-content`, `.footer-content`) — `position: relative; z-index: 1`, чтобы декорации не перекрывали текст.

## 7. Декорации в hero (псевдоэлементы)

```css
.hero {
    position: relative; /* [FIX F5] обязательно для absolute-pseudo */
    background: linear-gradient(180deg,
        var(--sky-deep) 0%,
        var(--sky) 35%,
        var(--sky-light) 55%,
        var(--grass) 55%,
        var(--grass-dark) 72%,
        var(--wood) 72%,
        var(--wood-dark) 88%,
        var(--earth) 100%);
    transform: none !important; /* отключаем JS-parallax script.js:319 */
}

.hero-content {
    position: relative;
    z-index: 1; /* [FIX F5] заголовок и IP-блок над декорациями */
}

.hero::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    background-image:
        url("data:image/svg+xml;utf8,<sun-svg>"),
        url("data:image/svg+xml;utf8,<cloud-svg>"),
        url("data:image/svg+xml;utf8,<cloud-svg-2>"),
        url("data:image/svg+xml;utf8,<tree-svg>"),
        url("data:image/svg+xml;utf8,<creeper-svg>");
    background-position:
        top 30px right 70px,    /* sun */
        top 60px left 100px,    /* cloud 1 */
        top 40px center,        /* cloud 2 */
        bottom 90px left 50px,  /* tree */
        bottom 88px right 60px; /* creeper */
    background-repeat: no-repeat;
    image-rendering: pixelated;
    pointer-events: none;
}

.hero::after {
    /* pixel grass strip on top of dirt seam */
    content: "";
    position: absolute;
    bottom: 28%;
    left: 0; right: 0;
    height: 6px;
    z-index: 0;
    background: repeating-linear-gradient(90deg,
        var(--grass) 0 8px,
        var(--grass-dark) 8px 16px);
    image-rendering: pixelated;
}

@media (max-width: 768px) {
    .hero::before { display: none; }
}
```

### 7.1 SVG-исходники (inline в спеке) — **[FIX F2]**

Раньше эти источники были только в `.superpowers/brainstorm/...` (gitignored). Теперь зафиксированы здесь:

**sun.svg** (44×44, центр + 8 пиксельных лучей):
```xml
<svg width="44" height="44" viewBox="0 0 44 44" xmlns='http://www.w3.org/2000/svg'>
  <rect x="14" y="14" width="16" height="16" fill="#ffe066"/>
  <rect x="20" y="2"  width="4" height="6" fill="#ffe066"/>
  <rect x="20" y="36" width="4" height="6" fill="#ffe066"/>
  <rect x="2"  y="20" width="6" height="4" fill="#ffe066"/>
  <rect x="36" y="20" width="6" height="4" fill="#ffe066"/>
  <rect x="6"  y="6"  width="4" height="4" fill="#ffe066"/>
  <rect x="34" y="6"  width="4" height="4" fill="#ffe066"/>
  <rect x="6"  y="34" width="4" height="4" fill="#ffe066"/>
  <rect x="34" y="34" width="4" height="4" fill="#ffe066"/>
</svg>
```

**cloud.svg** (50×20, 3 прямоугольника):
```xml
<svg width="50" height="20" viewBox="0 0 50 20" xmlns='http://www.w3.org/2000/svg'>
  <rect x="10" y="5"  width="30" height="10" fill="#ffffff"/>
  <rect x="5"  y="10" width="40" height="5"  fill="#ffffff"/>
  <rect x="15" y="0"  width="20" height="5"  fill="#ffffff"/>
</svg>
```

**cloud-2.svg** (60×24, чуть больше + полупрозрачный, для центра):
```xml
<svg width="60" height="24" viewBox="0 0 50 20" xmlns='http://www.w3.org/2000/svg' opacity="0.85">
  <rect x="10" y="5"  width="30" height="10" fill="#ffffff"/>
  <rect x="5"  y="10" width="40" height="5"  fill="#ffffff"/>
  <rect x="15" y="0"  width="20" height="5"  fill="#ffffff"/>
</svg>
```

**tree.svg** (30×40, ствол + крона):
```xml
<svg width="30" height="40" viewBox="0 0 30 40" xmlns='http://www.w3.org/2000/svg'>
  <rect x="13" y="22" width="4"  height="18" fill="#5a341a"/>
  <rect x="14" y="22" width="2"  height="18" fill="#3d2410"/>
  <rect x="3"  y="6"  width="24" height="20" fill="#4a8f24"/>
  <rect x="7"  y="2"  width="16" height="8"  fill="#5cb02e"/>
  <rect x="0"  y="12" width="6"  height="6"  fill="#3a6f1c"/>
  <rect x="24" y="14" width="6"  height="6"  fill="#3a6f1c"/>
</svg>
```

**creeper.svg** (26×36):
```xml
<svg width="26" height="36" viewBox="0 0 26 36" xmlns='http://www.w3.org/2000/svg'>
  <rect x="3"  y="0"  width="20" height="14" fill="#5cb02e"/>
  <rect x="3"  y="0"  width="20" height="2"  fill="#3a6f1c"/>
  <rect x="6"  y="3"  width="4"  height="4"  fill="#000000"/>
  <rect x="16" y="3"  width="4"  height="4"  fill="#000000"/>
  <rect x="10" y="9"  width="6"  height="4"  fill="#000000"/>
  <rect x="10" y="13" width="2"  height="3"  fill="#000000"/>
  <rect x="14" y="13" width="2"  height="3"  fill="#000000"/>
  <rect x="3"  y="14" width="20" height="14" fill="#4a8f24"/>
  <rect x="3"  y="28" width="8"  height="8"  fill="#3a6f1c"/>
  <rect x="15" y="28" width="8"  height="8"  fill="#3a6f1c"/>
</svg>
```

**Кодировка для CSS:** при подстановке в `url("data:image/svg+xml;utf8,...")` — заменить `<` на `%3C`, `>` на `%3E`, `#` на `%23`, оставить одинарные кавычки `'`. Проще — функция `encodeURIComponent()` при разработке, результат вкомпилировать в финальный CSS.

## 8. Компоненты (стилевая спека)

### Navbar
- `background: var(--grass-dark)`, нижняя граница `4px solid var(--wood)`, тень `0 4px 0 var(--shadow-wood)`.
- `.navbar-brand`: Pixelify Sans 700 16px, цвет `--cloud`, text-shadow `2px 2px 0 var(--shadow-wood)`.
- `.theme-select`: фон `--paper`, border `3px solid var(--wood)`, box-shadow `3px 3px 0 var(--shadow-wood)`, Pixelify Sans 400 14px, color `--text-dark`.
- `.status-dot.online`: `12px × 12px квадрат`, `border-radius: 0 !important`, фон `--grass`, обводка 2px `--cloud`, glow `0 0 6px var(--grass)`.
- `.status-dot.offline`: тот же квадрат, цвет `#cc3a3a`.
- `.navbar-status`, `.navbar-players`: Pixelify Sans 400 14px, цвет `--cloud`.

### Hero
- **[FIX F5]** `.hero { position: relative }`, `.hero-content { position: relative; z-index: 1 }`.
- IP-блок (`.ip-display`): фон `--paper`, border `3px solid var(--wood)`, box-shadow `4px 4px 0 var(--shadow-wood)`, padding 10px 16px, Pixelify Sans 500 18px, color `--text-dark`.
- `.ip-label`: Pixelify Sans 700 11px, uppercase, цвет `--wood`.
- `.ip-copy-btn`: фон `--grass`, border `3px solid var(--shadow-grass)`, border-left: none (примыкает к IP-блоку), Pixelify Sans 700 13px uppercase, color `--cloud`, text-shadow `2px 2px 0 var(--shadow-grass)`. Hover: shadow `5px 5px 0 var(--shadow-grass)`, `transform: translate(-1px, -1px)` с `transition: 0.12s steps(2, end)`.
- `.scroll-indicator`: SVG-стрелка 30×30 с `filter: drop-shadow(2px 2px 0 var(--shadow-grass))`, цвет `--cloud`, `image-rendering: pixelated`.
- `.hero-title`: Pixelify Sans 700 clamp(28px, 6vw, 48px), цвет `--cloud`, text-shadow `4px 4px 0 var(--shadow-grass)`, line-height 1.4.
- `.hero-subtitle`: Pixelify Sans 400 clamp(16px, 2.5vw, 22px), цвет `--paper`, text-shadow `2px 2px 0 var(--shadow-grass)`.
- Layout `.hero-content`: title → ip-container → scroll-indicator (vertical stack, normal flow). На размер hero не давим — как в style.css.

### Stats section
- `background: var(--paper)`, top border `6px solid var(--wood)`, repeating-linear-gradient 45° для текстуры.
- `.stat-card`: фон `--cloud`, border `3px solid var(--wood)`, box-shadow `5px 5px 0 var(--shadow-wood)`. Hover — shadow `7px 7px 0`, transform `translate(-2px, -2px)` с `transition: 0.15s steps(3, end)`.
- `.stat-icon`: SVG как сейчас + filter `drop-shadow(2px 2px 0 var(--shadow-grass))`, parent с `image-rendering: pixelated`.
- `.stat-label`: Pixelify Sans 400 16px, цвет `--wood`, uppercase, letter-spacing 1px.
- `.stat-value` / `.count-number`: Pixelify Sans 700 clamp(22px, 3vw, 32px), цвет `--shadow-grass`.

### Features section
- Карточки `.feature-card`: paper фон, 3px wood border, 5px смещённая тень. Hover — тень 7px, transform translate(-2px, -2px).
- `.feature-icon` SVG: `filter: drop-shadow(2px 2px 0 var(--shadow-grass))`, `image-rendering: pixelated` на parent.
- `.feature-title`: Pixelify Sans 700 16px, color `--shadow-grass`.
- `.feature-text`: Pixelify Sans 400 16px, color `--text-dark`, line-height 1.5.

### Connect section (4 шага)
- `.connect-card`: paper фон, 4px wood border, 6px смещённая тень.
- `.step-number`: квадратный 48×48 блок `--grass`, 3px `--shadow-grass` border, Pixelify Sans 700 18px color `--cloud`.
- `.step h3`: Pixelify Sans 700 14px, color `--shadow-grass`.
- `.step p`: Pixelify Sans 400 16px, color `--text-dark`.
- Соединительные линии между шагами (если есть): `border: 3px dashed var(--wood)`.
- `.connect-btn`: фон `--sun`, border `3px solid var(--wood)`, box-shadow `5px 5px 0 var(--shadow-wood)`, Pixelify Sans 700 14px uppercase, color `--text-dark`. Hover — shadow `7px 7px 0`, translate.

### Social cards
- Тот же фрейм (paper + 3px wood + 5px shadow). Hover — поднимается на 2px, тень 7px.
- `.social-icon` фон — бренд-цвет (YouTube #ff0000, TikTok #000, Telegram #229ED9), но рамка остаётся `--wood`. Само пятно цвета — единственное яркое место.
- `.social-title`: Pixelify Sans 700 14px.
- `.social-text`: Pixelify Sans 400 15px.

### Footer
- **[FIX F5]** `.footer { position: relative }`, `.footer-content { position: relative; z-index: 1 }`.
- `background: var(--wood)`, color `--paper`, верхняя граница `4px solid var(--shadow-wood)`.
- `.footer-brand h3`: Pixelify Sans 700 16px color `--sun`.
- Текст: Pixelify Sans 400 16px color `--paper`.
- `.footer::before` (pixel-strip): `position: absolute; top: -10px; left: 0; right: 0; height: 6px; background: repeating-linear-gradient(90deg, var(--grass) 0 8px, var(--grass-dark) 8px 16px); image-rendering: pixelated;` — эффект «земля заканчивается».
- `.footer-links a`: Pixelify Sans 400 16px, цвет `--paper`, hover → `--sun`, underline 2px.

### Body (общий) — **[FIX F6]**
```css
body {
    background: var(--paper);
    background-image: repeating-linear-gradient(45deg,
        transparent 0 16px,
        rgba(107, 62, 26, 0.04) 16px 17px);
    color: var(--text-dark);
    font-family: 'Pixelify Sans', 'Courier New', monospace;
}
```
Без этого между `.hero` и `.stats-section` (или после footer) виднеется чёрный фон style.css.

## 9. Файлы и изменения

### Создаются

| Путь | Размер | Описание |
|---|---|---|
| `style-variant5-sunny-voxel.css` | ~1100–1300 строк | основной стиль темы (по образцу variant3/variant4) |

### Редактируются

| Файл | Изменение |
|---|---|
| `index.html` | в `#themeSelect` добавить `<option value="variant5" selected>☀️ Sunny Voxel</option>`, убрать `selected` с variant2 |
| `script.js` | в объект `THEMES` добавить `variant5: { name: 'Sunny Voxel', css: 'style-variant5-sunny-voxel.css' }`; в `initThemeSwitcher()` дефолт `localStorage.getItem('selectedTheme') \|\| 'variant5'` |
| `index-variant1-dark-gaming.html`, `index-variant2-neon-cyberpunk.html` | **обязательно** синхронизировать `<option>` в `#themeSelect` (добавить ☀️ Sunny Voxel) — без этого юзер на этих страницах не сможет переключиться на новую тему |
| `VERSION` | `1.0.0.0` → `1.1.0.0` |
| `README.md` | в раздел тем добавить ☀️ Sunny Voxel, отметить как default; bump версии в заголовке |
| `THEME_SWITCHER_GUIDE.md` | новый раздел про variant5; **[FIX F7] заодно** дописать пропущенный variant4 (документация уже устарела на 1 тему) |
| `VARIANTS.md` | описание новой темы |

## 10. Контракты

**JS — `THEMES` map:**
```javascript
variant5: {
    name: 'Sunny Voxel',
    css: 'style-variant5-sunny-voxel.css'
}
```

**Дефолт:**
```javascript
const savedTheme = localStorage.getItem('selectedTheme') || 'variant5';
```

**HTML — селект тем:**
```html
<select id="themeSelect" class="theme-select">
    <option value="variant1">🟣 Dark Gaming Premium</option>
    <option value="variant2">🔵 Neon Cyberpunk</option>
    <option value="variant3">🟡 Minecraft Professional</option>
    <option value="variant4">🟢 Minecraft Green Forest</option>
    <option value="variant5" selected>☀️ Sunny Voxel</option>
</select>
```

## 11. Out of scope

- Перерабатывать структуру HTML (никаких новых секций / DOM-узлов).
- Удалять или менять существующие темы variant1–4.
- Менять серверный API статуса (`mcsrvstat.us`), JS-логику обновлений.
- Анимировать pixel-art (двигающиеся облака, моргающий крипер) — статичные SVG.
- Создавать отдельный `index-variant5.html` — используем общий `index.html`.
- Менять favicon, OG-теги, sitemap.
- Создавать кастомные `.woff` шрифты — берём с Google Fonts.
- Переписывать существующие `.scroll-*` entrance-анимации на steps() — оставляем cubic-bezier (см. 6.4).
- Полная переделка `style.css` под theme-neutral базу (см. F4 в risks — отложено в 1.2.0.0).
- Менять backend / CI / деплой.

## 12. Риски и митигации

| # | Риск | Митигация |
|---|---|---|
| R1 | JS `parallax` на `.hero` (script.js:319 `hero.style.transform = translateY(...)`) ломает фиксированный градиент-блок земли | В CSS variant5: `.hero { transform: none !important; }`. Inline-стиль JS уступает `!important` в author-stylesheet — проверено по cascade rules |
| R2 | **[FIX F1]** Press Start 2P / VT323 не поддерживают кириллицу — русские заголовки/числа отвалились бы в системный fallback | Используем **Pixelify Sans** (Latin + Cyrillic + Latin Extended на Google Fonts) с весами 400/500/700 |
| R3 | Существующие SVG-иконки features не выглядят пиксельно | `filter: drop-shadow(2px 2px 0 var(--shadow-grass))` + `image-rendering: pixelated` на parent. SVG не заменяем — DOM нельзя трогать |
| R4 | localStorage возвращающихся посетителей хранит variant2 | Сознательно НЕ форсируем сброс. Возвращающийся юзер видит свою тему. Новый — Sunny Voxel |
| R5 | Декорации перекрывают IP-блок на узком экране | Mobile breakpoint 768px → `.hero::before { display: none }` |
| R6 | **[FIX F4] FOUC при первой загрузке:** `<link href="style.css">` (variant2 Cyberpunk) рендерится синхронно, JS подгружает variant5 после DOMContentLoaded → 50–200мс новый посетитель видит Cyberpunk-фон | Принимаем как известное ограничение для v1.1.0.0. В 1.2.0.0 — рефакторинг: вынести inline `<script>` в `<head>` ДО `<link href="style.css">`, читающий localStorage и инжектящий правильный variant CSS первым. Альтернатива (хак): `<body style="opacity:0">` пока loadTheme не завершится. Не делаем сейчас, чтобы не раздувать scope |
| R7 | **[FIX F11] WCAG-контраст:** `--cloud` (#fff) на `--grass-dark` (#4a8f24) ≈ 4.5:1 — граничный AA. Hero title (white text-shadow grass) на `--sky-light` участке градиента — низкий контраст, опирается на text-shadow | Для дневной voxel-темы (декоративной по своей природе) приемлемо. Текст-тени поддерживают читабельность. Если в будущем потребуется AAA — добавить тёмный outline на title, или повысить `--grass-dark` до `#3d7a1c` |
| R8 | **[FIX F2]** SVG-исходники находились только в `.superpowers/brainstorm/` (gitignored) | В v2 спеки SVG вшиты inline в раздел 7.1 — спека самодостаточна |
| R9 | **[FIX F3]** Заявление «никаких cubic-bezier» сломало бы 8 scroll-* entrance-классов | В 6.4 уточнено: stepped только для собственных hover-transitions; scroll-* классы не трогаем |
| R10 | **[FIX F5]** Псевдоэлементы `::before/::after` могут перекрывать контент при `position: absolute` | В разделе 8 прописаны `position: relative` на `.hero`/`.footer`, `z-index: 1` на `.hero-content`/`.footer-content`, `z-index: 0` на pseudo |
| R11 | **[FIX F12] `prefers-reduced-motion`** — пользователи с этой настройкой не должны видеть hover-анимации | Добавить в variant5.css блок: `@media (prefers-reduced-motion: reduce) { .stat-card, .feature-card, .social-card, .ip-copy-btn, .connect-btn { transition: none !important; transform: none !important; } }` |

## 13. Версионирование

- `VERSION`: `1.0.0.0` → `1.1.0.0` (minor bump — новая фича без поломок).
- README заголовок «Что реализовано» → `(v1.1.0.0)`.
- Атомарный коммит/PR: spec → имплементация → VERSION/README.

## 14. Приёмочные критерии

1. На свежей browser-сессии (без localStorage) при открытии `index.html` загружается тема Sunny Voxel.
2. В навбаре в селекте темы пятая опция «☀️ Sunny Voxel» имеет атрибут `selected`.
3. **[FIX F10]** При переключении на variant1–4 и обратно Sunny Voxel перерисовывается без видимого FOUC > 100мс между темами; предыдущий `<link id="theme-stylesheet">` удаляется до добавления нового; localStorage обновляется.
4. Все 7 областей (nav, hero, stats, features, connect, social, footer) отрисованы в voxel-стиле: квадратные углы, смещённые тени, Pixelify Sans 700 для headings, Pixelify Sans 400 для body. Кириллический текст рендерится в pixel-шрифте (а не в системном monospace fallback).
5. Hero отображает пиксельные декорации: солнце top-right, два облака (top-left + top-center), дерево bottom-left, крипер bottom-right, grass-strip над землёй. Заголовок и IP-блок на верхнем z-index, не перекрыты декорациями.
6. Шрифт Pixelify Sans (400/500/700) загружен и применён ко всем заголовкам, числам, кнопкам, body. Кириллица отображается в pixel-стиле.
7. На мобильном (`≤ 768px`) `.hero::before` декорации скрыты, layout не ломается, IP-блок и заголовок остаются читаемыми.
8. `VERSION` = `1.1.0.0`, README обновлён, THEME_SWITCHER_GUIDE.md описывает variant4 (закрытый дефект документации) и variant5.
9. localStorage: возвращающийся юзер с `selectedTheme=variant2` видит variant2 (без форс-сброса).
10. Регрессия: variant1–4 продолжают работать корректно (визуально и функционально). JS-parallax работает на variant1–4 (там transform-override отсутствует) и не работает на variant5 (CSS-override).
11. На системной настройке `prefers-reduced-motion: reduce` hover-transforms карточек отключены.
12. Body не показывает чёрный фон style.css между секциями (фон `--paper`).
