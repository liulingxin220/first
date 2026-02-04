function createStars() {
    const starsContainer = document.getElementById('stars');
    const numberOfStars = 150;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.width = (Math.random() * 3 + 1) + 'px';
        star.style.height = star.style.width;
        starsContainer.appendChild(star);
    }
}

function createFloatingHeart(event) {
    if (event) {
        event.stopPropagation();
    }

    const container = document.getElementById('floatingHearts');
    const heart = document.createElement('div');
    heart.className = 'float-heart';
    heart.innerHTML = ['💕', '💖', '💗', '💓', '❤️'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 4000);
}

setInterval(createFloatingHeart, 1500);

function showSecret() {
    const secretContent = document.getElementById('secretContent');
    secretContent.classList.add('active');
    startHeartsRain();
    createFireworks();
}

function closeSecret() {
    const secretContent = document.getElementById('secretContent');
    secretContent.classList.remove('active');
    stopHeartsRain();
}

let heartsInterval;

function startHeartsRain() {
    const container = document.getElementById('heartsRain');
    container.classList.add('active');

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart-rain';
        heart.innerHTML = ['💕', '💖', '💗', '💓', '❤️', '🌹'][Math.floor(Math.random() * 6)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 4000);
    }

    heartsInterval = setInterval(createHeart, 200);
}

function stopHeartsRain() {
    const container = document.getElementById('heartsRain');
    container.classList.remove('active');
    clearInterval(heartsInterval);
    container.innerHTML = '';
}

function createFireworks() {
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb', '#db7093'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createFirework(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 100);
    }
}

function createFirework(color) {
    const secretContent = document.getElementById('secretContent');
    const firework = document.createElement('div');
    firework.style.cssText = `
        position: absolute;
        width: 10px;
        height: 10px;
        background: ${color};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: fireworkAnimation 1s ease-out forwards;
        pointer-events: none;
    `;
    secretContent.appendChild(firework);

    if (!document.getElementById('fireworkStyle')) {
        const style = document.createElement('style');
        style.id = 'fireworkStyle';
        style.textContent = `
            @keyframes fireworkAnimation {
                0% {
                    transform: scale(1);
                    opacity: 1;
                }
                100% {
                    transform: scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => {
        firework.remove();
    }, 1000);
}

window.onload = function() {
    createStars();

    setTimeout(() => {
        for (let i = 0; i < 3; i++) {
            setTimeout(createFloatingHeart, i * 500);
        }
    }, 1000);
};

document.getElementById('secretContent').addEventListener('click', function(e) {
    if (e.target === this) {
        closeSecret();
    }
});
