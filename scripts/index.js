class WirescanLanding {
    constructor() {
        this.loadingProgress = document.getElementById('loadingProgress');
        this.loadingText = document.getElementById('loadingText');
        this.cursor = document.querySelector('.cursor');
        this.isLoading = true;
        this.progress = 0;

        this.loadingMessages = [
            "initializing system...",
            "scanning network topology...",
            "accessing mainframe...",
            "bypassing security protocols...",
            "establishing connection...",
            "loading profile data...",
            "system ready"
        ];

        this.init();
    }

    init() {
        this.createMatrixRain();
        this.setupCursor();
        this.startLoading();
        this.setupClickHandler();
    }

    createMatrixRain() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.1';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const charArray = chars.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00ff88';
            ctx.font = fontSize + 'px JetBrains Mono, monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        setInterval(draw, 35);
    }

    setupCursor() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX - 10 + 'px';
            this.cursor.style.top = e.clientY - 10 + 'px';
        });

        document.addEventListener('mousedown', () => {
            this.cursor.style.transform = 'scale(0.8)';
        });

        document.addEventListener('mouseup', () => {
            this.cursor.style.transform = 'scale(1)';
        });
    }

    startLoading() {
        let messageIndex = 0;

        const updateProgress = () => {
            this.progress += Math.random() * 15 + 5;

            if (this.progress >= 100) {
                this.progress = 100;
                this.isLoading = false;
                this.loadingText.textContent = this.loadingMessages[this.loadingMessages.length - 1];
                const container = document.querySelector('.container');
                if (container) {
                    container.classList.add('completed');
                }
                return;
            }

            this.loadingProgress.style.width = this.progress + '%';

            if (messageIndex < this.loadingMessages.length - 1) {
                this.loadingText.textContent = this.loadingMessages[messageIndex];
                messageIndex++;
            }

            setTimeout(updateProgress, Math.random() * 1000 + 500);
        };

        updateProgress();
    }

    setupClickHandler() {
        document.addEventListener('click', () => {
            if (!this.isLoading) {
                this.redirectToProfile();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !this.isLoading) {
                this.redirectToProfile();
            }
        });
    }

    redirectToProfile() {
        // Create glitch effect before redirect
        const container = document.querySelector('.container');
        if (container) {
            container.style.animation = 'glitch-1 0.5s ease-in-out';
        }

        setTimeout(() => {
            window.location.href = '/wirescan';
        }, 500);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WirescanLanding();
});