document.addEventListener('DOMContentLoaded', function() {
    
    const bioBlocks = document.querySelectorAll('.bio-block');
    
    if (bioBlocks.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        bioBlocks.forEach(block => {
            observer.observe(block);
        });
        
        bioBlocks[0].classList.add('visible');
    }

    const audio = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const nowPlaying = document.getElementById('nowPlaying');
    const playlist = document.getElementById('playlist');
    
    if (playlist) {
        const songs = Array.from(document.querySelectorAll('.song-item'));
        let currentSongIndex = 0;
        
        function loadSong(index) {
            const song = songs[index];
            if (!song) return;
            
            const src = song.dataset.src;
            const name = song.dataset.name;
            const album = song.dataset.album;
            
            audio.src = src;
            nowPlaying.textContent = `${name} — ${album}`;
            
            songs.forEach(s => s.classList.remove('active'));
            song.classList.add('active');
            
            currentSongIndex = index;
        }
        
        function togglePlay() {    
            if (audio.paused) {
                audio.play();
                playBtn.textContent = '⏸ Pause';
            } else {
                audio.pause();
                playBtn.textContent = '▶ Play';
            }
        }
        
        function nextSong() {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            loadSong(currentSongIndex);
            audio.play();
            playBtn.textContent = '⏸ Pause';
        }
        
        function prevSong() {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            loadSong(currentSongIndex);
            audio.play();
            playBtn.textContent = '⏸ Pause';
        }
        
        function updateProgress(e) {
            const { duration, currentTime } = e.srcElement;
            const progressPercent = (currentTime / duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
            
            const currentMinutes = Math.floor(currentTime / 60);
            const currentSeconds = Math.floor(currentTime % 60);
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
            
            if (duration) {
                const durationMinutes = Math.floor(duration / 60);
                const durationSeconds = Math.floor(duration % 60);
                durationEl.textContent = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
            }
        }
        
        function setProgress(e) {
            const width = this.clientWidth;
            const clickX = e.offsetX;
            const duration = audio.duration;
            audio.currentTime = (clickX / width) * duration;
        }
        
        songs.forEach((song, index) => {
            song.addEventListener('click', () => {
                loadSong(index);
                audio.play();
                playBtn.textContent = '⏸ Pause';
            });
        
        });
        
        if (playBtn) {
            playBtn.addEventListener('click', togglePlay);
            prevBtn.addEventListener('click', prevSong);
            nextBtn.addEventListener('click', nextSong);
            audio.addEventListener('timeupdate', updateProgress);
            audio.addEventListener('ended', nextSong);
            audio.addEventListener('loadedmetadata', updateProgress);
            progressContainer.addEventListener('click', setProgress);
            
            loadSong(0);
        }
        
    }
    
    const galleryCards = document.querySelectorAll('.gallery-card');
    
    if (galleryCards.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-img" src="" alt="">
        `;
        document.body.appendChild(lightbox);
        
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        
        galleryCards.forEach(card => {
            card.addEventListener('click', () => {
                const img = card.querySelector('.gallery-img');
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
    }
    
});
if (window.location.pathname.includes('songs')) {
    (async function() {
        try {
            const response = await fetch('http://localhost:3000/api/songs');
            const songsFromDB = await response.json();
            console.log('📀 Песни из базы:', songsFromDB.length, 'шт.');
        } catch (err) {
            console.log('⚠️ База недоступна');
        }
    })();
}
function runAllTests() {
    const results = [];
    
    const cards = document.querySelectorAll('.nav-card, .section-card');
    results.push({
        name: 'TC-001: Навигационные карточки',
        passed: cards.length >= 3,
        details: `Найдено: ${cards.length}`
    });
    
    const hero = document.querySelector('.hero-name');
    results.push({
        name: 'TC-002: Hero заголовок',
        passed: hero !== null,
        details: hero ? 'Найден' : 'Отсутствует'
    });
    
    const images = document.querySelectorAll('img');
    const allAlt = Array.from(images).every(i => i.alt);
    results.push({
        name: 'TC-003: Атрибуты alt',
        passed: allAlt,
        details: `${images.length} изображений`
    });
    
    const player = document.getElementById('audioPlayer');
    const onSongsPage = window.location.pathname.includes('songs');
    results.push({
        name: 'TC-004: Аудиоплеер',
        passed: onSongsPage ? player !== null : true,
        details: onSongsPage ? (player ? 'Работает' : 'Отсутствует') : 'Не на странице песен'
    });
    
    const bioBlocks = document.querySelectorAll('.bio-block');
    const onBioPage = window.location.pathname.includes('biography');
    results.push({
        name: 'TC-005: Блоки биографии',
        passed: onBioPage ? bioBlocks.length >= 17 : true,
        details: onBioPage ? `Найдено блоков: ${bioBlocks.length}` : 'Не на странице биографии'
    });
    
    console.log(' ТЕСТИРОВАНИЕ САЙТА ');
    let passed = 0;
    results.forEach(r => {
        const status = r.passed ? '✅' : '❌';
        console.log(`${status} ${r.name}: ${r.details}`);
        if (r.passed) passed++;
    });
    console.log(`ИТОГО: ${passed}/${results.length}`);
    
    return results;
}


console.log('Тесты готовы. Введите runAllTests() для запуска.');

if (window.location.pathname.includes('songs')) {
    setTimeout(async () => {
        try {
            const response = await fetch('http://localhost:3000/api/songs');
            const songsFromDB = await response.json();
            
            if (songsFromDB.length > 0) {
                const playlist = document.getElementById('playlist');
                if (playlist) {
                    playlist.innerHTML = songsFromDB.map(song => {
                        const fileName = song.title.toLowerCase()
                            .replace(/[^a-z0-9]/g, '-')
                            .replace(/-+/g, '-')
                            .replace(/^-|-$/g, '');
                        
                        return `
                            <div class="song-item" data-src="../audio/${fileName}.mp3" 
                                 data-name="${song.title}" 
                                 data-album="${song.album_title} (${song.release_year})">
                                <div class="song-info">
                                    <span class="song-name">${song.title}</span>
                                    <span class="song-album">${song.album_title} · ${song.release_year}</span>
                                </div>
                                <span class="song-duration">${song.duration || '--:--'}</span>
                            </div>
                        `;
                    }).join('');
                    
                    console.log('📀 Плейлист обновлён из базы данных');
                    
                    const songs = Array.from(document.querySelectorAll('.song-item'));
                    
                    songs.forEach((song, index) => {
                        song.addEventListener('click', () => {
                            const audio = document.getElementById('audioPlayer');
                            const playBtn = document.getElementById('playBtn');
                            const nowPlaying = document.getElementById('nowPlaying');
                            
                            if (audio && song.dataset.src) {
                                audio.src = song.dataset.src;
                                nowPlaying.textContent = `${song.dataset.name} — ${song.dataset.album}`;
                                audio.play();
                                if (playBtn) playBtn.textContent = '⏸ Pause';
                                
                                songs.forEach(s => s.classList.remove('active'));
                                song.classList.add('active');
                            }
                        });
                    });
                }
            }
        } catch (err) {
            console.log('⚠️ База данных недоступна, оставляем локальные песни');
        }
    }, 500);
}