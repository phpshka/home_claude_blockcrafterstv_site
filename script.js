// BlockCraftersTV - Enhanced Server Status Script

// Server configuration
const SERVER_CONFIG = {
    ip: '185.17.10.83',
    port: 25899,
    maxPlayers: 100,
    updateInterval: 30000 // 30 seconds
};

// Theme configuration
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
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme switcher
    initThemeSwitcher();

    // Check real server status immediately
    checkRealServerStatus();

    // Update status every 30 seconds
    setInterval(checkRealServerStatus, SERVER_CONFIG.updateInterval);

    // Setup scroll indicator
    setupScrollIndicator();

    // Setup connect button
    setupConnectButton();

    // Add smooth scroll behavior for links
    setupSmoothScroll();
});

// Theme Switcher Functions
function initThemeSwitcher() {
    const themeSelect = document.getElementById('themeSelect');

    if (!themeSelect) {
        console.warn('Theme selector not found');
        return;
    }

    // Load saved theme from localStorage or use default
    const savedTheme = localStorage.getItem('selectedTheme') || 'variant2';
    themeSelect.value = savedTheme;
    loadTheme(savedTheme);

    // Add change event listener
    themeSelect.addEventListener('change', (e) => {
        const selectedTheme = e.target.value;
        loadTheme(selectedTheme);
        localStorage.setItem('selectedTheme', selectedTheme);
    });
}

function loadTheme(themeKey) {
    const theme = THEMES[themeKey];

    if (!theme) {
        console.error('Theme not found:', themeKey);
        return;
    }

    // Remove existing theme link if any
    const existingThemeLink = document.getElementById('theme-stylesheet');
    if (existingThemeLink) {
        existingThemeLink.remove();
    }

    // Get the default stylesheet
    const defaultStylesheet = document.querySelector('link[href="style.css"]');

    if (themeKey === 'variant2') {
        // Variant 2 is the default style.css, so just use it
        if (!defaultStylesheet) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'style.css';
            link.id = 'theme-stylesheet';
            document.head.appendChild(link);
        }
    } else {
        // Load variant CSS file
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = theme.css;
        link.id = 'theme-stylesheet';

        // Add after the default stylesheet or at the end of head
        if (defaultStylesheet) {
            defaultStylesheet.after(link);
        } else {
            document.head.appendChild(link);
        }
    }

    // Add smooth transition effect
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 50);

    console.log(`Theme loaded: ${theme.name}`);
}

// Update server status
function updateServerStatus() {
    // Simulation mode: generates random status for demonstration
    // In production, replace with real API call to checkRealServerStatus()

    const isOnline = Math.random() > 0.2; // 80% chance of being online
    const playerCount = isOnline ? Math.floor(Math.random() * 50) : 0;

    // Update all status indicators
    updateStatusIndicators(isOnline, playerCount);
}

// Update all status elements on the page
function updateStatusIndicators(isOnline, playerCount) {
    // Navbar status
    const navStatusDot = document.getElementById('navStatusDot');
    const navStatusText = document.getElementById('navStatusText');
    const navPlayersText = document.getElementById('navPlayersText');

    // Main status
    const statusText = document.getElementById('statusText');
    const playerCountElement = document.getElementById('playerCount');

    if (isOnline) {
        // Online status
        if (navStatusDot) {
            navStatusDot.className = 'status-dot online';
        }
        if (navStatusText) {
            navStatusText.textContent = 'Онлайн';
            navStatusText.className = 'status-text online';
        }
        if (statusText) {
            statusText.textContent = 'Онлайн';
            statusText.className = 'status-text online';
        }
        if (playerCountElement) {
            playerCountElement.innerHTML = `
                <span class="count-number">${playerCount}</span>
                <span class="count-separator">/</span>
                <span class="count-max">${SERVER_CONFIG.maxPlayers}</span>
            `;
        }
        if (navPlayersText) {
            navPlayersText.textContent = `${playerCount}/${SERVER_CONFIG.maxPlayers}`;
        }
    } else {
        // Offline status
        if (navStatusDot) {
            navStatusDot.className = 'status-dot offline';
        }
        if (navStatusText) {
            navStatusText.textContent = 'Офлайн';
            navStatusText.className = 'status-text offline';
        }
        if (statusText) {
            statusText.textContent = 'Офлайн';
            statusText.className = 'status-text offline';
        }
        if (playerCountElement) {
            playerCountElement.innerHTML = `
                <span class="count-number">0</span>
                <span class="count-separator">/</span>
                <span class="count-max">${SERVER_CONFIG.maxPlayers}</span>
            `;
        }
        if (navPlayersText) {
            navPlayersText.textContent = `0/${SERVER_CONFIG.maxPlayers}`;
        }
    }
}

// Copy IP to clipboard
function copyIP() {
    const ipText = `${SERVER_CONFIG.ip}:${SERVER_CONFIG.port}`;

    navigator.clipboard.writeText(ipText).then(() => {
        // Show success feedback
        showCopySuccess();
    }).catch(err => {
        console.error('Failed to copy IP:', err);
        // Fallback: try to use old method
        fallbackCopyIP(ipText);
    });
}

// Show copy success feedback
function showCopySuccess() {
    const copyBtns = document.querySelectorAll('.ip-copy-btn');

    copyBtns.forEach(btn => {
        const originalText = btn.innerHTML;
        const originalBg = btn.style.background;

        btn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Скопировано!
        `;
        btn.style.background = '#05b305';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = originalBg;
        }, 2000);
    });
}

// Fallback copy method for older browsers
function fallbackCopyIP(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        showCopySuccess();
    } catch (err) {
        console.error('Fallback copy failed:', err);
        alert('Не удалось скопировать IP. Пожалуйста, скопируйте вручную: ' + text);
    }

    document.body.removeChild(textArea);
}

// Setup scroll indicator
function setupScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const statsSection = document.querySelector('.stats-section');
            if (statsSection) {
                statsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Setup connect button
function setupConnectButton() {
    const connectBtn = document.querySelector('.connect-btn');

    if (connectBtn) {
        connectBtn.addEventListener('click', () => {
            // Copy IP first
            copyIP();

            // Show connection instructions
            setTimeout(() => {
                showConnectionModal();
            }, 500);
        });
    }
}

// Show connection modal
function showConnectionModal() {
    const message = `🎮 IP скопирован в буфер обмена!

Как подключиться к серверу:

1️⃣ Запусти Minecraft (версия 1.8 и выше)
2️⃣ Нажми "Multiplayer" (Мультиплеер)
3️⃣ Нажми "Add Server" (Добавить сервер)
4️⃣ Вставь IP: ${SERVER_CONFIG.ip}:${SERVER_CONFIG.port}
5️⃣ Нажми "Done" (Готово) и подключайся!

Увидимся в игре! 🚀`;

    alert(message);
}

// Setup smooth scroll for internal links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Real server status check function (optional)
async function checkRealServerStatus() {
    try {
        // Using a public Minecraft server status API
        const response = await fetch(
            `https://api.mcsrvstat.us/2/${SERVER_CONFIG.ip}:${SERVER_CONFIG.port}`
        );
        const data = await response.json();

        if (data && data.online !== undefined) {
            const isOnline = data.online;
            const playerCount = data.players ? data.players.online : 0;
            const maxPlayers = data.players ? data.players.max : SERVER_CONFIG.maxPlayers;

            // Update max players in config
            SERVER_CONFIG.maxPlayers = maxPlayers;

            // Update status indicators
            updateStatusIndicators(isOnline, playerCount);
        } else {
            console.warn('Invalid response from server status API');
            // Fallback to simulation
            updateServerStatus();
        }
    } catch (error) {
        console.error('Error checking server status:', error);
        // Fallback to simulation
        updateServerStatus();
    }
}

// Uncomment the following lines to use real server status checking
// Replace updateServerStatus() with checkRealServerStatus() in the initialization

/*
document.addEventListener('DOMContentLoaded', () => {
    checkRealServerStatus();
    setInterval(checkRealServerStatus, SERVER_CONFIG.updateInterval);
    // ... rest of initialization
});
*/

// Enhanced Scroll Animations with Intersection Observer
const scrollObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, scrollObserverOptions);

// Initialize scroll animations with beautiful assembly effects
document.addEventListener('DOMContentLoaded', () => {
    // Animate sections on scroll with build-up effect
    const sections = document.querySelectorAll('.features-section, .connect-section, .social-section');
    sections.forEach((section, index) => {
        section.classList.add('scroll-build-up');
        section.style.transitionDelay = `${index * 0.2}s`;
        scrollObserver.observe(section);
    });

    // Animate stat cards with assembly effect (beautiful construction)
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.classList.add('scroll-assemble');
        card.style.transitionDelay = `${index * 0.2}s`;
        scrollObserver.observe(card);
    });

    // Animate feature cards with fragment/particle assembly
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        if (index % 2 === 0) {
            card.classList.add('scroll-fragment');
        } else {
            card.classList.add('scroll-glide-in');
        }
        card.style.transitionDelay = `${index * 0.15}s`;
        scrollObserver.observe(card);
    });

    // Animate social cards with glide effect
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach((card, index) => {
        card.classList.add('scroll-assemble');
        card.style.transitionDelay = `${index * 0.12}s`;
        scrollObserver.observe(card);
    });

    // Animate connect steps
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.classList.add('scroll-fragment');
        step.style.transitionDelay = `${index * 0.15}s`;
        scrollObserver.observe(step);
    });
});

// Expose copyIP function globally for onclick handlers
window.copyIP = copyIP;
