import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

import './App.css'

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
    const handleError = (err: any) => {
        console.error(err)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('error', (err) => {
    console.log(err)
        })

        // return () => {
        //     socket.off('connect', handleConnect)
        //     socket.off('disconnect', handleDisconnect)
        //     socket.off('error', handleError)
        //     socket.disconnect()
        // }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase()

            if (['w', 'a', 's', 'd'].includes(key)) {
                fetch('/api/move', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ direction: key }),
                })
            }

            if (['1','2','3','4','5','6','7','8','9'].includes(key)) {
                fetch('/api/note', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ key }),
                })
            }

            if (['q', 't', 'm'].includes(key)) {
                playSong(key)
            }
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            if (['w', 'a', 's', 'd'].includes(e.key.toLowerCase())) {
                fetch('/api/move', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ direction: 'stop' }),
                })
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    async function runScript(endpoint: string) {
        const outputEl = document.getElementById('output')
        if (!outputEl) return

        outputEl.textContent = `Sending request to /${endpoint}...`
        try {
            const res = await fetch(`/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })
            const data = await res.json()
            outputEl.textContent = data.status === 'success'
                ? 'Success: ' + data.output
                : 'Error: ' + data.message
        } catch (err: any) {
            outputEl.textContent = 'Network Error: ' + err.message
        }
    }

    function playSong(key: string) {
        fetch('/api/songs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ song: key }),
        })
    }

    return (
        <div>
            {/* ── Navigation ── */}
            <nav className="site-nav">
                <a className="site-logo" href="#">Finch-Alive</a>
                <ul className="nav-links">
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="download.html">Download</a></li>
                </ul>
            </nav>
            <div className="connection-status">Socket status: {connected ? 'Connected' : 'Disconnected'}</div>

            {/* ── Who Is Finch-Alive? ── */}
            <section className="who-section">
                <div className="section-banner">Who Is Finch-Alive?</div>
                <div className="who-content">
                    <img
                        className="robot-image"
                        src="https://www.birdbraintechnologies.com/wp-content/uploads/2023/10/finch-bos6.png"
                        alt="Finch robot Kowalski"
                    />
                    <div className="who-text">
                        <h2>Hey, I'm Kowalski</h2>
                        <p>
                            I am a finch robot that follows and connects with instruction given code.
                            You can program me to Move, draw, light up and play music.
                            Pick an activity from down below to explore more of what I can do.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Care For Finch-Alive ── */}
            <section className="care-section">
                <div className="section-banner">Care For Finch-Alive</div>

                <div className="care-intro-card">
                    <img
                        className="duck-image"
                        src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f986.svg"
                        alt="Finch duck mascot"
                    />
                    <div className="care-intro-text">
                        <p>Finch-Alive Would Require A Lot Of Care And Attention.</p>
                        <p className="challenge">Are You Down For The Challenge?</p>
                    </div>
                </div>

                <div className="steps-grid">
                    {/* Step 1 */}
                    <div className="step-row">
                        <div className="step-card">
                            <p className="step-label">Step #1: Sleep Schedule</p>
                            <p className="step-description">
                                Much Like Many Of Us, There Is Sleep To Be Gained. Finch Alive Requires Sleep,
                                Which Is A Charging Period To Continue The Games And Many More Activities.
                            </p>
                        </div>
                        <div className="step-image-box">
                            <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f634.svg" alt="Sleeping face emoji" />
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="step-row">
                        <div className="step-image-box">
                            <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f5fa.svg" alt="Map emoji" />
                        </div>
                        <div className="step-card">
                            <p className="step-label">Step #2: Space</p>
                            <p className="step-description">
                                To Play With Finch-Alive There Should Be A Flat And Clear Surface For Finch-Alive
                                To Roam On. Some Games Will Require A Drawing Surface.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="step-row">
                        <div className="step-card">
                            <p className="step-label">Step #3: Creativity</p>
                            <p className="step-description">
                                Explore The World Of Knowledge And Fun With Finch-Alive.
                                Don't Limit Yourself And Find New Things.
                            </p>
                        </div>
                        <div className="step-image-box">
                            <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3a8.svg" alt="Art palette emoji" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Playtime ── */}
            <section className="playtime-section">
                <div className="section-banner">Playtime</div>
                <div className="playtime-content">
                    <svg className="wasd-image" viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" aria-label="WASD keys">
                        <defs>
                            <filter id="key-shadow" x="-10%" y="-10%" width="120%" height="130%">
                                <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
                            </filter>
                        </defs>
                        <rect x="55" y="5" width="40" height="36" rx="6" fill="#e8e0ff" stroke="#6b5ce7" strokeWidth="2" filter="url(#key-shadow)" />
                        <text x="75" y="28" textAnchor="middle" fontFamily="Segoe UI,Arial,sans-serif" fontWeight="800" fontSize="16" fill="#1a1a5e">W</text>
                        <rect x="10" y="49" width="40" height="36" rx="6" fill="#e8e0ff" stroke="#6b5ce7" strokeWidth="2" filter="url(#key-shadow)" />
                        <text x="30" y="72" textAnchor="middle" fontFamily="Segoe UI,Arial,sans-serif" fontWeight="800" fontSize="16" fill="#1a1a5e">A</text>
                        <rect x="55" y="49" width="40" height="36" rx="6" fill="#e8e0ff" stroke="#6b5ce7" strokeWidth="2" filter="url(#key-shadow)" />
                        <text x="75" y="72" textAnchor="middle" fontFamily="Segoe UI,Arial,sans-serif" fontWeight="800" fontSize="16" fill="#1a1a5e">S</text>
                        <rect x="100" y="49" width="40" height="36" rx="6" fill="#e8e0ff" stroke="#6b5ce7" strokeWidth="2" filter="url(#key-shadow)" />
                        <text x="120" y="72" textAnchor="middle" fontFamily="Segoe UI,Arial,sans-serif" fontWeight="800" fontSize="16" fill="#1a1a5e">D</text>
                    </svg>
                    <div className="playtime-instructions">
                        <h3>Have Kowalski Walk Around</h3>
                        <ul className="key-list">
                            <li><span className="key-highlight">W</span> to go forward</li>
                            <li><span className="key-highlight">D</span> to turn Right</li>
                            <li><span className="key-highlight">A</span> to turn left</li>
                            <li><span className="key-highlight">S</span> to go backwards</li>
                        </ul>
                    </div>
                    <img
                        className="steering-image"
                        src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3ae.svg"
                        alt="Steering wheel"
                    />
                </div>
            </section>

            {/* ── Musical Notes ── */}
            <section className="music-section">
                <div className="section-banner">Musical Notes</div>
                <div className="song-cards-row">
                    <div className="song-card">
                        <img
                            className="song-card-image"
                            src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2b50.svg"
                            alt="Twinkle Little Star"
                            style={{ objectFit: 'contain', background: '#1a1a3e', padding: '20px' }}
                        />
                        <div className="song-card-body">
                            <p className="song-title">Twinkle Little Star</p>
                            <p className="song-description">Play the lullaby classic that is Twinkle Twinkle Little Star</p>
                            <button className="playTwinkle-btn" onClick={() => playSong('t')}>Play Twinkle Twinkle &#8594;</button>
                        </div>
                    </div>
                    <div className="song-card">
                        <img
                            className="song-card-image"
                            src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/26f5.svg"
                            alt="Row Row Your Boat"
                            style={{ objectFit: 'contain', background: '#c8e6f5', padding: '20px' }}
                        />
                        <div className="song-card-body">
                            <p className="song-title">Row Row Your Boat</p>
                            <p className="song-description">Gently down the stream will Kowalski play this tune.</p>
                            <button className="playRow-btn" onClick={() => playSong('q')}>Play Row Your Boat &#8594;</button>
                        </div>
                    </div>
                    <div className="song-card">
                        <img
                            className="song-card-image"
                            src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f411.svg"
                            alt="Mary Had a Little Lamb"
                            style={{ objectFit: 'contain', background: '#f5f0c8', padding: '20px' }}
                        />
                        <div className="song-card-body">
                            <p className="song-title">Mary Had a Little Lamb</p>
                            <p className="song-description">Have Kowalski help Mary find her lamb.</p>
                            <button className="playMary-btn" onClick={() => playSong('m')}>Play Mary Little Lamb &#8594;</button>
                        </div>
                    </div>
                </div>

                {/* ── Play Your Own Tune ── */}
                <div className="own-tune-section">
                    <div className="own-tune-text">
                        <h2>Play your own Tune</h2>
                        <p>Press the numbers in what ever way you want to play a tune all on your own.</p>
                    </div>
                    <img
                        className="pixel-art-image"
                        src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3b6.svg"
                        alt="Musical instruments pixel art"
                    />
                </div>
            </section>

            {/* ── Debug / Test Panel ── */}
            <div className="debug-panel">
                <h2>Robot Test Console</h2>
                <button className="run-btn" onClick={() => runScript('first_finch_test')}>Run First Finch Test</button>
                <p className="output-label">Output:</p>
                <pre className="output-box" id="output">Status messages will appear here...</pre>
            </div>
        </div>
    )
}

export default App
