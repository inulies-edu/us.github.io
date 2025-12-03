const startDate = new Date(2025, 8, 6, 15, 20, 0);

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const elDays = document.getElementById('days');
    if(elDays) {
        document.getElementById('days').innerText = days;
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    }
}
setInterval(updateCounter, 1000);
updateCounter();


const emojiList = ['📸', '✨', '💖', '😍', '🎞️', '💑', '🌸', '🎶'];

const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
    @keyframes fall {
        0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
        100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
    }
    .emoji-rain {
        position: fixed;
        top: -10vh;
        z-index: 9999;
        pointer-events: none;
        user-select: none;
    }
`;
document.head.appendChild(styleSheet);

function createFallingEmoji() {
    const emoji = document.createElement('div');
    emoji.classList.add('emoji-rain');
    
    const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
    emoji.innerText = randomEmoji;

    const duration = Math.random() * 3 + 2; 
    const size = Math.random() * 20 + 20; 
    const leftPos = Math.random() * 100; 

    emoji.style.left = leftPos + 'vw';
    emoji.style.fontSize = size + 'px';
    
    emoji.style.animation = `fall ${duration}s linear forwards`;
    document.body.appendChild(emoji);
    
    setTimeout(() => {
        emoji.remove();
    }, duration * 1000);
}

const overlay = document.getElementById('overlay');
const startBtn = document.getElementById('start-btn');
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const playBtnIcon = document.querySelector('#play-btn i');

if (startBtn && overlay) {
    startBtn.addEventListener('click', () => {
        // if(audio) {
        //     audio.play().then(() => {
        //         if(playBtnIcon) {
        //             playBtnIcon.classList.remove('fa-play');
        //             playBtnIcon.classList.add('fa-pause');
        //         }
        //     }).catch(e => console.log("Erro áudio:", e));
        // }

        overlay.classList.add('hidden');
        
        for(let i=0; i<20; i++) {
            setTimeout(createFallingEmoji, i * 100);
        }
    });
}

if(playBtn) {
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            // audio.play();
            playBtnIcon.classList.remove('fa-play');
            playBtnIcon.classList.add('fa-pause');
        } else {
            // audio.pause();
            playBtnIcon.classList.remove('fa-pause');
            playBtnIcon.classList.add('fa-play');
        }
    });
}

const photoSection = document.getElementById('secao-fotos');
let rainInterval;

if (photoSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!rainInterval) {
                    rainInterval = setInterval(createFallingEmoji, 300);
                }
            } else {
                if (rainInterval) {
                    clearInterval(rainInterval);
                    rainInterval = null;
                }
            }
        });
    }, { threshold: 0.1 });

    observer.observe(photoSection);
}


const musicPlayerContainer = document.querySelector('.music-player');

audio.addEventListener('play', () => {
    musicPlayerContainer.classList.add('playing');
    if(playBtnIcon) {
        playBtnIcon.classList.remove('fa-play');
        playBtnIcon.classList.add('fa-pause');
    }
});

audio.addEventListener('pause', () => {
    musicPlayerContainer.classList.remove('playing');
    if(playBtnIcon) {
        playBtnIcon.classList.remove('fa-pause');
        playBtnIcon.classList.add('fa-play');
    }
});