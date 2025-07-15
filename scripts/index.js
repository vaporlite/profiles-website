let isPlaying = false;

function togglePlay() {
    const button = document.querySelector('.play-button');
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        button.innerHTML = '<div style="width: 4px; height: 12px; background: #000; margin: 0 1px;"></div><div style="width: 4px; height: 12px; background: #000; margin: 0 1px;"></div>';
    } else {
        button.innerHTML = '';
        button.style.content = '';
    }
}

isPlaying = false;

function togglePlay() {
    const button = document.querySelector('.play-button');
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        button.innerHTML = '<div style="width: 4px; height: 12px; background: #000; margin: 0 1px;"></div><div style="width: 4px; height: 12px; background: #000; margin: 0 1px;"></div>';
    } else {
        button.innerHTML = '';
        button.style.content = '';
    }
}

function createMatrixRain() {
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
    
    const chars = '01';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff88';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
}

createMatrixRain();

const glitchElement = document.querySelector('.glitch');
glitchElement.addEventListener('mouseenter', () => {
    glitchElement.style.animation = 'glitch-1 0.3s infinite';
});

glitchElement.addEventListener('mouseleave', () => {
    glitchElement.style.animation = 'none';
});
