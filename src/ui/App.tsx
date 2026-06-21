// The root component that wires everything together and sets up the layout.
import { useCallback, useEffect, useRef, useState } from 'react'
import { BrandMark } from './components/BrandMark'
import { DeckTabs } from './components/DeckTabs'
import { StageGroup } from './components/StageGroup'
import { Console } from './components/Console'
import { SessionPanel } from './components/SessionPanel'
import { RecentPromptsPanel } from './components/RecentPromptsPanel'
import { HowToPlayPanel } from './components/HowToPlayPanel'
import { ShortcutsPanel } from './components/ShortcutsPanel'
import { NextUpPanel } from './components/NextUpPanel'
import { useDeck } from './hooks/useDeck'
import { useTimer } from './hooks/useTimer'
import { bins } from '../domain/bins'

export default function App() {
  const deck = useDeck()
  const timer = useTimer(15)
  const [dealKey, setDealKey] = useState(0)
  const [hintOpen, setHintOpen] = useState(false)
  const [sessionStart] = useState(() => Date.now())
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - sessionStart) / 1000))
    }, 1000)
    return () => clearInterval(id)
  }, [sessionStart])

  const deal = useCallback(() => {
    deck.deal()
    setHintOpen(false)
    setDealKey((k) => k + 1)
  }, [deck])

  const selectBin = useCallback(
    (id: typeof deck.bin) => {
      deck.selectBin(id)
      setHintOpen(false)
      setDealKey((k) => k + 1)
    },
    [deck],
  )

  const play = useCallback(() => {
    if (timer.state.phase === 'paused') timer.resume()
    else timer.start()
  }, [timer])

  const toggleHint = useCallback(() => setHintOpen((o) => !o), [])

  // Keep the latest handlers in a single ref so the keyboard listener can stay
  // registered once without going stale. The ref is only updated inside effects.
  const handlersRef = useRef({ deal, toggleHint, play, stop: timer.stop })
  useEffect(() => {
    handlersRef.current = { deal, toggleHint, play, stop: timer.stop }
  }, [deal, toggleHint, play, timer.stop])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      const { deal, toggleHint, play, stop } = handlersRef.current
      if (e.key === ' ') { e.preventDefault(); deal() }
      if (e.key === 'h' || e.key === 'H') { e.preventDefault(); toggleHint() }
      if (e.key === 'p' || e.key === 'P') { e.preventDefault(); play() }
      if (e.key === 's' || e.key === 'S') { e.preventDefault(); stop() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <main className="app">
      <div className="col-brand"><BrandMark /></div>
      <div className="col-tabs">
        <DeckTabs order={deck.order} active={deck.bin} onSelect={selectBin} />
      </div>

      <aside className="sidebar-left">
        <SessionPanel
          dealtCount={deck.dealtCount}
          elapsed={elapsed}
          binLabel={bins[deck.bin].label}
        />
        <RecentPromptsPanel prompts={deck.recentPrompts} />
      </aside>

      <div className="col-stage">
        <StageGroup
          prompt={deck.prompt}
          dealKey={dealKey}
          hintOpen={hintOpen}
          onToggleHint={toggleHint}
        />
        <Console
          timer={timer.state}
          minutes={timer.minutes}
          onDeal={deal}
          onStep={timer.step}
          onPlay={play}
          onPause={timer.pause}
          onStop={timer.stop}
        />
      </div>

      <aside className="sidebar-right">
        <HowToPlayPanel />
        <ShortcutsPanel />
        <NextUpPanel prompt={deck.nextPrompt} />
      </aside>
    </main>
  )
}
