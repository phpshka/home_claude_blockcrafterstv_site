# Sunny Voxel Theme — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a fifth theme «☀️ Sunny Voxel» (daytime Minecraft voxel aesthetic) to the BlockCraftersTV landing site and make it the default for new visitors.

**Architecture:** CSS-only overlay theme. New file `style-variant5-sunny-voxel.css` is appended via JS theme-switcher on top of base `style.css`. HTML markup unchanged. Pixel decorations (sun/cloud/tree/creeper/grass-strip) implemented as background-images and pseudo-elements on existing selectors.

**Tech Stack:** HTML5, CSS3 (custom properties, multi-layer backgrounds, `image-rendering: pixelated`), Vanilla JS ES6, Google Fonts (Pixelify Sans 400/500/700, Cyrillic-supporting).

**Spec:** [docs/superpowers/specs/2026-04-26-sunny-voxel-theme-design.md](../specs/2026-04-26-sunny-voxel-theme-design.md) (v2)

**Test approach:** Static site, no test runner. Each visual task verified by reloading dev-server at `http://localhost:3005` (already running). Cross-theme regression at the end.

---

## Pre-flight

- Dev-сервер крутится на `localhost:3005` (фоновый bash процесс `bfq4pn6qa`). Если не запущен:
  ```bash
  cd /home/suppo/projects/github/home/home_claude_blockcrafterstv_site
  python3 -m http.server 3005 --bind 0.0.0.0 &
  ```
- Все коммиты — атомарные, на `main` ветке. После каждой задачи: `git add` целевые файлы → `git commit` → push (push автоматический per CLAUDE.md).
- Перед каждой задачей: открыть `http://localhost:3005`, очистить localStorage в DevTools → Application → Storage, чтобы не залипал старый выбор.

---

## Task 1: Регистрация variant5 (пустая CSS + JS + HTML option)

**Files:**
- Create: `style-variant5-sunny-voxel.css`
- Modify: `script.js:13-29` (THEMES объект)
- Modify: `index.html:18-23` (themeSelect options)

- [ ] **Step 1: Создать пустой CSS-файл с заголовком**

```bash
cat > /home/suppo/projects/github/home/home_claude_blockcrafterstv_site/style-variant5-sunny-voxel.css <<'EOF'
/* Modern Minecraft Server Website - Variant 5: Sunny Voxel
 * Daytime voxel aesthetic — bright sky, grass, friendly creeper.
 * See spec: docs/superpowers/specs/2026-04-26-sunny-voxel-theme-design.md
 */
EOF
```

- [ ] **Step 2: Зарегистрировать variant5 в `script.js`**

В `script.js:13-29`, в объекте `THEMES`, добавить пятую запись после variant4:

```javascript
const THEMES = {
    variant1: {
        name: 'Dark Gaming Premium',
        css: 'style-variant1-dark-gaming.css'
    },
    variant2: {
        name: 'Neon Cyberpunk',
        css: 'style-variant2-neon-cyberpunk.css'
    },
    variant3: {
        name: 'Minecraft Professional',
        css: 'style-variant3-minecraft-pro.css'
    },
    variant4: {
        name: 'Minecraft Green Forest',
        css: 'style-variant4-minecraft-green.css'
    },
    variant5: {
        name: 'Sunny Voxel',
        css: 'style-variant5-sunny-voxel.css'
    }
};
```

- [ ] **Step 3: Добавить опцию в `index.html`**

В `index.html:18-23`, в `<select id="themeSelect">`, добавить пятый `<option>` после variant4 (атрибут `selected` НЕ добавлять — это будет в Task 14):

```html
<select id="themeSelect" class="theme-select">
    <option value="variant1">🟣 Dark Gaming Premium</option>
    <option value="variant2" selected>🔵 Neon Cyberpunk</option>
    <option value="variant3">🟡 Minecraft Professional</option>
    <option value="variant4">🟢 Minecraft Green Forest</option>
    <option value="variant5">☀️ Sunny Voxel</option>
</select>
```

- [ ] **Step 4: Проверка**

Открыть `http://localhost:3005` (Ctrl+Shift+R hard refresh). В навбаре селект темы — выпадает 5 опций. Выбрать «☀️ Sunny Voxel». В DevTools Network увидеть запрос на `style-variant5-sunny-voxel.css` со статусом 200 (но видимых изменений на странице ещё нет — файл пустой). В Console нет ошибок.

- [ ] **Step 5: Коммит**

```bash
cd /home/suppo/projects/github/home/home_claude_blockcrafterstv_site
git add style-variant5-sunny-voxel.css script.js index.html
git commit -m "feat(theme): register variant5 Sunny Voxel skeleton

Adds empty CSS file + JS THEMES entry + HTML option.
Theme is selectable but visually identical to variant2 (no rules yet).
Default remains variant2.

Step 1/18 of Sunny Voxel implementation plan."
```

---

## Task 2: Скелет CSS — variables + body + base typography

**Files:**
- Modify: `style-variant5-sunny-voxel.css` (append)

- [ ] **Step 1: Добавить imports + :root variables + base body/reset**

Заменить содержимое `style-variant5-sunny-voxel.css` на:

```css
/* Modern Minecraft Server Website - Variant 5: Sunny Voxel
 * Daytime voxel aesthetic — bright sky, grass, friendly creeper.
 * See spec: docs/superpowers/specs/2026-04-26-sunny-voxel-theme-design.md
 */

/* Import Fonts — Pixelify Sans (Latin + Cyrillic) */
@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;500;700&display=swap');

/* CSS Variables - Sunny Voxel Daytime */
:root {
    /* Sky */
    --sky-deep:    #6cb5e8;
    --sky:         #87ceeb;
    --sky-light:   #b3e0f7;
    --cloud:       #ffffff;
    /* Grass */
    --grass:       #5cb02e;
    --grass-dark:  #4a8f24;
    --grass-shadow:#3a6f1c;
    /* Sun & wood */
    --sun:         #ffe066;
    --wood:        #6b3e1a;
    --wood-dark:   #5a341a;
    --earth:       #463017;
    /* Surfaces */
    --paper:       #fffacd;
    --text-dark:   #2d1810;
    /* Offset shadows */
    --shadow-grass:#2d5a17;
    --shadow-wood: #1a3a0a;

    /* Re-bind to existing variant naming convention */
    --primary-color:   var(--grass);
    --primary-dark:    var(--grass-dark);
    --primary-light:   var(--grass);
    --accent-color:    var(--sun);
    --accent-dark:     var(--wood);
    --secondary-color: var(--wood);
    --bg-black:        var(--paper);
    --bg-dark:         var(--paper);
    --bg-darker:       var(--cloud);
    --bg-card:         var(--cloud);
    --bg-card-hover:   var(--paper);
    --text-primary:    var(--text-dark);
    --text-secondary:  var(--wood);
    --text-muted:      #888;
    --border-color:    var(--wood);
}

/* Body — paper background, Pixelify Sans, prevent dark style.css bg from showing through */
body {
    font-family: 'Pixelify Sans', 'Courier New', monospace;
    background: var(--paper);
    background-image: repeating-linear-gradient(45deg,
        transparent 0 16px,
        rgba(107, 62, 26, 0.04) 16px 17px);
    color: var(--text-dark);
    line-height: 1.5;
}

/* All corners are square — voxel aesthetic */
* {
    border-radius: 0 !important;
}

/* Headings — bold pixel weight */
h1, h2, h3, .section-title, .feature-title, .stat-value, .step-number, .navbar-brand {
    font-family: 'Pixelify Sans', 'Courier New', monospace;
    font-weight: 700;
    letter-spacing: 1px;
}

/* Section title — used by Features/Connect/Social headings */
.section-title {
    font-size: clamp(20px, 3vw, 28px);
    color: var(--shadow-grass);
    text-shadow: 3px 3px 0 var(--cloud);
}
```

- [ ] **Step 2: Проверка**

Hard-refresh `http://localhost:3005` с выбранной variant5. Видно: фон страницы стал светло-кремовым (`--paper`), шрифт сменился на Pixelify Sans (буквы пиксельные). Заголовки секций («Особенности сервера», «Как подключиться?») — крупные, тёмно-зелёные с белой тенью. Остальное наследует из style.css (синие тона) — это нормально, исправим в следующих задачах.

- [ ] **Step 3: Коммит**

```bash
git add style-variant5-sunny-voxel.css
git commit -m "feat(variant5): add :root palette + body + base typography

15 CSS-vars (sky/grass/wood/sun/paper), bound to existing
variant naming. Body bg paper. Pixelify Sans 400/500/700 import.
border-radius:0 globally for voxel aesthetic.

Step 2/18."
```

---

## Task 3: Navbar styling

**Files:**
- Modify: `style-variant5-sunny-voxel.css` (append)

- [ ] **Step 1: Дописать стили навбара**

Добавить в конец `style-variant5-sunny-voxel.css`:

```css
/* === Navbar === */
.navbar {
    background: var(--grass-dark);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border-bottom: 4px solid var(--wood);
    box-shadow: 0 4px 0 var(--shadow-wood);
    padding: 1rem 1.5rem;
}

.navbar-brand {
    font-family: 'Pixelify Sans', monospace;
    font-weight: 700;
    font-size: clamp(15px, 2vw, 17px);
    color: var(--cloud);
    text-shadow: 2px 2px 0 var(--shadow-wood);
    letter-spacing: 1px;
}

.navbar-info {
    display: flex;
    gap: 1.25rem;
    align-items: center;
}

.navbar-status,
.navbar-players {
    font-family: 'Pixelify Sans', monospace;
    font-weight: 400;
    font-size: 14px;
    color: var(--cloud);
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.navbar-players svg {
    stroke: var(--cloud);
    filter: drop-shadow(1px 1px 0 var(--shadow-wood));
}

/* Status dot — square, not circle */
.status-dot {
    display: inline-block;
    width: 12px;
    height: 12px;
    background: var(--grass);
    border: 2px solid var(--cloud);
    border-radius: 0 !important;
    box-shadow: 0 0 6px var(--grass);
}

.status-dot.online { background: var(--grass); }
.status-dot.offline { background: #cc3a3a; box-shadow: 0 0 6px #cc3a3a; }

.status-text.online { color: var(--cloud); }
.status-text.offline { color: #ffb3b3; }
```

- [ ] **Step 2: Проверка**

Refresh. Навбар стал тёмно-зелёным, с деревянной нижней границей и смещённой тенью. Логотип «BlockCraftersTV» — белый Pixelify Sans 700 с тенью. Статус-дот — белый квадрат вокруг зелёного. Текст «Онлайн N/100» — белый Pixelify Sans 400. Theme switcher справа пока выглядит криво (наследует from style.css) — следующая задача.

- [ ] **Step 3: Коммит**

```bash
git add style-variant5-sunny-voxel.css
git commit -m "feat(variant5): style navbar with grass-dark bg + wood border

Navbar background grass-dark, 4px wood bottom border, offset shadow.
Square status-dot (not circle) with cloud outline.
All navbar text Pixelify Sans (cloud color on grass-dark = AA).

Step 3/18."
```

---

## Task 4: Theme switcher dropdown

**Files:**
- Modify: `style-variant5-sunny-voxel.css` (append)

- [ ] **Step 1: Добавить стили селекта**

```css
/* === Theme Switcher === */
.theme-switcher {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.theme-label {
    font-family: 'Pixelify Sans', monospace;
    font-weight: 400;
    font-size: 14px;
    color: var(--cloud);
    letter-spacing: 1px;
    text-transform: uppercase;
}

.theme-select {
    font-family: 'Pixelify Sans', monospace;
    font-weight: 400;
    font-size: 14px;
    color: var(--text-dark);
    background: var(--paper);
    border: 3px solid var(--wood);
    border-radius: 0 !important;
    padding: 0.4rem 0.75rem;
    box-shadow: 3px 3px 0 var(--shadow-wood);
    cursor: pointer;
    transition: transform 0.12s steps(2, end), box-shadow 0.12s steps(2, end);
    outline: none;
}

.theme-select:hover {
    box-shadow: 5px 5px 0 var(--shadow-wood);
    transform: translate(-1px, -1px);
}

.theme-select:focus {
    border-color: var(--shadow-grass);
    box-shadow: 5px 5px 0 var(--shadow-grass);
}

.theme-select option {
    background: var(--paper);
    color: var(--text-dark);
    font-weight: 400;
}
```

- [ ] **Step 2: Проверка**

Refresh. Селект — кремовый фон, толстая коричневая рамка, смещённая тень. Текст темы внутри — Pixelify Sans 400 тёмно-коричневый. На hover тень увеличивается, элемент сдвигается на 1px. Открытый dropdown options — кремовый.

- [ ] **Step 3: Коммит**

```bash
git add style-variant5-sunny-voxel.css
git commit -m "feat(variant5): style theme-select dropdown — paper bg + wood frame

3px wood border, offset shadow, Pixelify Sans 400.
Hover: transform translate + larger shadow (stepped 0.12s steps(2)).
Step 4/18."
```

---

## Task 5: Hero — gradient background + content positioning

**Files:**
- Modify: `style-variant5-sunny-voxel.css` (append)

- [ ] **Step 1: Hero base + parallax disable**

```css
/* === Hero — sky → grass → dirt vertical gradient === */
.hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8rem 2rem 4rem;
    background: linear-gradient(180deg,
        var(--sky-deep)  0%,
        var(--sky)       35%,
        var(--sky-light) 55%,
        var(--grass)     55%,
        var(--grass-dark) 72%,
        var(--wood)      72%,
        var(--wood-dark) 88%,
        var(--earth)     100%);
    /* Disable JS-parallax (script.js:319) — it shifts the hero and breaks fixed gradient */
    transform: none !important;
    overflow: hidden;
}

/* Override style.css' hero pseudo-elements (radial gradient overlays) — we paint our own */
.hero::before,
.hero::after {
    background: none;
    animation: none;
    /* will be redefined in next task */
}

/* Content — must stack above future ::before decorations */
.hero-content {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 2rem;
    max-width: 900px;
}

.hero-logo {
    margin-bottom: 1.5rem;
}

.hero-title {
    font-family: 'Pixelify Sans', monospace;
    font-weight: 700;
    font-size: clamp(28px, 6vw, 48px);
    color: var(--cloud);
    text-shadow: 4px 4px 0 var(--shadow-grass);
    letter-spacing: 2px;
    line-height: 1.4;
    margin-bottom: 0.75rem;
}

.hero-subtitle {
    font-family: 'Pixelify Sans', monospace;
    font-weight: 400;
    font-size: clamp(16px, 2.5vw, 22px);
    color: var(--paper);
    text-shadow: 2px 2px 0 var(--shadow-grass);
    letter-spacing: 0.5px;
}
```

- [ ] **Step 2: Проверка**

Refresh. Hero показывает вертикальный градиент: голубое небо сверху → резкая граница → ярко-зелёная трава → тёмная коричневая земля внизу. Заголовок «BlockCraftersTV» — крупный Pixelify Sans 700 белый с тёмно-зелёной тенью. Подзаголовок «Погрузись в мир приключений» — Pixelify Sans 400 кремовый.

При скролле hero **не двигается** (parallax disabled). Если двигается — проверить, что `transform: none !important` не пропал.

- [ ] **Step 3: Коммит**

```bash
git add style-variant5-sunny-voxel.css
git commit -m "feat(variant5): hero gradient sky→grass→dirt + title/subtitle

Linear-gradient 180deg, 8 stops, hard transitions for voxel land seam.
JS-parallax disabled via transform:none !important.
Hero-content z-index:1 (above future decorations).
Title Pixelify Sans 700 cloud, subtitle Pixelify Sans 400 paper.

Step 5/18."
```

---

## Task 6: Hero decorations — SVG ::before + grass strip ::after

**Files:**
- Modify: `style-variant5-sunny-voxel.css` (append)

- [ ] **Step 1: Заменить пустой `.hero::before/::after` на pixel-decorations**

В предыдущей задаче мы написали:
```css
.hero::before,
.hero::after {
    background: none;
    animation: none;
}
```

Эту секцию **заменить** на полную:

```css
/* === Hero — pixel decorations layer === */
.hero::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    image-rendering: pixelated;
    animation: none;
    background-image:
      url("data:image/svg+xml;utf8,%3Csvg width='44' height='44' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='14' y='14' width='16' height='16' fill='%23ffe066'/%3E%3Crect x='20' y='2' width='4' height='6' fill='%23ffe066'/%3E%3Crect x='20' y='36' width='4' height='6' fill='%23ffe066'/%3E%3Crect x='2' y='20' width='6' height='4' fill='%23ffe066'/%3E%3Crect x='36' y='20' width='6' height='4' fill='%23ffe066'/%3E%3Crect x='6' y='6' width='4' height='4' fill='%23ffe066'/%3E%3Crect x='34' y='6' width='4' height='4' fill='%23ffe066'/%3E%3Crect x='6' y='34' width='4' height='4' fill='%23ffe066'/%3E%3Crect x='34' y='34' width='4' height='4' fill='%23ffe066'/%3E%3C/svg%3E"),
      url("data:image/svg+xml;utf8,%3Csvg width='80' height='32' viewBox='0 0 50 20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='10' y='5' width='30' height='10' fill='%23ffffff'/%3E%3Crect x='5' y='10' width='40' height='5' fill='%23ffffff'/%3E%3Crect x='15' y='0' width='20' height='5' fill='%23ffffff'/%3E%3C/svg%3E"),
      url("data:image/svg+xml;utf8,%3Csvg width='60' height='24' viewBox='0 0 50 20' opacity='0.85' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='10' y='5' width='30' height='10' fill='%23ffffff'/%3E%3Crect x='5' y='10' width='40' height='5' fill='%23ffffff'/%3E%3Crect x='15' y='0' width='20' height='5' fill='%23ffffff'/%3E%3C/svg%3E"),
      url("data:image/svg+xml;utf8,%3Csvg width='70' height='92' viewBox='0 0 30 40' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='13' y='22' width='4' height='18' fill='%235a341a'/%3E%3Crect x='14' y='22' width='2' height='18' fill='%233d2410'/%3E%3Crect x='3' y='6' width='24' height='20' fill='%234a8f24'/%3E%3Crect x='7' y='2' width='16' height='8' fill='%235cb02e'/%3E%3Crect x='0' y='12' width='6' height='6' fill='%233a6f1c'/%3E%3Crect x='24' y='14' width='6' height='6' fill='%233a6f1c'/%3E%3C/svg%3E"),
      url("data:image/svg+xml;utf8,%3Csvg width='56' height='78' viewBox='0 0 26 36' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='3' y='0' width='20' height='14' fill='%235cb02e'/%3E%3Crect x='3' y='0' width='20' height='2' fill='%233a6f1c'/%3E%3Crect x='6' y='3' width='4' height='4' fill='%23000000'/%3E%3Crect x='16' y='3' width='4' height='4' fill='%23000000'/%3E%3Crect x='10' y='9' width='6' height='4' fill='%23000000'/%3E%3Crect x='10' y='13' width='2' height='3' fill='%23000000'/%3E%3Crect x='14' y='13' width='2' height='3' fill='%23000000'/%3E%3Crect x='3' y='14' width='20' height='14' fill='%234a8f24'/%3E%3Crect x='3' y='28' width='8' height='8' fill='%233a6f1c'/%3E%3Crect x='15' y='28' width='8' height='8' fill='%233a6f1c'/%3E%3C/svg%3E");
    background-position:
        top 30px right 70px,    /* sun */
        top 60px left 100px,    /* cloud 1 */
        top 40px center,        /* cloud 2 */
        bottom 90px left 50px,  /* tree */
        bottom 88px right 60px; /* creeper */
    background-repeat: no-repeat;
    background-size: 44px 44px, 80px 32px, 60px 24px, 70px 92px, 56px 78px;
    background-color: transparent;
}

/* Grass strip — repeating green/dark-green 2-tone pattern over the dirt seam */
.hero::after {
    content: "";
    position: absolute;
    bottom: 28%;
    left: 0;
    right: 0;
    height: 6px;
    z-index: 0;
    background: repeating-linear-gradient(90deg,
        var(--grass) 0 8px,
        var(--grass-dark) 8px 16px);
    image-rendering: pixelated;
    animation: none;
}

/* Mobile: hide decorations to keep IP-block clean */
@media (max-width: 768px) {
    .hero::before { display: none; }
}
```

- [ ] **Step 2: Проверка**

Refresh. На hero появляются:
- **Жёлтое пиксельное солнце** в правом верхнем углу;
- **Два белых облака** — одно слева сверху, второе по центру верха (полупрозрачное);
- **Пиксельное дерево** внизу слева (ствол + крона);
- **Зелёный крипер** внизу справа (характерное лицо);
- **Полоса травы** (зелёные/тёмно-зелёные пиксели) на стыке травы и земли.

Заголовок и подзаголовок остаются ВЫШЕ декораций (их z-index:1 из Task 5). Декорации не перекрывают текст.

В DevTools уменьшить ширину окна до 700px → декорации скрываются, layout не ломается.

- [ ] **Step 3: Коммит**

```bash
git add style-variant5-sunny-voxel.css
git commit -m "feat(variant5): hero pixel decorations — sun/clouds/tree/creeper

5 inline SVG data-URIs as background-image layers on .hero::before.
.hero::after = repeating grass-strip on dirt seam (90deg gradient).
Decorations hidden on mobile (max-width: 768px).
SVG sources documented in spec section 7.1.

Step 6/18."
```

---

## Task 7: Hero — IP block + copy button + scroll indicator

**Files:**
- Modify: `style-variant5-sunny-voxel.css` (append)

- [ ] **Step 1: Дописать стили IP-блока и кнопки копирования**

```css
/* === Hero — IP block + copy button === */
.hero-ip-container {
    display: inline-flex;
    align-items: stretch;
    margin-top: 2rem;
    image-rendering: pixelated;
}

.ip-display {
    background: var(--paper);
    border: 3px solid var(--wood);
    border-right: none;
    box-shadow: 4px 4px 0 var(--shadow-wood);
    padding: 0.7rem 1.1rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-family: 'Pixelify Sans', monospace;
    font-weight: 500;
    font-size: clamp(15px, 2vw, 18px);
    color: var(--text-dark);
}

.ip-label {
    font-family: 'Pixelify Sans', monospace;
    font-weight: 700;
    font-size: 11px;
    text-transform: uppercase;
    color: var(--wood);
    letter-spacing: 1px;
}

.ip-text {
    font-family: 'Pixelify Sans', monospace;
    font-weight: 500;
    color: var(--text-dark);
}

.ip-copy-btn {
    background: var(--grass);
    border: 3px solid var(--shadow-grass);
    box-shadow: 4px 4px 0 var(--shadow-wood);
    color: var(--cloud);
    font-family: 'Pixelify Sans', monospace;
    font-weight: 700;
    font-size: clamp(11px, 1.5vw, 13px);
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 0 1.2rem;
    cursor: pointer;
    text-shadow: 2px 2px 0 var(--shadow-grass);
    display: flex;
    align-items: center;
    gap: 0.4rem;
    transition: transform 0.12s steps(2, end), box-shadow 0.12s steps(2, end);
}

.ip-copy-btn:hover {
    box-shadow: 6px 6px 0 var(--shadow-wood);
    transform: translate(-1px, -1px);
}

.ip-copy-btn:active {
    box-shadow: 2px 2px 0 var(--shadow-wood);
    transform: translate(2px, 2px);
}

.ip-copy-btn svg {
    stroke: var(--cloud);
    filter: drop-shadow(1px 1px 0 var(--shadow-grass));
}

/* === Scroll indicator === */
.scroll-indicator {
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    color: var(--cloud);
    z-index: 1;
    image-rendering: pixelated;
}

.scroll-indicator svg {
    stroke: var(--cloud);
    filter: drop-shadow(2px 2px 0 var(--shadow-grass));
}
```

- [ ] **Step 2: Проверка**

Refresh. Под подзаголовком — IP-блок: «IP: 185.17.10.83:25899» в кремовой коробке с коричневой рамкой и смещённой тенью. Справа примыкает зелёная кнопка «Копировать» с иконкой. На hover кнопка приподнимается на 1px ступенчатой анимацией. Стрелка scroll-indicator внизу hero — белая с тёмной тенью.

Кликнуть «Копировать» → существующий showCopySuccess() меняет иконку на галочку и текст «Скопировано!». Стиль кнопки сохраняется.

- [ ] **Step 3: Коммит**

```bash
git add style-variant5-sunny-voxel.css
git commit -m "feat(variant5): hero IP block + copy button + scroll indicator

IP block: paper bg, 3px wood border, 4px offset shadow.
Copy button: grass bg adjacent to IP block (border-left: none).
Hover/active: stepped translate 0.12s steps(2).
Scroll indicator: cloud color with grass-shadow drop-shadow.

Step 7/18."
```

---

## Task 8: Stats section + cards

**Files:**
- Modify: `style-variant5-sunny-voxel.css` (append)

- [ ] **Step 1: Стили секции stats и карточек**

```css
/* === Stats Section === */
.stats-section {
    background: var(--paper);
    background-image: repeating-linear-gradient(45deg,
        transparent 0 12px,
        rgba(107, 62, 26, 0.06) 12px 13px);
    padding: 3rem 1.5rem;
    border-top: 6px solid var(--wood);
    box-shadow: 0 6px 0 var(--shadow-wood);
    margin-top: 0;
}

.stats-section .stat-card {
    background: var(--cloud);
    border: 3px solid var(--wood);
    border-radius: 0 !important;
    box-shadow: 5px 5px 0 var(--shadow-wood);
    padding: 1.5rem;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    transition: transform 0.15s steps(3, end), box-shadow 0.15s steps(3, end);
    image-rendering: pixelated;
}

.stats-section .stat-card:hover {
    box-shadow: 7px 7px 0 var(--shadow-wood);
    transform: translate(-2px, -2px);
}

.stat-icon {
    color: var(--shadow-grass);
    image-rendering: pixelated;
    margin-bottom: 0.75rem;
}

.stat-icon svg {
    stroke: var(--shadow-grass);
    filter: drop-shadow(2px 2px 0 var(--grass));
}

.stat-content {
    text-align: left;
}

.stat-label {
    font-family: 'Pixelify Sans', monospace;
    font-weight: 400;
    font-size: 16px;
    color: var(--wood);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.5rem;
}

.stat-value {
    font-family: 'Pixelify Sans', monospace;
    font-weight: 700;
    font-size: clamp(22px, 3vw, 32px);
    color: var(--shadow-grass);
    line-height: 1;
}

.count-number {
    color: var(--shadow-grass);
}
.count-separator { color: var(--text-muted); margin: 0 0.2rem; }
.count-max { color: var(--text-muted); font-size: 0.6em; }

.status-text {
    font-family: 'Pixelify Sans', monospace;
    font-weight: 700;
    font-size: clamp(16px, 2.2vw, 22px);
    color: var(--shadow-grass);
}
```

- [ ] **Step 2: Проверка**

Скрол вниз с hero. Stats-section — кремовый фон с лёгкой клеточной текстурой, толстая коричневая верхняя граница 6px со смещённой тенью. Три карточки в ряд: белый фон, коричневая рамка 3px, смещённая тень 5px. Внутри: иконка SVG со ступенчатой тенью, лейбл (Pixelify Sans 400 коричневый uppercase), число (Pixelify Sans 700 тёмно-зелёное крупное). На hover карточка сдвигается ступенчато на 2px, тень увеличивается до 7px.

- [ ] **Step 3: Коммит**

```bash
git add style-variant5-sunny-voxel.css
git commit -m "feat(variant5): stats section — paper bg + 3 cloud cards

stats-section: paper bg, 6px wood top border, repeating texture pattern.
Cards: cloud bg, 3px wood border, 5px offset shadow.
Hover: 7px shadow + translate(-2,-2) stepped 0.15s steps(3).
Numbers Pixelify Sans 700 shadow-grass color.

Step 8/18."
```

---

## Task 9: Features section + cards

**Files:**
- Modify: `style-variant5-sunny-voxel.css` (append)

- [ ] **Step 1: Стили features**

```css
/* === Features Section === */
.features-section {
    background: var(--paper);
    padding: 4rem 1.5rem;
    margin-top: 0;
}

.features-section .section-title {
    text-align: center;
    margin-bottom: 2.5rem;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
}

.feature-card {
    background: var(--cloud);
    border: 3px solid var(--wood);
    border-radius: 0 !important;
    box-shadow: 5px 5px 0 var(--shadow-wood);
    padding: 1.75rem 1.25rem;
    text-align: center;
    transition: transform 0.15s steps(3, end), box-shadow 0.15s steps(3, end);
    image-rendering: pixelated;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
}

.feature-card:hover {
    box-shadow: 7px 7px 0 var(--shadow-wood);
    transform: translate(-2px, -2px);
}

.feature-icon {
    color: var(--shadow-grass);
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    image-rendering: pixelated;
}

.feature-icon svg {
    stroke: var(--shadow-grass);
    filter: drop-shadow(2px 2px 0 var(--grass));
}

.feature-title {
    font-family: 'Pixelify Sans', monospace;
    font-weight: 700;
    font-size: 16px;
    color: var(--shadow-grass);
    margin-bottom: 0.6rem;
    letter-spacing: 1px;
}

.feature-text {
    font-family: 'Pixelify Sans', monospace;
    font-weight: 400;
    font-size: 16px;
    color: var(--text-dark);
    line-height: 1.5;
}
```

- [ ] **Step 2: Проверка**

Скрол ниже. Секция features: 6 карточек в сетке (на широком экране — 3 колонки). Заголовок «Особенности сервера» — крупный тёмно-зелёный по центру. Каждая карточка: белый фон, коричневая рамка, смещённая тень, иконка SVG с зелёной drop-shadow, заголовок Pixelify Sans 700 тёмно-зелёный, текст Pixelify Sans 400 тёмный. Hover — стандартный stepped lift.

- [ ] **Step 3: Коммит**

```bash
git add style-variant5-sunny-voxel.css
git commit -m "feat(variant5): features section — 6 cloud cards in grid

features-section paper bg, grid auto-fit minmax(250px, 1fr).
Same card pattern as stats: 3px wood, 5px shadow, hover 7px+translate.
SVG icons drop-shadow grass for pixel feel.

Step 9/18."
```

---

## Task 10: Connect section + steps + button

**Files:**
- Modify: `style-variant5-sunny-voxel.css` (append)

- [ ] **Step 1: Стили connect**

```css
/* === Connect Section === */
.connect-section {
    background: var(--paper);
    padding: 4rem 1.5rem;
}

.connect-card {
    background: var(--cloud);
    border: 4px solid var(--wood);
    border-radius: 0 !important;
    box-shadow: 6px 6px 0 var(--shadow-wood);
    padding: 2.5rem 1.5rem;
    max-width: 1100px;
    margin: 0 auto;
    text-align: center;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
}

.connect-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
}

.step {
    background: transparent;
    padding: 1rem;
    text-align: left;
    display: flex;
    gap: 1rem;
    align-items: flex-start;
}

.step-number {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    background: var(--grass);
    border: 3px solid var(--shadow-grass);
    box-shadow: 3px 3px 0 var(--shadow-wood);
    color: var(--cloud);
    font-family: 'Pixelify Sans', monospace;
    font-weight: 700;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-shadow: 2px 2px 0 var(--shadow-grass);
}

.step-content h3 {
    font-family: 'Pixelify Sans', monospace;
    font-weight: 700;
    font-size: 14px;
    color: var(--shadow-grass);
    margin-bottom: 0.3rem;
    letter-spacing: 1px;
}

.step-content p {
    font-family: 'Pixelify Sans', monospace;
    font-weight: 400;
    font-size: 16px;
    color: var(--text-dark);
}

.connect-btn {
    background: var(--sun);
    border: 3px solid var(--wood);
    border-radius: 0 !important;
    box-shadow: 5px 5px 0 var(--shadow-wood);
    color: var(--text-dark);
    font-family: 'Pixelify Sans', monospace;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 0.9rem 2rem;
    cursor: pointer;
    text-shadow: 2px 2px 0 var(--paper);
    transition: transform 0.15s steps(3, end), box-shadow 0.15s steps(3, end);
    image-rendering: pixelated;
}

.connect-btn:hover {
    box-shadow: 7px 7px 0 var(--shadow-wood);
    transform: translate(-2px, -2px);
}

.connect-btn:active {
    box-shadow: 2px 2px 0 var(--shadow-wood);
    transform: translate(2px, 2px);
}
```

- [ ] **Step 2: Проверка**

Скролл ниже. Секция «Как подключиться?» — крупная карточка с 4px коричневой рамкой и тенью 6px. Внутри — 4 шага. Каждый шаг: квадратный 48×48 зелёный блок с белой цифрой Pixelify Sans 700, заголовок шага (Pixelify Sans 700 тёмно-зелёный) и описание (Pixelify Sans 400). Кнопка «Подключиться сейчас» — жёлтая (sun-цвет), коричневая рамка, смещённая тень. Hover — лифт; click → срабатывает существующий setupConnectButton() (alert + копирование IP).

- [ ] **Step 3: Коммит**

```bash
git add style-variant5-sunny-voxel.css
git commit -m "feat(variant5): connect section — 4 steps + sun CTA button

connect-card: 4px wood border (thicker, primary section).
step-number: 48x48 grass square with white number.
connect-btn: sun bg + wood border, hover lift stepped.

Step 10/18."
```

---

## Task 11: Social section + cards

**Files:**
- Modify: `style-variant5-sunny-voxel.css` (append)

- [ ] **Step 1: Стили социальных карточек**

```css
/* === Social Section === */
.social-section {
    background: var(--paper);
    padding: 4rem 1.5rem;
}

.social-section .section-title {
    text-align: center;
    margin-bottom: 2.5rem;
}

.social-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    max-width: 1100px;
    margin: 0 auto;
}

.social-card {
    background: var(--cloud);
    border: 3px solid var(--wood);
    border-radius: 0 !important;
    box-shadow: 5px 5px 0 var(--shadow-wood);
    padding: 1.75rem 1.25rem;
    text-align: center;
    text-decoration: none;
    color: var(--text-dark);
    transition: transform 0.15s steps(3, end), box-shadow 0.15s steps(3, end);
    image-rendering: pixelated;
    display: block;
    backdrop-filter: none;
}

.social-card:hover {
    box-shadow: 7px 7px 0 var(--shadow-wood);
    transform: translate(-2px, -2px);
}

.social-icon {
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
}

/* Brand color = single colorful spot per card */
.social-card.youtube .social-icon svg { fill: #ff0000; filter: drop-shadow(2px 2px 0 var(--shadow-wood)); }
.social-card.tiktok .social-icon svg  { fill: #000000; filter: drop-shadow(2px 2px 0 var(--shadow-wood)); }
.social-card.telegram .social-icon svg { fill: #229ED9; filter: drop-shadow(2px 2px 0 var(--shadow-wood)); }

.social-title {
    font-family: 'Pixelify Sans', monospace;
    font-weight: 700;
    font-size: 14px;
    color: var(--shadow-grass);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.4rem;
}

.social-text {
    font-family: 'Pixelify Sans', monospace;
    font-weight: 400;
    font-size: 15px;
    color: var(--text-dark);
}
```

- [ ] **Step 2: Проверка**

Скролл ниже. «Наши соцсети» — 3 карточки (YouTube/TikTok/Telegram). Каждая: белый фон, коричневая рамка, тень. Иконка соцсети — единственное яркое пятно (красный/чёрный/синий) с drop-shadow. Заголовок Pixelify Sans 700, описание Pixelify Sans 400. Hover лифт.

- [ ] **Step 3: Коммит**

```bash
git add style-variant5-sunny-voxel.css
git commit -m "feat(variant5): social cards — paper frame, brand-color icons

3 cards (YouTube/TikTok/Telegram) with same wood-frame pattern.
Brand color confined to icon SVG (single accent per card).
Step 11/18."
```

---

## Task 12: Footer + ::before pixel-strip

**Files:**
- Modify: `style-variant5-sunny-voxel.css` (append)

- [ ] **Step 1: Footer**

```css
/* === Footer === */
.footer {
    position: relative;
    background: var(--wood);
    color: var(--paper);
    padding: 3rem 1.5rem 1.5rem;
    border-top: 4px solid var(--shadow-wood);
}

/* Pixel grass-strip between body and footer for "earth ends here" feel */
.footer::before {
    content: "";
    position: absolute;
    top: -10px;
    left: 0;
    right: 0;
    height: 6px;
    background: repeating-linear-gradient(90deg,
        var(--grass) 0 8px,
        var(--grass-dark) 8px 16px);
    image-rendering: pixelated;
    z-index: 0;
}

.footer-content {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
}

.footer-brand h3 {
    font-family: 'Pixelify Sans', monospace;
    font-weight: 700;
    font-size: 16px;
    color: var(--sun);
    margin-bottom: 0.5rem;
    letter-spacing: 1px;
}

.footer-brand p {
    font-family: 'Pixelify Sans', monospace;
    font-weight: 400;
    font-size: 16px;
    color: var(--paper);
}

.footer-links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
}

.footer-links a {
    font-family: 'Pixelify Sans', monospace;
    font-weight: 400;
    font-size: 16px;
    color: var(--paper);
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: color 0.12s steps(2, end), border-color 0.12s steps(2, end);
}

.footer-links a:hover {
    color: var(--sun);
    border-bottom-color: var(--sun);
}

.footer-bottom {
    border-top: 2px dashed var(--shadow-wood);
    padding-top: 1rem;
    margin-top: 1.5rem;
}

.footer-bottom p {
    font-family: 'Pixelify Sans', monospace;
    font-weight: 400;
    font-size: 14px;
    color: var(--paper);
    opacity: 0.8;
}
```

- [ ] **Step 2: Проверка**

Скролл в самый низ. Над футером — горизонтальная полоса травы (зелёные пиксели). Сам футер — коричневый (wood-цвет), текст кремовый. Бренд `BlockCraftersTV` — Pixelify Sans 700 жёлтый (sun). Ссылки `Правила/Магазин/Поддержка/Discord` — кремовые, на hover становятся жёлтыми с подчёркиванием.

- [ ] **Step 3: Коммит**

```bash
git add style-variant5-sunny-voxel.css
git commit -m "feat(variant5): footer wood bg + pixel grass-strip ::before

Footer: wood bg, paper text, sun-color brand title.
::before: 6px repeating grass strip 10px above footer (earth seam).
Links hover: paper → sun + bottom-border 2px stepped.
Step 12/18."
```

---

## Task 13: Responsive @media + prefers-reduced-motion

**Files:**
- Modify: `style-variant5-sunny-voxel.css` (append)

- [ ] **Step 1: Адаптив + accessibility**

```css
/* === Responsive (mobile ≤ 768px) === */
@media (max-width: 768px) {
    .navbar {
        padding: 0.75rem 1rem;
    }

    .navbar-container {
        flex-wrap: wrap;
        gap: 0.75rem;
    }

    .navbar-brand {
        font-size: 14px;
    }

    .theme-switcher {
        order: 2;
        width: 100%;
        justify-content: center;
    }

    .theme-label {
        display: none;
    }

    .theme-select {
        flex: 1;
        max-width: 300px;
    }

    .navbar-info {
        order: 3;
        width: 100%;
        justify-content: center;
        gap: 1rem;
    }

    .hero {
        padding: 6rem 1rem 3rem;
        min-height: 90vh;
    }

    .hero::after {
        bottom: 22%;
    }

    .stats-section .stat-card {
        padding: 1.25rem;
    }

    .features-grid {
        grid-template-columns: 1fr;
    }

    .connect-card {
        padding: 1.75rem 1rem;
    }

    .step {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .footer-content {
        gap: 1rem;
    }
}

/* === Prefers-reduced-motion === */
@media (prefers-reduced-motion: reduce) {
    .stats-section .stat-card,
    .feature-card,
    .social-card,
    .ip-copy-btn,
    .connect-btn,
    .theme-select,
    .footer-links a {
        transition: none !important;
        transform: none !important;
        animation: none !important;
    }

    .stats-section .stat-card:hover,
    .feature-card:hover,
    .social-card:hover,
    .ip-copy-btn:hover,
    .connect-btn:hover {
        transform: none !important;
    }
}
```

- [ ] **Step 2: Проверка**

В DevTools Responsive mode → iPhone SE (375×667). Проверить:
- Навбар: бренд → селект (по центру, 100% ширина) → статус/players (по центру).
- Hero: декорации скрыты (только небо/трава/земля градиент). Заголовок и IP-блок видны.
- Stats: карточки в 1 колонку.
- Features: 1 колонка.
- Connect-step: вертикальный (число над текстом).
- Footer: компактный.

В DevTools Rendering → Emulate CSS prefers-reduced-motion: reduce → hover карточек больше не вызывает translate (только тень не меняется). Pixelified visual look сохраняется.

- [ ] **Step 3: Коммит**

```bash
git add style-variant5-sunny-voxel.css
git commit -m "feat(variant5): responsive @media 768px + prefers-reduced-motion

Mobile: navbar wraps, decorations hidden, single-column grids,
vertical connect-steps, compact footer.
prefers-reduced-motion: disables hover transforms/transitions
on all interactive cards/buttons.

Step 13/18."
```

---

## Task 14: Сделать Sunny Voxel дефолтной темой

**Files:**
- Modify: `script.js:62-64` (savedTheme fallback)
- Modify: `index.html:18-23` (selected attribute)

- [ ] **Step 1: Изменить дефолт в JS**

В `script.js`, в функции `initThemeSwitcher()` (строки ~62-64):

Было:
```javascript
const savedTheme = localStorage.getItem('selectedTheme') || 'variant2';
```

Стало:
```javascript
const savedTheme = localStorage.getItem('selectedTheme') || 'variant5';
```

- [ ] **Step 2: Перенести `selected` в HTML**

В `index.html` в `<select id="themeSelect">`:

Было:
```html
<option value="variant2" selected>🔵 Neon Cyberpunk</option>
...
<option value="variant5">☀️ Sunny Voxel</option>
```

Стало:
```html
<option value="variant2">🔵 Neon Cyberpunk</option>
...
<option value="variant5" selected>☀️ Sunny Voxel</option>
```

- [ ] **Step 3: Тест дефолта на свежей сессии**

В DevTools → Application → Storage → Clear site data. Hard refresh `http://localhost:3005`. Без выбора пользователем должна автоматически загрузиться **Sunny Voxel**: солнце, облака, дерево, крипер. Селект в навбаре отображает «☀️ Sunny Voxel».

- [ ] **Step 4: Тест возвращающегося юзера**

В DevTools Console: `localStorage.setItem('selectedTheme', 'variant2')`. Refresh. Должна загрузиться **variant2 (Neon Cyberpunk)** — пользователь, ранее выбравший Cyberpunk, видит её. Это подтверждает R4 в спеке: возвращающимся НЕ форсируем сброс.

- [ ] **Step 5: Коммит**

```bash
git add script.js index.html
git commit -m "feat(theme): set Sunny Voxel as default theme

JS fallback: localStorage.getItem('selectedTheme') || 'variant5'.
HTML: selected attr moved variant2 → variant5.
Returning users with stored variant2 still see variant2 (no force-reset).
Step 14/18."
```

---

## Task 15: Синхронизация селекта на index-variant1*.html и index-variant2*.html

**Files:**
- Modify: `index-variant1-dark-gaming.html` (themeSelect)
- Modify: `index-variant2-neon-cyberpunk.html` (themeSelect)

- [ ] **Step 1: Прочитать текущие селекты в обоих файлах**

```bash
cd /home/suppo/projects/github/home/home_claude_blockcrafterstv_site
grep -n "themeSelect" index-variant1-dark-gaming.html
grep -n "themeSelect" index-variant2-neon-cyberpunk.html
```

- [ ] **Step 2: Привести оба `<select>` к виду**

В обоих файлах заменить блок селекта на:

```html
<select id="themeSelect" class="theme-select">
    <option value="variant1">🟣 Dark Gaming Premium</option>
    <option value="variant2">🔵 Neon Cyberpunk</option>
    <option value="variant3">🟡 Minecraft Professional</option>
    <option value="variant4">🟢 Minecraft Green Forest</option>
    <option value="variant5" selected>☀️ Sunny Voxel</option>
</select>
```

(`selected` стоит на variant5, как в `index.html` после Task 14.)

- [ ] **Step 3: Проверка**

Открыть `http://localhost:3005/index-variant1-dark-gaming.html` и `index-variant2-neon-cyberpunk.html`. В обоих в селекте — 5 опций, по умолчанию выбрана ☀️ Sunny Voxel. Можно переключиться на любую другую тему (включая variant5 если открыта другая страница).

- [ ] **Step 4: Коммит**

```bash
git add index-variant1-dark-gaming.html index-variant2-neon-cyberpunk.html
git commit -m "fix(theme): sync variant5 option on alt index pages

Without sync, users on these pages couldn't switch to Sunny Voxel.
Step 15/18."
```

---

## Task 16: VERSION bump + README

**Files:**
- Modify: `VERSION`
- Modify: `README.md`

- [ ] **Step 1: Bump VERSION**

```bash
echo "1.1.0.0" > /home/suppo/projects/github/home/home_claude_blockcrafterstv_site/VERSION
```

- [ ] **Step 2: Обновить README.md**

Заменить заголовок проекта и раздел «Особенности» — добавить упоминание Sunny Voxel и сделать раздел «Темы оформления» с актуальным списком (Sunny Voxel = default):

В начало README, до раздела «Особенности», добавить:

```markdown
**Версия:** 1.1.0.0

## Темы оформления

На сайте 5 переключаемых CSS-тем. Выбор сохраняется в `localStorage`. Тема по умолчанию для новых посетителей — **☀️ Sunny Voxel**.

| # | Тема | Файл | Описание |
|---|------|------|----------|
| ☀️ | **Sunny Voxel (default)** | `style-variant5-sunny-voxel.css` | Дневной voxel-Minecraft: небо, трава, дерево, крипер. Pixelify Sans 400/700 |
| 🟣 | Dark Gaming Premium | `style-variant1-dark-gaming.css` | Фиолет + оранжевый, премиум-игровой |
| 🔵 | Neon Cyberpunk | `style-variant2-neon-cyberpunk.css` | Циан + магента неон, киберпанк |
| 🟡 | Minecraft Professional | `style-variant3-minecraft-pro.css` | Золото + изумруд, тёмный MC |
| 🟢 | Minecraft Green Forest | `style-variant4-minecraft-green.css` | Тёмно-зелёный лесной |

Подробности по каждой теме — в `THEME_SWITCHER_GUIDE.md` и `VARIANTS.md`.
```

В разделе **Технологии** обновить шрифты:

Было:
```
- Google Fonts (Press Start 2P)
```

Стало:
```
- Google Fonts: Pixelify Sans (default), Press Start 2P, Orbitron, Rajdhani, Rubik, Poppins, Inter, Space Mono, VT323
```

- [ ] **Step 3: Проверка**

`cat VERSION` → `1.1.0.0`. Открыть `README.md` → вверху видно «Версия: 1.1.0.0», новый раздел про темы со звёздочкой на Sunny Voxel.

- [ ] **Step 4: Коммит**

```bash
git add VERSION README.md
git commit -m "docs: bump VERSION 1.0.0.0 → 1.1.0.0 + README themes section

New section listing all 5 themes with Sunny Voxel marked as default.
Updated Technologies section with full font list.
Step 16/18."
```

---

## Task 17: THEME_SWITCHER_GUIDE.md + VARIANTS.md

**Files:**
- Modify: `THEME_SWITCHER_GUIDE.md` (добавить variant4 + variant5)
- Modify: `VARIANTS.md` (добавить variant5)

- [ ] **Step 1: Открыть `THEME_SWITCHER_GUIDE.md` и заменить блок «Доступные темы»**

В файле `THEME_SWITCHER_GUIDE.md` сейчас есть разделы про variant1, variant2, variant3 (variant4 пропущен — это устаревшая документация, фиксим заодно). Заменить блок «🎯 Доступные темы» полностью на:

```markdown
## 🎯 Доступные темы

### 1. ☀️ Sunny Voxel (по умолчанию)
**Файлы:** `style-variant5-sunny-voxel.css`

- **Цвета:** Небо #87ceeb, трава #5cb02e, солнце #ffe066, дерево #6b3e1a, бумага #fffacd
- **Стиль:** Дневной voxel-Minecraft, бодрый
- **Особенности:**
  - Пиксельные SVG-декорации (солнце, облака, дерево, крипер)
  - Полоса травы между травой и землёй
  - Без border-radius, смещённые блочные тени
  - Шрифт: Pixelify Sans 400/500/700 (Latin + Cyrillic)
  - prefers-reduced-motion: hover-анимации отключаются

### 2. 🟣 Dark Gaming Premium
**Файлы:** `style-variant1-dark-gaming.css`

- **Цвета:** Фиолетовый (#8b5cf6) + Оранжевый (#f59e0b)
- **Стиль:** Премиум игровой
- **Шрифт:** Inter

### 3. 🔵 Neon Cyberpunk
**Файлы:** `style-variant2-neon-cyberpunk.css`, базовый `style.css`

- **Цвета:** Неоновый Циан (#00f8ff) + Магента (#ff00ff)
- **Стиль:** Киберпанк с неоновыми эффектами
- **Шрифт:** Orbitron

### 4. 🟡 Minecraft Professional
**Файлы:** `style-variant3-minecraft-pro.css`

- **Цвета:** Золотой (#fbbf24) + Изумрудный (#10b981)
- **Стиль:** Minecraft, тёмный
- **Шрифт:** Press Start 2P + Rubik

### 5. 🟢 Minecraft Green Forest
**Файлы:** `style-variant4-minecraft-green.css`

- **Цвета:** Зелёный (#22c55e) + Лайм (#84cc16)
- **Стиль:** Тёмный лесной MC
- **Шрифт:** Press Start 2P + Poppins
```

- [ ] **Step 2: Обновить таблицу «Сравнение производительности» в том же файле**

```markdown
| Тема | Размер CSS | Шрифты | Анимации |
|------|-----------|--------|----------|
| Sunny Voxel | ~24KB | Pixelify Sans (Cyrillic) | Stepped (hover) |
| Variant 1 (Dark Gaming) | ~17KB | Inter, Rajdhani | Умеренные |
| Variant 2 (Cyberpunk) | ~20KB | Orbitron, Rajdhani | Интенсивные |
| Variant 3 (Minecraft Pro) | ~19KB | Press Start 2P, Rubik | Умеренные |
| Variant 4 (Green Forest) | ~19KB | Press Start 2P, Poppins | Умеренные |
```

- [ ] **Step 3: Обновить `VARIANTS.md`** — добавить раздел Sunny Voxel в начале (как default):

В начало `VARIANTS.md` добавить:

```markdown
## ☀️ Sunny Voxel (default, v1.1.0.0+)

Файл: `style-variant5-sunny-voxel.css`
Шрифт: Pixelify Sans (с поддержкой кириллицы)
Палитра: небо #87ceeb · трава #5cb02e · солнце #ffe066 · дерево #6b3e1a · бумага #fffacd

Особенности:
- Дневной градиент неба → травы → земли в hero
- Пиксельные SVG-декорации (солнце, два облака, дерево, крипер)
- Полоса пиксельной травы поверх стыка травы и земли
- Все углы прямые, тени — смещённые блоки 4-7px
- prefers-reduced-motion: отключает hover-transforms

Подходит для: дневной аудитории, фанатов ванильного MC, child-friendly.

---
```

- [ ] **Step 4: Проверка**

`cat THEME_SWITCHER_GUIDE.md | head -80` — видно 5 тем по порядку с Sunny Voxel первой как default. `cat VARIANTS.md | head -30` — Sunny Voxel описана сверху.

- [ ] **Step 5: Коммит**

```bash
git add THEME_SWITCHER_GUIDE.md VARIANTS.md
git commit -m "docs(themes): add Sunny Voxel + previously-missing Variant 4 docs

THEME_SWITCHER_GUIDE.md was 2 themes behind (missing variant4).
Now lists all 5 themes with Sunny Voxel as default, updated perf table.
VARIANTS.md gets Sunny Voxel section at top.
Step 17/18."
```

---

## Task 18: Регрессионный тест (5 тем cycle) + финальный push

**Files:** none (testing only)

- [ ] **Step 1: Свежая сессия — проверить дефолт**

В DevTools → Application → Storage → Clear site data. Hard refresh `http://localhost:3005`.

✅ **Ожидание:** автоматически загрузилась Sunny Voxel. В Console нет ошибок. В Network — `style-variant5-sunny-voxel.css` загружен.

- [ ] **Step 2: Циклически переключить все 5 тем**

В селекте темы выбрать по порядку:
1. **🟣 Dark Gaming Premium** — фиолет + оранж, тёмный фон с radial gradient.
2. **🔵 Neon Cyberpunk** — циан + магента, неоновые свечения.
3. **🟡 Minecraft Professional** — золото + изумруд на чёрном.
4. **🟢 Minecraft Green Forest** — тёмно-зелёный лесной.
5. **☀️ Sunny Voxel** — дневной voxel.

✅ **Ожидание для каждой:**
- Тема перерисовывается без видимых артефактов > 100ms;
- Предыдущий `<link id="theme-stylesheet">` удалён, новый добавлен (DevTools Elements → `<head>`);
- localStorage обновляется (`localStorage.getItem('selectedTheme')`);
- В Console нет ошибок.

- [ ] **Step 3: Проверить регресс на variant1-4**

Особенно: на variant1-4 при скролле hero **двигается** (parallax работает, JS меняет inline transform). На variant5 hero **не двигается** (CSS `transform: none !important` побеждает inline-style).

- [ ] **Step 4: Mobile-проверка для Sunny Voxel**

В DevTools Responsive 375×667. Sunny Voxel: декорации скрыты, layout вертикальный, IP-блок и кнопка читабельны, footer компактный.

- [ ] **Step 5: Cross-page selector sync**

Открыть `index-variant1-dark-gaming.html` и `index-variant2-neon-cyberpunk.html`. В каждом — 5 опций селекта, по умолчанию ☀️ Sunny Voxel selected.

- [ ] **Step 6: Финальный push (если ещё не запушены commits)**

```bash
cd /home/suppo/projects/github/home/home_claude_blockcrafterstv_site
git status
# Должно быть "nothing to commit, working tree clean"
git log --oneline -20
# Видна история из 17 commits step1-step17
git push origin main
```

- [ ] **Step 7: Обновить claude-context (опционально)**

Per CLAUDE.md, после крупного фичи — обновить контекст:

```bash
bash /home/suppo/projects/github/home/home_claude_blockcrafterstv_site/scripts/safe-context-update.sh
# ... (или ручной workflow per CLAUDE.md)
# Обновить CONTEXT.md (статус: 🟢 Готов, версия 1.1.0.0)
# Создать sessions/2026-04-26_HomePC.md
```

(Если скрипта safe-context-update.sh в этом репо нет — пропустить, обновить контекст вручную потом.)

---

## Self-review checklist

После завершения всех 18 задач, проверить против спеки:

- [ ] **Спека покрыта:** все приёмочные критерии 1-12 из спеки § 14 проверены вживую.
- [ ] **Палитра:** все 15 CSS-переменных из спеки § 4 объявлены в Task 2.
- [ ] **Типографика:** Pixelify Sans 400/500/700 применены ко всем заголовкам / числам / кнопкам / body.
- [ ] **Декорации:** солнце, 2 облака, дерево, крипер, grass-strip — все 5 присутствуют в hero.
- [ ] **Псевдоэлементы:** position/z-index корректны (контент над декорациями).
- [ ] **Parallax:** отключён только для variant5, работает на 1-4.
- [ ] **Дефолт:** свежая сессия → Sunny Voxel; вернувшийся variant2-юзер → variant2.
- [ ] **Sync:** index.html, index-variant1, index-variant2 имеют одинаковый список опций.
- [ ] **Документация:** README, VERSION, THEME_SWITCHER_GUIDE, VARIANTS актуальны.
- [ ] **Accessibility:** prefers-reduced-motion отрубает hover transforms.
- [ ] **Mobile:** ≤768px hide decorations, single-column grids.

---

## Известные ограничения (из спеки)

- **R6 FOUC:** при первой загрузке возможна вспышка Cyberpunk перед Voxel (style.css загружается синхронно, JS добавляет variant5 после DOMContentLoaded). Принято для v1.1.0.0, фикс отложен на 1.2.0.0 (inline `<head>` script).
- **R7 Контраст:** `--cloud` на `--grass-dark` ≈ 4.5:1 (граничный AA). Для дневной декоративной темы приемлемо, опирается на text-shadow.
- **Native dropdown options:** при открытии `<select>` опции рендерит ОС, не CSS — это ограничение HTML, не специфично для variant5.
