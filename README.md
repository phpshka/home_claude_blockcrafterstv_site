# BlockCraftersTV - Лендинг для Minecraft Сервера

Современная лендинговая страница для Minecraft сервера BlockCraftersTV в стиле MCServer-Web-Template с размытым фоном и анимациями.

**Версия:** 1.1.1.0

## Темы оформления

На сайте 5 переключаемых CSS-тем. Выбор сохраняется в `localStorage`. Тема по умолчанию для новых посетителей — **☀️ Sunny Voxel**.

| # | Тема | Файл | Описание |
|---|------|------|----------|
| ☀️ | **Sunny Voxel (default)** | `style-variant5-sunny-voxel.css` | Дневной voxel-Minecraft: небо, трава, дерево, крипер. Press Start 2P + Russo One + Rubik |
| 🟣 | Dark Gaming Premium | `style-variant1-dark-gaming.css` | Фиолет + оранжевый, премиум-игровой |
| 🔵 | Neon Cyberpunk | `style-variant2-neon-cyberpunk.css` | Циан + магента неон, киберпанк |
| 🟡 | Minecraft Professional | `style-variant3-minecraft-pro.css` | Золото + изумруд, тёмный MC |
| 🟢 | Minecraft Green Forest | `style-variant4-minecraft-green.css` | Тёмно-зелёный лесной |

Подробности по каждой теме — в `THEME_SWITCHER_GUIDE.md` и `VARIANTS.md`.

## Особенности

- 🌫️ **Размытый фон** с эффектом backdrop-filter
- 🎨 **Темная современная тема** с зеленым акцентом
- 🚀 **Hero секция** на весь экран с анимациями
- 📊 **Статус сервера** в реальном времени (онлайн/офлайн)
- 👥 **Счетчик игроков** с автообновлением
- 📋 **Копирование IP** в один клик с визуальной обратной связью
- ✨ **Hover эффекты** и плавные анимации
- 🔗 **Социальные сети** (YouTube, TikTok)
- 📱 **Полностью адаптивный** дизайн для всех устройств
- 🎯 **Parallax эффект** при прокрутке
- 💫 **Scroll-анимации** для карточек

## Структура проекта

```
BlockCraftersTV_site/
├── index.html      # Основная HTML структура
├── style.css       # Стили в стиле Minecraft
├── script.js       # Функционал и проверка статуса
└── README.md       # Документация
```

## Быстрый старт

1. Откройте файл `index.html` в браузере
2. Сайт готов к использованию!

## Настройка

### Изменение IP сервера

В файле `script.js` найдите конфигурацию:

```javascript
const SERVER_CONFIG = {
    ip: 'play.blockcrafters.tv',
    port: 25565,
    maxPlayers: 100
};
```

Измените значения на свои.

### Изменение ссылок на социальные сети

В файле `index.html` найдите секцию социальных сетей:

```html
<a href="https://youtube.com/@BlockCraftersTV" target="_blank" class="social-btn youtube">
<a href="https://tiktok.com/@blockcrafterstv" target="_blank" class="social-btn tiktok">
```

Замените ссылки на свои каналы.

### Реальная проверка статуса сервера

По умолчанию используется симуляция статуса. Для реальной проверки:

1. В файле `script.js` найдите функцию `checkRealServerStatus()`
2. Раскомментируйте последнюю строку:
   ```javascript
   setInterval(checkRealServerStatus, 30000);
   ```
3. Закомментируйте строку с `updateServerStatus()` в DOMContentLoaded

**Примечание:** Реальная проверка использует API `api.mcsrvstat.us`. Убедитесь, что ваш сервер доступен публично.

## Деплой

### GitHub Pages

1. Создайте репозиторий на GitHub
2. Загрузите все файлы
3. Перейдите в Settings → Pages
4. Выберите ветку main и папку root
5. Сохраните

### Netlify

1. Перетащите папку проекта на https://app.netlify.com/drop
2. Сайт будет опубликован автоматически

### Обычный хостинг

Загрузите все файлы в корневую директорию вашего веб-хостинга.

## Кастомизация

### Изменение цветов

В файле `style.css` измените цветовые переменные:

- Основной зеленый: `#52a852`
- Темный фон: `#1a1a1a`, `#2d2d2d`
- Красный (офлайн): `#a85252`

### Добавление новых блоков

Все блоки используют класс `.info-card`, `.ip-card` или `.social-card`. Скопируйте структуру существующего блока и измените содержимое.

## Технологии

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript (ES6+)
- Google Fonts: Press Start 2P + Russo One + Rubik (Sunny Voxel default), Orbitron, Rajdhani, Poppins, Inter, Space Mono

## Поддержка браузеров

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Лицензия

MIT License - свободно используйте для своих проектов!

## Автор

Создано для сервера BlockCraftersTV

---

**Приятной игры на BlockCraftersTV!** 🎮
