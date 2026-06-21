"use client"

import { useEffect } from "react"
import { useGameStore } from "@/stores/game-store"
import { levels } from "@/data/levels"
import { Card } from "./card"
import { GameComplete } from "./game-complete"
import { getRandomEncouragement, matchEncouragements } from "@/data/encouragements"

export function GameBoard() {
  const {
    status,
    currentLevelId,
    cards,
    flippedIndices,
    moves,
    elapsedTime,
    matchedPairs,
    toast,
    flipCard,
    setStatus,
    setToast,
    tick,
  } = useGameStore()

  const level = levels.find((l) => l.id === currentLevelId)

  useEffect(() => {
    if (status !== "playing") return
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [status, tick])

  useEffect(() => {
    if (matchedPairs.length > 0 && status === "playing") {
      const msg = getRandomEncouragement(matchEncouragements)
      setToast(msg)
      const timeout = setTimeout(() => setToast(null), 1500)
      return () => clearTimeout(timeout)
    }
  }, [matchedPairs.length])

  if (!level) return null

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex flex-col h-full px-4 py-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setStatus("level-select")}
          className="text-sm text-hawker-red font-bold"
        >
          &larr; Back
        </button>
        <div className="text-center">
          <p className="text-xs text-hawker-brown/70 font-medium">{level.name}</p>
        </div>
        <div className="text-right text-xs text-hawker-brown/70">
          {formatTime(elapsedTime)}
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex justify-center gap-6 mb-4 text-sm font-bold text-hawker-brown">
        <span>Moves: {moves}</span>
        <span>Pairs: {matchedPairs.length}/{level.pairs}</span>
      </div>

      {/* Toast */}
      {toast && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-hawker-brown text-white px-4 py-2 rounded-full text-sm font-bold animate-fade-in z-50">
          {toast}
        </div>
      )}

      {/* Card Grid */}
      <div
        className="grid gap-2 flex-1 place-content-center"
        style={{
          gridTemplateColumns: `repeat(${level.cols}, minmax(0, 1fr))`,
          maxWidth: `${level.cols * 80}px`,
          margin: "0 auto",
        }}
      >
        {cards.map((card) => (
          <Card
            key={card.index}
            dishId={card.dishId}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            disabled={flippedIndices.length >= 2 || card.isFlipped || card.isMatched}
            onClick={() => flipCard(card.index)}
          />
        ))}
      </div>

      {/* Win overlay */}
      {status === "won" && <GameComplete />}
    </div>
  )
}
