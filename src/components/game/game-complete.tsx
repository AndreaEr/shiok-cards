"use client"

import { useGameStore } from "@/stores/game-store"
import { levels } from "@/data/levels"
import { getRandomEncouragement, completionEncouragements } from "@/data/encouragements"
import { getDishById } from "@/data/dishes"

export function GameComplete() {
  const { currentLevelId, moves, elapsedTime, matchedPairs, levelResults, setStatus, startLevel } = useGameStore()

  const level = levels.find((l) => l.id === currentLevelId)
  if (!level) return null

  const result = levelResults[level.id]
  const stars = result?.stars ?? 1
  const encouragement = getRandomEncouragement(completionEncouragements)

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  const currentLevelIndex = levels.findIndex((l) => l.id === currentLevelId)
  const nextLevel = levels[currentLevelIndex + 1]

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-hawker-cream rounded-2xl p-6 max-w-sm w-full text-center animate-fade-in shadow-xl">
        {/* Stars */}
        <div className="text-4xl mb-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className={i < stars ? "opacity-100" : "opacity-20"}>
              ⭐
            </span>
          ))}
        </div>

        {/* Encouragement */}
        <p className="text-lg font-bold text-hawker-brown mb-4">{encouragement}</p>

        {/* Stats */}
        <div className="flex justify-center gap-6 text-sm text-hawker-brown/80 mb-6">
          <div>
            <p className="font-bold text-lg">{moves}</p>
            <p>moves</p>
          </div>
          <div>
            <p className="font-bold text-lg">{formatTime(elapsedTime)}</p>
            <p>time</p>
          </div>
        </div>

        {/* Dishes matched */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {matchedPairs.map((dishId) => {
            const dish = getDishById(dishId)
            return dish ? (
              <span key={dishId} className="text-2xl" title={dish.name}>
                {dish.emoji}
              </span>
            ) : null
          })}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => startLevel(level.id)}
            className="w-full bg-hawker-red text-white py-3 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors"
          >
            Play Again
          </button>
          {nextLevel && (
            <button
              onClick={() => startLevel(nextLevel.id)}
              className="w-full bg-hawker-gold text-white py-3 rounded-xl font-bold text-sm hover:bg-amber-600 transition-colors"
            >
              Next: {nextLevel.name}
            </button>
          )}
          <button
            onClick={() => setStatus("level-select")}
            className="w-full text-hawker-brown/60 py-2 text-sm font-medium"
          >
            Level Select
          </button>
        </div>
      </div>
    </div>
  )
}
