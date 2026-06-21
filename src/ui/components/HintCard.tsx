// The card that slides out from behind the prompt when you want a hint.
import type { KeyboardEvent } from 'react'

interface HintCardProps {
  // The named framework that guides the answer (e.g. 'CIRCLES').
  framework?: string
  // The ordered steps of that framework.
  steps: string[]
  open: boolean
  onToggle: () => void
}

export function HintCard({ framework, steps, open, onToggle }: HintCardProps) {
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
        {steps.length === 0 ? (
          <p className="hint-empty">no hints here :)</p>
        ) : (
          <>
            {framework && <p className="hint-framework-label">{framework}</p>}
            <ol className="hint-steps">
              {steps.map((step, i) => (
                <li key={i} className="hint-step">
                  <span className="hint-num">{i + 1}</span>
                  <span className="hint-step-text">{step}</span>
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
      <div className="hint-tab">
        <span className="hint-label">Hint</span>
      </div>
    </div>
  )
}
