# 🎨 Руководство по переключателю тем BlockCraftersTV

## Описание

На сайте теперь встроен **интерактивный переключатель тем**, который позволяет мгновенно переключаться между тремя вариантами дизайна прямо в браузере!

## 📍 Расположение

Переключатель находится в **навигационной панели** (navbar) в верхней части сайта, между логотипом и статусом сервера.

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

## 🔧 Как использовать

### В браузере:
1. Откройте сайт `index.html`
2. В навбаре найдите выпадающий список "Тема:"
3. Выберите желаемую тему
4. Тема применится **мгновенно**
5. Выбор сохраняется в localStorage браузера

### Техническая информация:

#### Автоматическое сохранение
- Выбранная тема сохраняется в `localStorage`
- При следующем посещении сайта автоматически загружается последняя выбранная тема
- Ключ хранения: `selectedTheme`

#### Структура файлов:
```
BlockCraftersTV_site/
├── index.html                          # Основной HTML (с theme switcher)
├── script.js                           # JavaScript (включая логику переключения)
│
├── style.css                           # Активный CSS (Variant 2 по умолчанию)
│
├── style-variant1-dark-gaming.css      # Вариант 1: Dark Gaming Premium
├── style-variant2-neon-cyberpunk.css   # Вариант 2: Neon Cyberpunk
├── style-variant3-minecraft-pro.css    # Вариант 3: Minecraft Professional
│
├── README.md                           # Общая документация
├── VARIANTS.md                         # Описание вариантов
└── THEME_SWITCHER_GUIDE.md            # Это руководство
```

## 💻 Как это работает

### HTML (navbar):
```html
<div class="theme-switcher">
    <label for="themeSelect" class="theme-label">Тема:</label>
    <select id="themeSelect" class="theme-select">
        <option value="variant1">🟣 Dark Gaming Premium</option>
        <option value="variant2" selected>🔵 Neon Cyberpunk</option>
        <option value="variant3">🟡 Minecraft Professional</option>
    </select>
</div>
```

### JavaScript (script.js):
```javascript
// Конфигурация тем
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
    }
};

// Инициализация при загрузке страницы
function initThemeSwitcher() {
    const themeSelect = document.getElementById('themeSelect');
    const savedTheme = localStorage.getItem('selectedTheme') || 'variant2';

    themeSelect.value = savedTheme;
    loadTheme(savedTheme);

    themeSelect.addEventListener('change', (e) => {
        const selectedTheme = e.target.value;
        loadTheme(selectedTheme);
        localStorage.setItem('selectedTheme', selectedTheme);
    });
}

// Загрузка темы
function loadTheme(themeKey) {
    // Удаление старого CSS
    const existingThemeLink = document.getElementById('theme-stylesheet');
    if (existingThemeLink) {
        existingThemeLink.remove();
    }

    // Загрузка нового CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = THEMES[themeKey].css;
    link.id = 'theme-stylesheet';
    document.head.appendChild(link);
}
```

## 📱 Адаптивность

На мобильных устройствах (< 768px):
- Навбар переходит в flex-wrap режим
- Переключатель тем занимает всю ширину
- Метка "Тема:" скрывается
- Select расширяется на всю доступную ширину (max 300px)
- Порядок элементов: Лого → Theme Switcher → Статус

## 🎨 Стилизация переключателя

Переключатель адаптируется под каждую тему:

### Variant 1 (Dark Gaming):
- Border: фиолетовый (#8b5cf6)
- Hover: оранжевое свечение
- Focus: оранжевый border

### Variant 2 (Neon Cyberpunk):
- Border: циан (#00f8ff)
- Hover: неоновое циановое свечение
- Focus: магента border с неоновым эффектом

### Variant 3 (Minecraft):
- Border: золотой 3px (#fbbf24)
- Hover: золотое свечение + 3D тень
- Focus: изумрудный border + свечение
- Background: золотая прозрачность

## 🔄 Смена темы вручную (через код)

Если нужно программно изменить тему:

```javascript
// Загрузить конкретную тему
loadTheme('variant1');  // Dark Gaming Premium
loadTheme('variant2');  // Neon Cyberpunk
loadTheme('variant3');  // Minecraft Professional

// Сохранить в localStorage
localStorage.setItem('selectedTheme', 'variant1');
```

## 🐛 Устранение неполадок

### Тема не применяется:
1. Проверьте консоль браузера (F12)
2. Убедитесь, что все CSS файлы присутствуют
3. Очистите кэш браузера (Ctrl+F5)

### Тема не сохраняется:
1. Проверьте, включены ли cookies/localStorage в браузере
2. Проверьте режим инкогнито (в нем localStorage может быть ограничен)

### Стили конфликтуют:
1. Убедитесь, что нет дублирующих `<link>` тегов в HTML
2. Проверьте, что JS правильно удаляет старый stylesheet перед добавлением нового

## 📊 Сравнение производительности

| Тема | Размер CSS | Шрифты | Анимации |
|------|-----------|--------|----------|
| Sunny Voxel | ~28KB | Pixelify Sans (Cyrillic) | Stepped (hover) |
| Variant 1 (Dark Gaming) | ~17KB | Inter, Rajdhani | Умеренные |
| Variant 2 (Cyberpunk) | ~20KB | Orbitron, Rajdhani | Интенсивные |
| Variant 3 (Minecraft Pro) | ~19KB | Press Start 2P, Rubik | Умеренные |
| Variant 4 (Green Forest) | ~19KB | Press Start 2P, Poppins | Умеренные |

## 🚀 Будущие улучшения

Возможные дополнения:
- [ ] Анимация перехода между темами
- [ ] Preview тем (миниатюры)
- [ ] Кастомизация цветов внутри темы
- [ ] Экспорт/импорт настроек
- [ ] Автоматическая смена темы (день/ночь)

---

**Приятного использования!** 🎮✨

Если возникнут вопросы или предложения, создайте issue в репозитории проекта.
