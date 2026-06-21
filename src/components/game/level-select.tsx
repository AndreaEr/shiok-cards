"use client"

import { useGameStore } from "@/stores/game-store"
import { levels } from "@/data/levels"
import { cn } from "@/lib/utils"

export function LevelSelect() {
  const { totalStars, levelResults, startLevel, setStatus } = useGameStore()

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setStatus("menu")}
          className="text-sm text-hawker-red font-bold"
        >
          &larr; Home
        </button>
        <div className="flex items-center gap-1 text-sm font-bold text-hawker-gold">
          <span>⭐</span>
          <span>{totalStars}</span>
        </div>
      </div>

      <h2 className="text-center font-bold text-lg text-hawker-brown mb-6">
        Choose Hawker Centre
      </h2>

      <div className="grid grid-cols-1 gap-3">
        {levels.map((level) => {
          const isUnlocked = totalStars >= level.unlockStars
          const result = levelResults[level.id]

          return (
            <button
              key={level.id}
              onClick={() => isUnlocked && startLevel(level.id)}
              disabled={!isUnlocked}
              className={cn(
                "w-full p-4 rounded-xl border-2 text-left transition-all",
                isUnlocked
                  ? "bg-white border-amber-200 hover:border-hawker-red hover:shadow-md active:scale-[0.98]"
                  : "bg-gray-100 border-gray-200 opacity-50 cursor-not-allowed"
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-hawker-brown text-sm">{level.name}</p>
                  <p className="text-xs text-hawker-brown/60 mt-0.5">
                    {level.cols}x{level.rows} grid &middot; {level.pairs} pairs
                  </p>
                </div>
                <div className="text-right">
                  {isUnlocked ? (
                    result ? (
                      <div className="text-sm">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <span key={i} className={i < result.stars ? "opacity-100" : "opacity-20"}>
                            ⭐
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-hawker-brown/40">New!</span>
                    )
                  ) : (
                    <span className="text-xs text-gray-400">🔒 {level.unlockStars}⭐</span>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
