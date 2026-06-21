// Shows how many cards you've dealt, how long you've been practicing, and which bin is active.
interface SessionPanelProps {
  dealtCount: number
  elapsed: number
  binLabel: string
}

function formatElapsed(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const h = Math.floor(m / 60)
  if (h > 0) return `${h}h ${m % 60}m`
  return `${m}m`
}

export function SessionPanel({ dealtCount, elapsed, binLabel }: SessionPanelProps) {
  return (
    <div className="panel">
      <div className="panel-title">Session</div>
      <div className="session-stats">
        <div className="session-stat">
          <div className="stat-label">Dealt</div>
          <div className="stat-value">{dealtCount}</div>
        </div>
        <div className="session-stat">
          <div className="stat-label">Elapsed</div>
          <div className="stat-value">{formatElapsed(elapsed)}</div>
        </div>
        <div className="session-stat">
          <div className="stat-label">Category</div>
          <div className="stat-value stat-value--sm">{binLabel}</div>
        </div>
      </div>
    </div>
  )
}
