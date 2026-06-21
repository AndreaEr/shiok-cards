"use client"

import { useGameStore } from "@/stores/game-store"
import { LevelSelect } from "@/components/game/level-select"
import { GameBoard } from "@/components/game/game-board"

export default function Home() {
  const { status, setStatus, unlockedDishes, totalStars } = useGameStore()

  if (status === "level-select") {
    return <LevelSelect />
  }

  if (status === "playing" || status === "won") {
    return <GameBoard />
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-6 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-hawker-red mb-2 tracking-tight">
          Shiok Cards
        </h1>
        <p className="text-sm text-hawker-brown/70">
          SG Hawker Food Memory Game
        </p>
      </div>

      {/* Food emojis decoration */}
      <div className="text-4xl mb-8 flex gap-2 flex-wrap justify-center">
        🍗🍜🦀☕🍢🍧🫓🍤
      </div>

      {/* Stats */}
      <div className="flex gap-6 mb-8 text-center">
        <div>
          <p className="text-2xl font-bold text-hawker-gold">⭐ {totalStars}</p>
          <p className="text-xs text-hawker-brown/60">Stars</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-hawker-green">{unlockedDishes.length}/40</p>
          <p className="text-xs text-hawker-brown/60">Dishes Found</p>
        </div>
      </div>

      {/* Play button */}
      <button
        onClick={() => setStatus("level-select")}
        className="w-full max-w-xs bg-hawker-red text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-red-700 active:scale-[0.97] transition-all mb-3"
      >
        Play
      </button>

      {/* Secondary buttons */}
      <button
        onClick={() => setStatus("level-select")}
        className="w-full max-w-xs bg-white border-2 border-amber-200 text-hawker-brown py-3 rounded-2xl font-bold text-sm hover:border-hawker-gold transition-colors mb-3"
      >
        🥘 Makan Passport ({unlockedDishes.length}/40)
      </button>

      {/* Footer */}
      <p className="text-xs text-hawker-brown/40 mt-8">
        Made with shiok in Singapore
      </p>
    </div>
  )
}
