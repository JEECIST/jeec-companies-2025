import { defineStore } from 'pinia'

const STORAGE_KEY = 'connections-store-v1'

// Lisbon day stamp in YYYY-MM-DD
function lisbonDayStamp(date = new Date()) {
  // Use Intl to format in Europe/Lisbon reliably (handles DST etc.)
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Lisbon',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)

  const yyyy = parts.find((p) => p.type === 'year')?.value
  const mm = parts.find((p) => p.type === 'month')?.value
  const dd = parts.find((p) => p.type === 'day')?.value
  return `${yyyy}-${mm}-${dd}`
}

const isValidSavedState = (saved) => {
  // Must have puzzleGroups with 4 groups and 16 words total (or whatever your rules are)
  if (!saved || typeof saved !== 'object') return false
  if (!saved.puzzleGroups || typeof saved.puzzleGroups !== 'object') return false

  const groups = Object.values(saved.puzzleGroups)
  if (groups.length !== 4) return false

  const allWords = groups.flatMap((g) => (Array.isArray(g.words) ? g.words : []))
  if (allWords.length !== 16) return false
  if (allWords.some((w) => typeof w !== 'string' || !w.trim())) return false

  // wordsInPlay should have "text"
  if (!Array.isArray(saved.wordsInPlay)) return false
  if (saved.wordsInPlay.some((w) => typeof w?.text !== 'string')) return false

  return true
}

export const useConnectionsStore = defineStore('connections', {
  state: () => ({
    devOverrideDayStamp: null,
    dateStamp: null,
    puzzleDateStamp: null,

    puzzleGroups: null,

    foundGroups: [],
    wordsInPlay: [],
    tries: 4,
    gameStatus: 'playing',
  }),

  actions: {
    today() {
      if (this.devOverrideDayStamp) return this.devOverrideDayStamp
      return lisbonDayStamp()
    },

    hydrate() {
      const raw = localStorage.getItem(STORAGE_KEY)
      const today = this.today()

      if (!raw) {
        this.resetForNewDay(today)
        return
      }

      try {
        const saved = JSON.parse(raw)
        console.log('Hydrating store from saved state', saved)
        // If day changed, wipe everything (new puzzle+progress)
        if (saved?.dateStamp !== today || !isValidSavedState(saved)) {
          this.resetForNewDay(today)
          return
        }

        // Restore whole store snapshot
        this.$patch({
          dateStamp: saved.dateStamp ?? today,
          puzzleDateStamp: saved.puzzleDateStamp ?? saved.dateStamp ?? today,
          puzzleGroups: saved.puzzleGroups ?? null,
          foundGroups: saved.foundGroups ?? [],
          wordsInPlay: saved.wordsInPlay ?? [],
          tries: typeof saved.tries === 'number' ? saved.tries : 4,
          gameStatus: saved.gameStatus ?? 'playing',
        })
      } catch {
        this.resetForNewDay(today)
      }
    },

    resetgame(){
      this.$reset();
      localStorage.removeItem(STORAGE_KEY);
    },

    resetForNewDay(dayStamp = this.today()) {
      this.dateStamp = dayStamp
      this.puzzleDateStamp = null
      this.puzzleGroups = null
      this.foundGroups = []
      this.wordsInPlay = []
      this.tries = 4
      this.gameStatus = 'playing'
    },

    setPuzzle(groups, dayStamp = this.today()) {
      this.puzzleGroups = groups
      this.puzzleDateStamp = dayStamp
    },

    startNewGameFromPuzzle(shuffleFn) {
      if (!this.puzzleGroups) return

      this.foundGroups = []
      this.tries = 4
      this.gameStatus = 'playing'

      const allWords = []
      for (const groupId in this.puzzleGroups) {
        const group = this.puzzleGroups[groupId]
        group.words.forEach((wordText) => {
          allWords.push({
            text: wordText,
            group: groupId,
            selected: false,
          })
        })
      }

      this.wordsInPlay = shuffleFn ? shuffleFn(allWords) : allWords
    },

    setSelected(wordText, selected) {
      const w = this.wordsInPlay.find((x) => x.text === wordText)
      if (w) w.selected = selected
    },

    deselectAll() {
      this.wordsInPlay.forEach((w) => (w.selected = false))
    },
  },
})
