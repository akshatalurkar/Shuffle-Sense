import type { KeyboardEvent } from 'react'

interface HintCardProps {
  hint: string
  open: boolean
  onToggle: () => void
}

// Slides out from behind the hero; transform/opacity only.
export function HintCard({ hint, open, onToggle }: HintCardProps) {
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onToggle()
    }
  }

  return (
    <div
      className="hint-card"
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-label="Toggle hint"
      onClick={onToggle}
      onKeyDown={onKeyDown}
    >
      <span className="pill pill-hint">Hint</span>
      <p className="hint-text">{hint}</p>
    </div>
  )
}
