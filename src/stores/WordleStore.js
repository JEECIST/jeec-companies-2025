import { defineStore } from 'pinia'

export const useWordleStore = defineStore('wordle', {
  state: () => ({
    targetWord: '',
    gameGrid: [], 
    currentRow: 0,
    currentCol: 0,
    keyStates: {},
    gameStatus: 'playing', // 'playing', 'won', 'lost', 'finished'
    dateStamp: null, // store date to avoid replaying next day
  }),

  actions: {
    // Initialize empty grid with dynamic size
    initGrid(rows, cols) {
      this.gameGrid = Array(rows).fill().map(() =>
        Array(cols).fill().map(() => ({
          letter: '',
          status: '',
          revealing: false,
          bouncing: false
        }))
      )
      this.currentRow = 0
      this.currentCol = 0
      this.keyStates = {}
      this.gameStatus = 'playing'
      console.log('Grid initialized:', this.gameGrid)
    },

    saveState() {
      // Create a clean copy without animation states
      const stateToSave = {
        targetWord: this.targetWord,
        gameGrid: this.gameGrid.map(row => 
          row.map(cell => ({
            letter: cell.letter,
            status: cell.status
          }))
        ),
        currentRow: this.currentRow,
        currentCol: this.currentCol,
        keyStates: this.keyStates,
        gameStatus: this.gameStatus,
        dateStamp: this.dateStamp
      }
      localStorage.setItem('wordle-state', JSON.stringify(stateToSave))
    },

    loadState() {
      const saved = localStorage.getItem('wordle-state')
      if (!saved) {
        return false
      }

      const parsed = JSON.parse(saved)

      // Check if it's the same day's game
      const today = new Date().toISOString().slice(0, 10)
      if (parsed.dateStamp !== today) {
        return false
      }

      // Ensure animation properties exist on loaded cells
      if (parsed.gameGrid) {
        parsed.gameGrid = parsed.gameGrid.map(row => 
          row.map(cell => ({
            letter: cell.letter || '',
            status: cell.status || '',
            revealing: false,
            bouncing: false
          }))
        )
      }

      this.$patch(parsed)
      return true
    },

    resetState(){
      this.$reset();
      localStorage.removeItem("wordle-state");
    },
  }
})