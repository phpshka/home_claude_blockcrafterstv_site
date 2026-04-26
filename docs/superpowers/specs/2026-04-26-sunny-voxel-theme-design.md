# Спецификация: тема ☀️ Sunny Voxel

**Проект:** claude_blockcrafterstv_website
**Дата:** 2026-04-26
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
- Декоративные элементы (солнце, облака, дерево, крипер, grass strip) реализуются через `background-image` (inline SVG data-URI) и псевдоэлементы `::before/::after` на существующих селекторах `.hero` и `body`. В других темах их не видно — их CSS не подгружен.

## 4. Палитра (CSS-переменные)

| Переменная | Hex | Назначение |
|---|---|---|
| `--sky-deep` | `#6cb5e8` | верхняя полоса градиента неба |
| `--sky` | `#87ceeb` | основной цвет неба |
| `--sky-light` | `#b3e0f7` | низ неба перед травой |
| `--cloud` | `#ffffff` | облака |
| `--grass` | `#5cb02e` | трава, акцент-кнопки, статус-дот, прогресс-бар |
| `--grass-dark` | `#4a8f24` | trim травы, navbar background, hover |
| `--grass-shadow` | `#3a6f1c` | дно травы, shadow-mid |
| `--sun` | `#ffe066` | солнце, акцент-шрифт на тёмном |
| `--wood` | `#6b3e1a` | стволы, рамки карточек 3px, нижний бордер navbar |
| `--wood-dark` | `#5a341a` | дно дерева, borders dark |
| `--earth` | `#463017` | дно ground-strip |
| `--paper` | `#fffacd` | фон stats / hover-фон карточек / IP-блок |
| `--text-dark` | `#2d1810` | основной текст на светлом |
| `--shadow-grass` | `#2d5a17` | смещённая тень за зелёными элементами |
| `--shadow-wood` | `#1a3a0a` | смещённая тень за деревянными элементами |

**Дублирование под общую систему имён** (variant1–4 используют `--primary-color`, `--accent-color`, `--bg-card` и т.д.):

```css
--primary-color: var(--grass);
--accent-color: var(--sun);
--bg-black: var(--sky-deep);
--bg-card: var(--paper);
--text-primary: var(--text-dark);
--text-secondary: var(--wood);
--border-color: var(--wood);
```

## 5. Типографика

Подключается из Google Fonts (`@import` в начале CSS):

```css
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');
```

| Уровень | Шрифт | Применение |
|---|---|---|
| Display / headings / numbers / buttons | **Press Start 2P** | h1, h2, .feature-title, .stat-value, button labels, .step-number |
| Body / labels / descriptions | **VT323** | абзацы, navbar текст, .stat-label, .feature-text, footer |
| Fallback | `monospace, system-ui` | offline / font load fail |

**Размеры (clamp для responsive):**
- Hero title: `clamp(28px, 6vw, 48px)` Press Start 2P
- Section title: `clamp(18px, 3vw, 24px)` Press Start 2P
- Body: `16-18px` VT323
- Numbers: `22-28px` Press Start 2P
- Button: `11-14px` Press Start 2P uppercase

## 6. Стилевые принципы

1. **`border-radius: 0`** везде. Все углы прямые.
2. **Тени = смещённые блоки**, не blur. `box-shadow: 4px 4px 0 var(--shadow-*)`. Hover → `6px 6px 0`.
3. **`image-rendering: pixelated`** на всех декорациях и `body` (для image-rendering свойства лучше выставить на конкретные SVG-контейнеры).
4. **Анимации ступенчатые**: `transition-timing-function: steps(8, end)`. Никаких `cubic-bezier` в variant5.
5. **Бордеры**: `3px solid var(--wood)` для карточек, `4px solid var(--wood)` для крупных контейнеров.
6. **Текстуры**: `repeating-linear-gradient(45deg, transparent 0 12px, rgba(107,62,26,0.06) 12px 13px)` поверх stats-band — имитация бумаги в клетку.

## 7. Декорации в hero (псевдоэлементы)

`.hero` получает:

```css
.hero {
    background: linear-gradient(180deg,
        var(--sky-deep) 0%,
        var(--sky) 35%,
        var(--sky-light) 55%,
        var(--grass) 55%,
        var(--grass-dark) 72%,
        var(--wood) 72%,
        var(--wood-dark) 88%,
        var(--earth) 100%);
    transform: none !important; /* отключаем JS-parallax — он ломает фиксированный градиент */
}

.hero::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
        url("data:image/svg+xml;utf8,<sun-svg>"),
        url("data:image/svg+xml;utf8,<cloud-svg>"),
        url("data:image/svg+xml;utf8,<cloud-svg>"),
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
```

**SVG-исходники для data-URI** берутся ровно из утверждённого превью (`.superpowers/brainstorm/560149-1777235941/content/03-sunny-voxel-preview.html`):
- **sun**: 44×44 жёлтый квадрат `#ffe066` + box-shadow rays (либо инлайн SVG из 9 квадратов: центр + 4 креста + 4 диагонали);
- **cloud**: SVG 50×20 с 3 прямоугольниками `#fff` (см. превью);
- **tree**: SVG 30×40 — ствол `#5a341a` 4×18 + крона `#4a8f24` 24×20 + светлый top `#5cb02e` 16×8 + тёмные углы `#3a6f1c` 6×6;
- **creeper**: SVG 26×36 — голова, 2 глаза, рот, тело, 2 ноги (см. превью).

URL-encode после авторинга (`encodeURIComponent` или превратить `<>` в `%3C/%3E`, кавычки в `'`).

```css

.hero::after {
    /* pixel grass strip on top of dirt seam */
    content: "";
    position: absolute;
    bottom: 28%;
    left: 0; right: 0;
    height: 6px;
    background: repeating-linear-gradient(90deg, var(--grass) 0 8px, var(--grass-dark) 8px 16px);
    image-rendering: pixelated;
}

@media (max-width: 768px) {
    .hero::before { display: none; }
}
```

## 8. Компоненты (стилевая спека)

### Navbar
- `background: var(--grass-dark)`, нижняя граница `4px solid var(--wood)`, тень `0 4px 0 var(--shadow-wood)`.
- `.navbar-brand`: Press Start 2P 14px, цвет `--cloud`, text-shadow `2px 2px 0 var(--shadow-wood)`.
- `.theme-select`: фон `--paper`, border `3px solid var(--wood)`, box-shadow `3px 3px 0 var(--shadow-wood)`, VT323 14px.
- `.status-dot.online`: `12px × 12px квадрат` (не круг — `border-radius: 0 !important`), фон `--grass`, обводка 2px `--cloud`, glow `0 0 6px var(--grass)`.
- `.navbar-status`, `.navbar-players`: VT323 14px, цвет `--cloud`.

### Hero
- IP-блок (`.ip-display`): фон `--paper`, border `3px solid var(--wood)`, box-shadow `4px 4px 0 var(--shadow-wood)`, padding 10px 16px, VT323 18px.
- `.ip-label`: Press Start 2P 10px, цвет `--wood`.
- `.ip-copy-btn`: фон `--grass`, border `3px solid var(--shadow-grass)`, border-left: none (примыкает к IP-блоку), Press Start 2P 11px, цвет `--cloud`, text-shadow `2px 2px 0 var(--shadow-grass)`.
- `.scroll-indicator`: pixel-стрелка вниз, цвет `--cloud`.
- Заголовок (`.hero-title`): Press Start 2P, цвет `--cloud`, text-shadow `4px 4px 0 var(--shadow-grass)`.
- Подзаголовок (`.hero-subtitle`): VT323, цвет `--paper`, text-shadow `2px 2px 0 var(--shadow-grass)`.

### Stats section
- `background: var(--paper)`, top border `6px solid var(--wood)`, repeating-linear-gradient pattern 45° для текстуры.
- `.stat-card`: фон `--cloud`, border `3px solid var(--wood)`, box-shadow `5px 5px 0 var(--shadow-wood)`. На hover — shadow `7px 7px 0`, transform `translate(-2px, -2px)` ступенчатое.
- `.stat-icon`: SVG как сейчас + filter `drop-shadow(2px 2px 0 var(--shadow-grass))`.
- `.stat-label`: VT323 16px, цвет `--wood`, uppercase, letter-spacing 1px.
- `.stat-value` / `.count-number`: Press Start 2P 24px, цвет `--shadow-grass`.

### Features section
- Карточки `.feature-card`: тот же pattern (paper, 3px wood, 5px смещённая тень).
- `.feature-icon` SVG: `filter: drop-shadow(2px 2px 0 var(--shadow-grass))`, `image-rendering: pixelated` на родителе.
- `.feature-title`: Press Start 2P 14px, `--shadow-grass`.
- `.feature-text`: VT323 16px, `--text-dark`.

### Connect section (4 шага)
- `.connect-card`: paper фон, 4px wood border, 6px смещённая тень.
- `.step-number`: квадратный 48×48 блок `--grass`, 3px `--shadow-grass` border, Press Start 2P 18px white.
- `.step h3`: Press Start 2P 12px.
- `.step p`: VT323 16px.
- `.connect-btn`: фон `--sun`, border `3px solid var(--wood)`, box-shadow `5px 5px 0 var(--shadow-wood)`, Press Start 2P 13px, цвет `--text-dark`.

### Social cards
- Тот же фрейм. Hover — поднимается на 2px, тень 7px.
- Бренд-цвет — единственное цветное пятно (background brand-цвета внутри иконки), всё остальное — paper/wood.

### Footer
- `background: var(--wood)`, цвет `--paper`, верхняя граница `4px solid var(--shadow-wood)`.
- `.footer-brand h3`: Press Start 2P 14px цвет `--sun`.
- Текст: VT323 16px цвет `--paper`.
- Над футером — pixel-strip из `::before` (репитящаяся травяная полоса для эффекта «земля заканчивается»).

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
| `THEME_SWITCHER_GUIDE.md` | новый раздел про variant5 (палитра, особенности, шрифты) |
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
- Менять backend / CI / деплой.

## 12. Риски и митигации

| Риск | Митигация |
|---|---|
| JS `parallax` на `.hero` (transform translateY) ломает фиксированный градиент-блок земли | В CSS variant5: `.hero { transform: none !important; }` — для этой темы parallax выключен |
| Press Start 2P нечитаем при body-размерах | Используется ТОЛЬКО для headings / numbers / button labels. Body — VT323 |
| Существующие SVG-иконки features не выглядят пиксельно | `filter: drop-shadow(2px 2px 0 var(--shadow-grass))` + `image-rendering: pixelated` на parent. SVG не заменяем — DOM нельзя трогать |
| localStorage возвращающихся посетителей хранит variant2 | Сознательно НЕ форсируем сброс. Возвращающийся юзер видит свою тему. Новый — Sunny Voxel |
| Декорации перекрывают IP-блок на узком экране | Mobile breakpoint 768px → `.hero::before { display: none }` |
| Press Start 2P уже импортирован в variant3/variant4 | Дубликат `@import` безопасен — браузер кэширует. Альтернатива: вынести в `index.html` `<link>` (out of scope, слишком инвазивно) |

## 13. Версионирование

- `VERSION`: `1.0.0.0` → `1.1.0.0` (minor bump — новая фича без поломок).
- README заголовок «Что реализовано» → `(v1.1.0.0)`.
- Атомарный коммит: spec → имплементация → VERSION/README в одном PR / branch.

## 14. Приёмочные критерии

1. На свежей browser-сессии (без localStorage) при открытии `index.html` загружается тема Sunny Voxel.
2. В навбаре в селекте темы пятая опция «☀️ Sunny Voxel» имеет атрибут `selected`.
3. При переключении на variant1–4 и обратно Sunny Voxel перерисовывается без артефактов.
4. Все 7 областей (nav, hero, stats, features, connect, social, footer) отрисованы в voxel-стиле: квадратные углы, смещённые тени, Press Start 2P для headings, VT323 для body.
5. Hero отображает пиксельные декорации: солнце top-right, два облака, дерево bottom-left, крипер bottom-right, grass-strip над землёй.
6. Шрифты Press Start 2P + VT323 загружены и применены.
7. На мобильном (`≤ 768px`) `.hero::before` декорации скрыты, layout не ломается, IP-блок и заголовок остаются читаемыми.
8. `VERSION` = `1.1.0.0`, README обновлён, THEME_SWITCHER_GUIDE.md описывает новую тему.
9. localStorage: возвращающийся юзер с `selectedTheme=variant2` видит variant2.
10. Регрессия: variant1–4 продолжают работать корректно (визуально и функционально).
