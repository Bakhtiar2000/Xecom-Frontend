"use client"

import { Star } from "lucide-react"

interface Props {
  rating: number
  editable?: boolean
  onChange?: (value: number) => void
}

export function StarRating({ rating, editable, onChange }: Props) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => editable && onChange?.(star)}
          className={`transition ${
            star <= rating ? "text-amber-500" : "text-muted-foreground"
          } ${editable && "hover:scale-110"}`}
        >
          <Star className="w-4 h-4 fill-current" />
        </button>
      ))}
    </div>
  )
}
