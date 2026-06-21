import type { KeyboardEvent } from 'react'

interface HintCardProps {
  hint: string[]
  open: boolean
  onToggle: () => void
}

export function HintCard({ hint, open, onToggle }: HintCardProps) {
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onToggle()
    }
  }

  return (
    <div
      className={`hint-card${open ? ' open' : ''}`}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-label="Toggle hint"
      onClick={onToggle}
      onKeyDown={onKeyDown}
    >
      <div className="hint-body">
        {hint.length === 0 ? (
          <p className="hint-empty">no hints here :)</p>
        ) : (
          <ol className="hint-steps">
            {hint.map((step, i) => (
              <li key={i} className="hint-step">
                <span className="hint-num">{i + 1}</span>
                <span className="hint-step-text">{step}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
      <div className="hint-tab">
        <span className="hint-label">Hint</span>
      </div>
    </div>
  )
}
