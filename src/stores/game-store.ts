"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { dishes } from "@/data/dishes"
import { levels, type Level } from "@/data/levels"
import { shuffle } from "@/lib/shuffle"

export interface GameCard {
  index: number
  dishId: string
  isFlipped: boolean
  isMatched: boolean
}

interface LevelResult {
  stars: number
  bestMoves: number
}

interface GameState {
  status: "menu" | "level-select" | "playing" | "won"
  currentLevelId: string | null
  cards: GameCard[]
  flippedIndices: number[]
  matchedPairs: string[]
  moves: number
  startTime: number | null
  elapsedTime: number

  totalStars: number
  levelResults: Record<string, LevelResult>
  unlockedDishes: string[]

  toast: string | null

  startLevel: (levelId: string) => void
  flipCard: (index: number) => void
  setStatus: (status: GameState["status"]) => void
  setToast: (msg: string | null) => void
  tick: () => void
  reset: () => void
}

function createCards(level: Level): GameCard[] {
  const pool = level.dishPool.slice()
  const selected: string[] = []
  const shuffledPool = shuffle(pool)

  for (let i = 0; i < level.pairs && i < shuffledPool.length; i++) {
    selected.push(shuffledPool[i])
  }

  const cardDishes = [...selected, ...selected]
  const shuffled = shuffle(cardDishes)

  return shuffled.map((dishId, index) => ({
    index,
    dishId,
    isFlipped: false,
    isMatched: false,
  }))
}

function calculateStars(moves: number, thresholds: [number, number, number]): number {
  if (moves <= thresholds[0]) return 3
  if (moves <= thresholds[1]) return 2
  return 1
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      status: "menu",
      currentLevelId: null,
      cards: [],
      flippedIndices: [],
      matchedPairs: [],
      moves: 0,
      startTime: null,
      elapsedTime: 0,

      totalStars: 0,
      levelResults: {},
      unlockedDishes: [],

      toast: null,

      startLevel: (levelId: string) => {
        const level = levels.find((l) => l.id === levelId)
        if (!level) return

        set({
          status: "playing",
          currentLevelId: levelId,
          cards: createCards(level),
          flippedIndices: [],
          matchedPairs: [],
          moves: 0,
          startTime: Date.now(),
          elapsedTime: 0,
        })
      },

      flipCard: (index: number) => {
        const state = get()
        if (state.status !== "playing") return

        const card = state.cards[index]
        if (!card || card.isFlipped || card.isMatched) return
        if (state.flippedIndices.length >= 2) return

        const newCards = [...state.cards]
        newCards[index] = { ...newCards[index], isFlipped: true }
        const newFlipped = [...state.flippedIndices, index]

        if (newFlipped.length === 2) {
          const first = newCards[newFlipped[0]]
          const second = newCards[newFlipped[1]]
          const newMoves = state.moves + 1

          if (first.dishId === second.dishId) {
            newCards[newFlipped[0]] = { ...first, isMatched: true }
            newCards[newFlipped[1]] = { ...second, isMatched: true }
            const newMatchedPairs = [...state.matchedPairs, first.dishId]

            const newUnlocked = state.unlockedDishes.includes(first.dishId)
              ? state.unlockedDishes
              : [...state.unlockedDishes, first.dishId]

            const level = levels.find((l) => l.id === state.currentLevelId)
            const allMatched = level ? newMatchedPairs.length === level.pairs : false

            if (allMatched && level) {
              const stars = calculateStars(newMoves, level.starThresholds)
              const existingResult = state.levelResults[level.id]
              const bestStars = existingResult ? Math.max(existingResult.stars, stars) : stars
              const bestMoves = existingResult ? Math.min(existingResult.bestMoves, newMoves) : newMoves

              const oldTotalStars = Object.values(state.levelResults).reduce((sum, r) => sum + r.stars, 0)
              const newLevelResults = {
                ...state.levelResults,
                [level.id]: { stars: bestStars, bestMoves },
              }
              const newTotalStars = Object.values(newLevelResults).reduce((sum, r) => sum + r.stars, 0)

              set({
                cards: newCards,
                flippedIndices: [],
                matchedPairs: newMatchedPairs,
                moves: newMoves,
                status: "won",
                unlockedDishes: newUnlocked,
                levelResults: newLevelResults,
                totalStars: newTotalStars,
              })
            } else {
              set({
                cards: newCards,
                flippedIndices: [],
                matchedPairs: newMatchedPairs,
                moves: newMoves,
                unlockedDishes: newUnlocked,
              })
            }
          } else {
            set({
              cards: newCards,
              flippedIndices: newFlipped,
              moves: newMoves,
            })

            setTimeout(() => {
              const s = get()
              const resetCards = [...s.cards]
              resetCards[newFlipped[0]] = { ...resetCards[newFlipped[0]], isFlipped: false }
              resetCards[newFlipped[1]] = { ...resetCards[newFlipped[1]], isFlipped: false }
              set({ cards: resetCards, flippedIndices: [] })
            }, 800)
          }
        } else {
          set({ cards: newCards, flippedIndices: newFlipped })
        }
      },

      setStatus: (status) => set({ status }),
      setToast: (toast) => set({ toast }),

      tick: () => {
        const state = get()
        if (state.status === "playing" && state.startTime) {
          set({ elapsedTime: Math.floor((Date.now() - state.startTime) / 1000) })
        }
      },

      reset: () => {
        set({
          status: "menu",
          currentLevelId: null,
          cards: [],
          flippedIndices: [],
          matchedPairs: [],
          moves: 0,
          startTime: null,
          elapsedTime: 0,
          totalStars: 0,
          levelResults: {},
          unlockedDishes: [],
          toast: null,
        })
      },
    }),
    {
      name: "shiok-cards-progress",
      partialize: (state) => ({
        totalStars: state.totalStars,
        levelResults: state.levelResults,
        unlockedDishes: state.unlockedDishes,
      }),
    }
  )
)
