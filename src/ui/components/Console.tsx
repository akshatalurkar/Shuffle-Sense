import type { TimerState } from '../../session/timerMachine'

interface ConsoleProps {
  timer: TimerState
  minutes: number
  onDeal: () => void
  onStep: (delta: number) => void
  onPlay: () => void
  onPause: () => void
  onStop: () => void
}

// Formats seconds as MM:SS.
function clock(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

const RUNNING = new Set<TimerState['phase']>(['live', 'paused', 'time'])

export function Console({
  timer,
  minutes,
  onDeal,
  onStep,
  onPlay,
  onPause,
  onStop,
}: ConsoleProps) {
  const running = RUNNING.has(timer.phase)
  const danger = timer.phase === 'live' && timer.remainingSeconds <= 60
  const display = running ? clock(timer.remainingSeconds) : `${minutes} / min`
  const playing = timer.phase === 'live'

  return (
    <div className="console">
      <button type="button" className="btn btn-deal" onClick={onDeal}>
        Deal
      </button>

      <div className="stepper">
        <button
          type="button"
          className="step"
          aria-label="Decrease minutes"
          onClick={() => onStep(-1)}
          disabled={running}
        >
          −
        </button>
        <span className={`step-value${danger ? ' danger' : ''}`} aria-live="polite">
          {display}
        </span>
        <button
          type="button"
          className="step"
          aria-label="Increase minutes"
          onClick={() => onStep(1)}
          disabled={running}
        >
          +
        </button>
      </div>

      <div className="transport">
        <button
          type="button"
          className={`btn-icon${playing ? ' active' : ''}`}
          aria-label="Play"
          onClick={onPlay}
        >
          ▶
        </button>
        <button
          type="button"
          className="btn-icon"
          aria-label="Pause"
          onClick={onPause}
        >
          ⏸
        </button>
        <button
          type="button"
          className="btn-icon"
          aria-label="Stop"
          onClick={onStop}
        >
          ■
        </button>
      </div>
    </div>
  )
}
