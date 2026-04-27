# TODO — claude_blockcrafterstv_website

## 🔥 Приоритет 1
- (пусто)

## 🔶 Приоритет 2 — v1.1.0.1 polish (если найдём время)
- [ ] iOS Safari URL-bar fix: `@supports (-webkit-touch-callout: none) { .hero { min-height: -webkit-fill-available } }` в variant5
- [ ] `@media (hover: none)` block в variant5 — отрубить hover-transforms на touch-устройствах (phantom-tap проблема)
- [ ] README косметика: убрать упоминание "Parallax эффект" (отключён в variant5 default), добавить variant CSS-файлы в дерево «Структура проекта»

## 🔷 Когда-нибудь
- [ ] SEO-оптимизация (meta-теги, og:image)
- [ ] **v1.2.0.0**: рефакторинг style.css в theme-neutral базу + inline `<head>` script для preload variant CSS — устранит FOUC при первой загрузке (~50-200мс Cyberpunk-вспышка перед Voxel у новых посетителей)
- [ ] Self-hosted шрифт «настоящий Minecraft» с кириллицей (если найдётся бесплатный с правильной лицензией) — более аутентично чем гибрид Press Start 2P + Russo One

## ✅ Сделано
- [x] Лендинг с 4 темами — initial (2026-02-19)
- [x] Real-time статус сервера через mcsrvstat.us — initial
- [x] Счётчик игроков (обновление 30с) — initial
- [x] Копирование IP в буфер — initial
- [x] Responsive дизайн — initial
- [x] Параллакс и scroll-анимации — initial
- [x] **5-я тема ☀️ Sunny Voxel + дефолт** — v1.1.0.0, 2026-04-26/27 (18 задач + 5 fixups)
- [x] **Hybrid font scheme** Press Start 2P + Russo One + Rubik через CSS-vars — v1.1.1.0, 2026-04-27
