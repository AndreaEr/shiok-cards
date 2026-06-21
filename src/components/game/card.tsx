"use client"

import { cn } from "@/lib/utils"
import { getDishById } from "@/data/dishes"

interface CardProps {
  dishId: string
  isFlipped: boolean
  isMatched: boolean
  onClick: () => void
  disabled: boolean
}

export function Card({ dishId, isFlipped, isMatched, onClick, disabled }: CardProps) {
  const dish = getDishById(dishId)

  return (
    <div
      className={cn("card-container aspect-square cursor-pointer select-none", disabled && "pointer-events-none")}
      onClick={onClick}
    >
      <div className={cn("card-inner w-full h-full", (isFlipped || isMatched) && "flipped")}>
        {/* Back of card (face down) */}
        <div className="card-face bg-hawker-red border-2 border-red-800 shadow-md flex items-center justify-center">
          <div className="text-white text-2xl font-bold opacity-80">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="4" width="8" height="8" fill="white" opacity="0.3" />
              <rect x="12" y="4" width="8" height="8" fill="white" opacity="0.15" />
              <rect x="20" y="4" width="8" height="8" fill="white" opacity="0.3" />
              <rect x="4" y="12" width="8" height="8" fill="white" opacity="0.15" />
              <rect x="12" y="12" width="8" height="8" fill="white" opacity="0.3" />
              <rect x="20" y="12" width="8" height="8" fill="white" opacity="0.15" />
              <rect x="4" y="20" width="8" height="8" fill="white" opacity="0.3" />
              <rect x="12" y="20" width="8" height="8" fill="white" opacity="0.15" />
              <rect x="20" y="20" width="8" height="8" fill="white" opacity="0.3" />
            </svg>
          </div>
        </div>

        {/* Front of card (face up) */}
        <div
          className={cn(
            "card-face card-back bg-white border-2 border-amber-300 shadow-md flex flex-col items-center justify-center gap-1 p-1",
            isMatched && "card-matched border-hawker-green bg-green-50"
          )}
        >
          <span className="text-3xl">{dish?.emoji}</span>
          <span className="text-[8px] font-bold text-hawker-brown leading-tight text-center px-1">
            {dish?.name}
          </span>
        </div>
      </div>
    </div>
  )
}
