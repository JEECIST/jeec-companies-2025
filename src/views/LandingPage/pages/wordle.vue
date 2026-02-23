<template>
    <AppHeader></AppHeader>
    <h1 class="page-name">JEECdle</h1>

    <div class="wordle-page">
        <DuckPopUp v-if="showDuck" :duckState="duckMood" :points="received_points" @close="showDuck = false" />

        <!-- Loading State -->
        <!-- <div v-if="isLoading" class="loading">
      <p>Loading today's word...</p>
    </div> -->

        <!-- Already Played Message -->
        <!-- <div v-else-if="hasPlayedToday" class="already-played">
      <h2>Come back tomorrow!</h2>
      <p>You've already played today's Wordle.</p>
    </div> -->

        <!-- Game Content -->
        <div>
            <!-- Game Grid -->
            <div class="game-grid">
                <div v-for="(row, rowIndex) in gameGrid" :key="rowIndex" class="grid-row">
                    <div v-for="(cell, cellIndex) in row" :key="cellIndex" class="grid-cell" :class="{
                        'filled': cell.letter,
                        'correct': cell.status === 'correct',
                        'present': cell.status === 'present',
                        'absent': cell.status === 'absent',
                        'reveal': cell.revealing,
                        'bounce': cell.bouncing
                    }">
                        {{ cell.letter }}
                    </div>
                </div>
            </div>

            <!-- Keyboard -->
            <div class="keyboard" v-if="store.gameStatus == 'playing'">
                <div class="keyboard-row">
                    <button v-for="key in firstRow" :key="key" class="key" :class="getKeyClass(key)"
                        @click="handleKeyPress(key)">
                        {{ key }}
                    </button>
                </div>
                <div class="keyboard-row">
                    <button v-for="key in secondRow" :key="key" class="key" :class="getKeyClass(key)"
                        @click="handleKeyPress(key)">
                        {{ key }}
                    </button>
                </div>
                <div class="keyboard-row">
                    <button class="key special-key" @click="handleKeyPress('ENTER')">
                        ENTER
                    </button>
                    <button v-for="key in thirdRow" :key="key" class="key" :class="getKeyClass(key)"
                        @click="handleKeyPress(key)">
                        {{ key }}
                    </button>
                    <button class="key special-key" @click="handleKeyPress('BACKSPACE')">
                        ⌫
                    </button>
                </div>
            </div>
            <div class="controls" v-if="store.gameStatus != 'playing'">
                <button @click="replayGame">
                    Replay
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import { useWordleStore } from '@/stores/WordleStore'

import AppHeader from '../components/AppHeader.vue';
import DuckPopUp from '@/views/LandingPage/components/DuckPopUp.vue'

const showDuck = ref(false)
const received_points = ref(null)

const store = useWordleStore()

// Game configuration
const TARGET_WORD = ref('')
const WORD_ID = ref(null) // Store word ID for API call
const MAX_ATTEMPTS = 6
const WORD_LENGTH = 5
const isLoading = ref(true)
const hasPlayedToday = ref(false) // Track if user already played

const isRevealing = ref(false)

const gameGrid = computed(() => store.gameGrid)
const currentRow = computed({
    get: () => store.currentRow,
    set: (val) => { store.currentRow = val }
})
const currentCol = computed({
    get: () => store.currentCol,
    set: (val) => { store.currentCol = val }
})
const keyStates = computed(() => store.keyStates)
const gameStatus = computed(() => store.gameStatus)

// Keyboard layout
const firstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const secondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
const thirdRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

const duckMood = computed(() => {
    if (store.gameStatus === 'won') return 'happy'
    if (store.gameStatus === 'lost') return 'sad'
    return ''
})

async function replayGame() {
    store.resetState();
    window.addEventListener('keydown', handlePhysicalKeyPress)
    fetchWordOfDay();
}


const fetchWordOfDay = async () => {
    try {
        isLoading.value = true

        const restored = store.loadState()

        if (restored && store.targetWord) {

            TARGET_WORD.value = store.targetWord

            if (store.gameStatus !== 'playing') {
                hasPlayedToday.value = true

                showDuck.value = true
            }

            isLoading.value = false
            return
        }

        const response = await axios.get(
            `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/wordle-word-of-day`, {
            auth: {
                username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
                password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
            }
        }
        )

        if (response.data.has_played) {
            hasPlayedToday.value = true
            isLoading.value = false
            return
        }

        TARGET_WORD.value = response.data.word

        store.targetWord = TARGET_WORD.value
        store.dateStamp = new Date().toISOString().slice(0, 10)
        store.initGrid(MAX_ATTEMPTS, WORD_LENGTH)
        store.saveState()

        isLoading.value = false
    } catch (err) {
        console.error('Error fetching word:', err)
        if (err.response?.data?.has_played) {
            hasPlayedToday.value = true
        } else {
        }
        isLoading.value = false
    }
}

// Get current word being typed
const getCurrentWord = () => {
    return gameGrid.value[currentRow.value]
        .map(cell => cell.letter)
        .join('')
}

// Handle letter input
const addLetter = (letter) => {
    if (isRevealing.value || gameStatus.value !== 'playing' || isLoading.value || hasPlayedToday.value) return

    if (currentCol.value < WORD_LENGTH && currentRow.value < MAX_ATTEMPTS) {
        const cell = gameGrid.value[currentRow.value][currentCol.value]
        cell.letter = letter
        cell.bouncing = true

        setTimeout(() => {
            cell.bouncing = false
        }, 200)

        currentCol.value++
        store.saveState()
    }
}

// Handle backspace
const removeLetter = () => {
    if (isRevealing.value || gameStatus.value !== 'playing' || isLoading.value || hasPlayedToday.value) return

    if (currentCol.value > 0) {
        currentCol.value--
        gameGrid.value[currentRow.value][currentCol.value].letter = ''
    }

    store.saveState()
}

// Check word and provide feedback
const checkWord = async () => {
    if (isRevealing.value || gameStatus.value !== 'playing' || isLoading.value || hasPlayedToday.value) return

    const currentWord = getCurrentWord()

    if (currentWord.length !== WORD_LENGTH) {
        return
    }

    const row = gameGrid.value[currentRow.value]
    const targetLetters = TARGET_WORD.value.split('')
    const guessLetters = currentWord.split('')

    // First pass: mark correct letters
    const targetLetterCounts = {}
    for (let i = 0; i < WORD_LENGTH; i++) {
        const letter = targetLetters[i]
        targetLetterCounts[letter] = (targetLetterCounts[letter] || 0) + 1

        if (guessLetters[i] === letter) {
            targetLetterCounts[letter]--
        }
    }

    // Second pass: determine all statuses first
    const statuses = []
    const keyUpdates = []

    for (let i = 0; i < WORD_LENGTH; i++) {
        const letter = guessLetters[i]

        if (guessLetters[i] === targetLetters[i]) {
            statuses[i] = 'correct'
            keyUpdates.push({ letter, status: 'correct' })
        } else if (targetLetters.includes(letter) && targetLetterCounts[letter] > 0) {
            statuses[i] = 'present'
            targetLetterCounts[letter]--
            keyUpdates.push({ letter, status: 'present' })
        } else {
            statuses[i] = 'absent'
            keyUpdates.push({ letter, status: 'absent' })
        }
    }

    // Set revealing state to block input
    isRevealing.value = true

    // Apply reveal animation with staggered timing
    for (let i = 0; i < WORD_LENGTH; i++) {
        setTimeout(() => {
            row[i].revealing = true
            row[i].status = statuses[i]
            updateKeyState(keyUpdates[i].letter, keyUpdates[i].status)

            setTimeout(() => {
                row[i].revealing = false
            }, 600)
        }, i * 400)
    }

    // Check win/lose conditions after all animations complete
    setTimeout(async () => {
        isRevealing.value = false

        if (currentWord === TARGET_WORD.value) {
            store.gameStatus = 'won'
            // hasPlayedToday.value = true

            showDuck.value = true

            store.saveState()

            return
        }

        // Move to next row
        currentRow.value++
        currentCol.value = 0

        // Check lose condition
        if (currentRow.value >= MAX_ATTEMPTS) {
            store.gameStatus = 'lost'
            // hasPlayedToday.value = true

            showDuck.value = true

        }

        store.saveState()
    }, WORD_LENGTH * 400 + 100)
}

// Update keyboard key states
const updateKeyState = (letter, status) => {
    const currentState = store.keyStates[letter]

    if (currentState === 'correct') return
    if (currentState === 'present' && status === 'absent') return

    store.keyStates[letter] = status
    store.saveState()
}

// Get keyboard key class
const getKeyClass = (key) => {
    const state = keyStates.value[key]
    return {
        'key-correct': state === 'correct',
        'key-present': state === 'present',
        'key-absent': state === 'absent'
    }
}

// Handle key press
const handleKeyPress = (key) => {
    if (gameStatus.value !== 'playing' || isRevealing.value || hasPlayedToday.value) return

    if (key === 'ENTER') {
        checkWord()
    } else if (key === 'BACKSPACE') {
        removeLetter()
    } else if (key.length === 1 && /[A-Z]/.test(key)) {
        addLetter(key)
    }
}

// Handle physical keyboard input
const handlePhysicalKeyPress = (event) => {
    const key = event.key.toUpperCase()

    if (key === 'ENTER') {
        handleKeyPress('ENTER')
    } else if (key === 'BACKSPACE') {
        handleKeyPress('BACKSPACE')
    } else if (/^[A-Z]$/.test(key)) {
        handleKeyPress(key)
    }
}

onMounted(() => {
    window.addEventListener('keydown', handlePhysicalKeyPress)
    fetchWordOfDay()
})

onUnmounted(() => {
    window.removeEventListener('keydown', handlePhysicalKeyPress)
})
</script>

<style scoped>
.wordle-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    max-height: 100%;
    overflow: hidden;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    justify-content: center;
}

.page-name {
    color: white;
    text-align: center;
    font-size: 2rem;
    margin: 2rem 0;
    font-weight: bold;
    border-bottom: 2px solid transparent;
    border-image: linear-gradient(to right,
        rgba(39, 158, 255, 0) 0%, 
        rgba(39, 158, 255, 1) 20%,
        rgba(39, 158, 255, 1) 80%,
        rgba(39, 158, 255, 0) 100%
        ) 1; 
    border-image-slice: 1;
}

.already-played {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    color: #fff;
    text-align: center;
    padding: 2rem;
}

.already-played h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.already-played p {
    font-size: 1.2rem;
    color: #007acc;
}

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    font-size: 1.2rem;
    color: #fff;
}

.header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
}

.logo {
    display: flex;
    font-weight: bold;
    font-size: 1.5rem;
}

h1 {
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    color: white;
}

.game-grid {
    display: flex;
    flex-direction: column;
    gap: clamp(0.2rem, 0.8vh, 0.4rem);
    margin-bottom: clamp(0.5rem, 2vh, 1.5rem);
    margin-top: clamp(0.2rem, 1vh, 0.75rem);
    flex-shrink: 0;
}

.grid-row {
    display: flex;
    gap: clamp(0.3rem, 1.2vw, 0.5rem);
    justify-content: center;
}

.grid-cell {
    width: clamp(45px, 12vw, 70px);
    height: clamp(45px, 12vw, 70px);
    border: 2px solid #007acc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(1.1rem, 4vw, 1.5rem);
    font-weight: bold;
    background-color: #404040;
    color: white;
    transition: all 0.3s ease;
    border-radius: 4px;
}

.grid-cell.filled {
    background-color: #404040;
}

.grid-cell.reveal {
    animation: reveal 0.6s ease-in-out;
}

.grid-cell.bounce {
    animation: bounce 0.2s ease-in-out;
}

.grid-cell.correct {
    background-color: #6aaa64;
    border-color: #6aaa64;
}

.grid-cell.present {
    background-color: #c9b458;
    border-color: #c9b458;
}

.grid-cell.absent {
    background-color: #787c7e;
    border-color: #787c7e;
}

.keyboard {
    display: flex;
    flex-direction: column;
    gap: clamp(0.25rem, 0.8vh, 0.5rem);
    width: 100%;
    max-width: min(500px, 95vw);
    padding: 0 clamp(0.5rem, 2vw, 1rem);
    flex-shrink: 0;
}

.keyboard-row {
    display: flex;
    justify-content: center;
    gap: clamp(0.2rem, 0.8vw, 0.4rem);
}

.key {
    min-width: clamp(30px, 8vw, 50px);
    height: clamp(45px, 9vh, 62px);
    border: none;
    border-radius: 4px;
    background-color: rgba(39, 158, 255, 0.8);
    color: white;
    font-size: clamp(0.75rem, 3vw, 1.1rem);
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.5s;
    flex: 1;
    max-width: 50px;
}

.key:hover {
    background-color: rgba(32, 124, 199, 0.8);
}

.key:active {
    background-color: rgba(23, 88, 141, 0.8);
}

.special-key {
    min-width: clamp(60px, 13vw, 85px);
    font-size: clamp(0.7rem, 2.8vw, 0.95rem);
    flex: 1.5;
    max-width: 85px;
}

/* Keyboard key states */
.key-correct {
    background-color: #6aaa64 !important;
}

.key-present {
    background-color: #c9b458 !important;
}

.key-absent {
    background-color: #787c7e !important;
}

/* Responsive design */
@media (max-width: 480px) {
    .wordle-page {
        padding: clamp(0.25rem, 1vw, 0.5rem);
        gap: clamp(0.5rem, 2vh, 1rem);
    }

    .keyboard {
        padding: 0;
    }

    .keyboard-row {
        gap: clamp(0.25rem, 1vw, 0.4rem);
    }

    .key {
        min-width: clamp(24px, 7vw, 34px);
        height: clamp(38px, 9vh, 50px);
        font-size: clamp(0.65rem, 2.6vw, 0.85rem);
    }

    .special-key {
        min-width: clamp(42px, 10vw, 56px);
        font-size: clamp(0.55rem, 2vw, 0.75rem);
    }
}

@media (max-width: 320px) {
    .keyboard-row {
        gap: clamp(0.2rem, 0.8vw, 0.35rem);
    }

    .grid-cell {
        width: clamp(35px, 15vw, 40px);
        height: clamp(35px, 15vw, 40px);
        font-size: clamp(0.8rem, 4vw, 1rem);
    }

    .key {
        min-width: clamp(20px, 6.5vw, 28px);
        height: clamp(34px, 7.5vh, 42px);
        font-size: clamp(0.55rem, 2.2vw, 0.75rem);
    }

    .special-key {
        min-width: clamp(36px, 8.5vw, 48px);
        font-size: clamp(0.48rem, 1.9vw, 0.65rem);
    }
}

@media (min-width: 481px) and (max-width: 768px) {
    .grid-cell {
        width: clamp(50px, 10vw, 60px);
        height: clamp(50px, 10vw, 60px);
    }

    .key {
        min-width: clamp(40px, 8vw, 48px);
        height: clamp(50px, 10vh, 60px);
    }

    .special-key {
        min-width: clamp(62px, 12vw, 78px);
    }
}

@media (orientation: landscape) and (max-height: 600px) {
    .wordle-page {
        gap: clamp(0.5rem, 1vh, 1rem);
    }

    .game-grid {
        margin-bottom: clamp(0.5rem, 2vh, 1rem);
    }

    .grid-cell {
        width: clamp(40px, 8vw, 55px);
        height: clamp(40px, 8vw, 55px);
    }

    .key {
        height: clamp(35px, 7vh, 50px);
    }
}

@keyframes reveal {
    0% {
        transform: rotateX(0deg);
        background-color: #404040;
        border-color: #007acc;
    }

    50% {
        transform: rotateX(90deg);
        background-color: #404040;
        border-color: #007acc;
    }

    55% {
        transform: rotateX(90deg);
    }

    100% {
        transform: rotateX(0deg);
    }
}

@keyframes bounce {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.15);
    }
}

.controls {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
}

.controls button {
    background-color: beige;
    border: 2px solid #5a5a5a;
    border-radius: 20px;
    padding: 1.5vh;
    font-size: 0.9em;
    font-weight: 600;
    cursor: pointer;
    color: black;
}

.controls button:disabled {
    background-color: #efefef;
    border-color: #ccc;
    color: #999;
    cursor: not-allowed;
}

.controls button:not(:disabled):hover {
    background-color: beige;
    color: black;
}
</style>
