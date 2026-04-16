import { useState } from 'react'
import { io } from 'socket.io-client'
import Button from '@mui/material/Button'
import './App.css'

//const TOTALLY_SECURE_KEY: string = 'meow'
const PORT: number = 5555
const URL: string = 'http://localhost:' + String(PORT)
const PADDING: string = '25px'

function App() {

    const socket = io(URL, {
      path: '/socket.io/',
      transports: ['websocket'],
    })

    const [connected, setConnected] = useState(false)

    function onConnect() {
        setConnected(true)
        console.log('connected!')
    }

    function onDisconnect() {
        setConnected(false)
        console.log('disconnected!')
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('error', (err) => {
        console.log(err)
    })

    return (
<body>

    <!-- ── Navigation ── -->
    <nav class="site-nav">
        <a class="site-logo" href="#">Finch-Alive</a>
        <ul class="nav-links">
            <li><a href="about.html">About Us</a></li>
            <li><a href="download.html">Download</a></li>
        </ul>
    </nav>

    <!-- ── Who Is Finch-Alive? ── -->
    <section class="who-section">
        <div class="section-banner">Who Is Finch-Alive?</div>
        <div class="who-content">
            <img
                class="robot-image"
                src="https://www.birdbraintechnologies.com/wp-content/uploads/2023/10/finch-bos6.png"
                alt="Finch robot Kowalski"
            />
            <div class="who-text">
                <h2>Hey, I'm Kowalski</h2>
                <p>
                    I am a finch robot that follows and connects with instruction given code.
                    You can program me to Move, draw, light up and play music.
                    Pick an activity from down below to explore more of what I can do.
                </p>
            </div>
        </div>
    </section>

    <!-- ── Care For Finch-Alive ── -->
    <section class="care-section">
        <div class="section-banner">Care For Finch-Alive</div>

        <div class="care-intro-card">
            <img
                class="duck-image"
                src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f986.svg"
                alt="Finch duck mascot"
            />
            <div class="care-intro-text">
                <p>Finch-Alive Would Require A Lot Of Care And Attention.</p>
                <p class="challenge">Are You Down For The Challenge?</p>
            </div>
        </div>

        <div class="steps-grid">
            <!-- Step 1 -->
            <div class="step-row">
                <div class="step-card">
                    <p class="step-label">Step #1: Sleep Schedule</p>
                    <p class="step-description">
                        Much Like Many Of Us, There Is Sleep To Be Gained. Finch Alive Requires Sleep,
                        Which Is A Charging Period To Continue The Games And Many More Activities.
                    </p>
                </div>
                <div class="step-image-box">
                    <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f634.svg" alt="Sleeping face emoji" />
                </div>
            </div>

            <!-- Step 2 -->
            <div class="step-row">
                <div class="step-image-box">
                    <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f5fa.svg" alt="Map emoji" />
                </div>
                <div class="step-card">
                    <p class="step-label">Step #2: Space</p>
                    <p class="step-description">
                        To Play With Finch-Alive There Should Be A Flat And Clear Surface For Finch-Alive
                        To Roam On. Some Games Will Require A Drawing Surface.
                    </p>
                </div>
            </div>

            <!-- Step 3 -->
            <div class="step-row">
                <div class="step-card">
                    <p class="step-label">Step #3: Creativity</p>
                    <p class="step-description">
                        Explore The World Of Knowledge And Fun With Finch-Alive.
                        Don't Limit Yourself And Find New Things.
                    </p>
                </div>
                <div class="step-image-box">
                    <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3a8.svg" alt="Art palette emoji" />
                </div>
            </div>
        </div>
    </section>

    <!-- ── Playtime ── -->
    <section class="playtime-section">
        <div class="section-banner">Playtime</div>
        <div class="playtime-content">
            <svg class="wasd-image" viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" aria-label="WASD keys">
                <defs>
                    <filter id="key-shadow" x="-10%" y="-10%" width="120%" height="130%">
                        <feDropShadow dx="0" dy="3" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
                    </filter>
                </defs>
                <!-- W key (top center) -->
                <rect x="55" y="5" width="40" height="36" rx="6" fill="#e8e0ff" stroke="#6b5ce7" stroke-width="2" filter="url(#key-shadow)"/>
                <text x="75" y="28" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-weight="800" font-size="16" fill="#1a1a5e">W</text>
                <!-- A key (bottom left) -->
                <rect x="10" y="49" width="40" height="36" rx="6" fill="#e8e0ff" stroke="#6b5ce7" stroke-width="2" filter="url(#key-shadow)"/>
                <text x="30" y="72" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-weight="800" font-size="16" fill="#1a1a5e">A</text>
                <!-- S key (bottom center) -->
                <rect x="55" y="49" width="40" height="36" rx="6" fill="#e8e0ff" stroke="#6b5ce7" stroke-width="2" filter="url(#key-shadow)"/>
                <text x="75" y="72" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-weight="800" font-size="16" fill="#1a1a5e">S</text>
                <!-- D key (bottom right) -->
                <rect x="100" y="49" width="40" height="36" rx="6" fill="#e8e0ff" stroke="#6b5ce7" stroke-width="2" filter="url(#key-shadow)"/>
                <text x="120" y="72" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-weight="800" font-size="16" fill="#1a1a5e">D</text>
            </svg>
            <div class="playtime-instructions">
                <h3>Have Kowalski Walk Around</h3>
                <ul class="key-list">
                    <li><span class="key-highlight">W</span> to go forward</li>
                    <li><span class="key-highlight">D</span> to turn Right</li>
                    <li><span class="key-highlight">A</span> to turn left</li>
                    <li><span class="key-highlight">S</span> to go backwards</li>
                </ul>
            </div>
            <img
                class="steering-image"
                src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3ae.svg"
                alt="Steering wheel"
            />
        </div>
    </section>

    <!-- ── Musical Notes ── -->
    <section class="music-section">
        <div class="section-banner">Musical Notes</div>
        <div class="song-cards-row">
            <div class="song-card">
                <img
                    class="song-card-image"
                    src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2b50.svg"
                    alt="Twinkle Little Star"
                    style="object-fit:contain;background:#1a1a3e;padding:20px;"
                />
                <div class="song-card-body">
                    <p class="song-title">Twinkle Little Star</p>
                    <p class="song-description">Play the lullaby classic that is Twinkle Twinkle Little Star</p>
                    <button class="play-btn" onclick="playSong('t')">Click to Play &#8594;</button>
                </div>
            </div>
            <div class="song-card">
                <img
                    class="song-card-image"
                    src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/26f5.svg"
                    alt="Row Row Your Boat"
                    style="object-fit:contain;background:#c8e6f5;padding:20px;"
                />
                <div class="song-card-body">
                    <p class="song-title">Row Row Your Boat</p>
                    <p class="song-description">Gently down the stream will Kowalski play this tune.</p>
                    <button class="play-btn" onclick="playSong('q')">Click to Play &#8594;</button>
                </div>
            </div>
            <div class="song-card">
                <img
                    class="song-card-image"
                    src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f411.svg"
                    alt="Mary Had a Little Lamb"
                    style="object-fit:contain;background:#f5f0c8;padding:20px;"
                />
                <div class="song-card-body">
                    <p class="song-title">Mary Had a Little Lamb</p>
                    <p class="song-description">Have Kowalski help Mary find her lamb.</p>
                    <button class="play-btn" onclick="playSong('m')">Click to Play &#8594;</button>
                </div>
            </div>
        </div>

        <!-- ── Play Your Own Tune ── -->
        <div class="own-tune-section">
            <div class="own-tune-text">
                <h2>Play your own Tune</h2>
                <p>Press the numbers in what ever way you want to play a tune all on your own.</p>
            </div>
            <img
                class="pixel-art-image"
                src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3b6.svg"
                alt="Musical instruments pixel art"
            />
        </div>
    </section>

    <!-- ── Debug / Test Panel ── -->
    <div class="debug-panel">
        <h2>Robot Test Console</h2>
        <button class="run-btn" onclick="runScript('first_finch_test')">Run First Finch Test</button>
        <p class="output-label">Output:</p>
        <pre class="output-box" id="output">Status messages will appear here...</pre>
    </div>

    <!-- ── Scripts ── -->
        async function runScript(endpoint) {
            const outputEl = document.getElementById('output');
            outputEl.textContent = `Sending request to /${endpoint}...`;
            try {
                const res = await fetch(`/${endpoint}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                });
                const data = await res.json();
                outputEl.textContent = data.status === 'success'
                    ? 'Success: ' + data.output
                    : 'Error: ' + data.message;
            } catch (err) {
                outputEl.textContent = 'Network Error: ' + err.message;
            }
        }

        function playSong(key) {
            fetch('/api/songs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ song: key }),
            });
        }

        // Keyboard movement (WASD) and notes (1-9) and songs (q, t)
        document.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();

            if (['w', 'a', 's', 'd'].includes(key)) {
                fetch('/api/move', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ direction: key }),
                });
            }

            if (['1','2','3','4','5','6','7','8','9'].includes(key)) {
                fetch('/api/note', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ key }),
                });
            }

            if (['q', 't', 'm'].includes(key)) {
                playSong(key);
            }
        });

        document.addEventListener('keyup', (e) => {
            if (['w', 'a', 's', 'd'].includes(e.key.toLowerCase())) {
                fetch('/api/move', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ direction: 'stop' }),
                });
            }
        });
    
</body>

    )
}

export default App
