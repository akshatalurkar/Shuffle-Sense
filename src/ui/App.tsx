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

  // Stable refs so the keyboard listener never needs to re-register
  const dealRef = useRef(deal)
  const toggleHintRef = useRef(toggleHint)
  const playRef = useRef(play)
  const stopRef = useRef(timer.stop)
  dealRef.current = deal
  toggleHintRef.current = toggleHint
  playRef.current = play
  stopRef.current = timer.stop

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === ' ') { e.preventDefault(); dealRef.current() }
      if (e.key === 'h' || e.key === 'H') { e.preventDefault(); toggleHintRef.current() }
      if (e.key === 'p' || e.key === 'P') { e.preventDefault(); playRef.current() }
      if (e.key === 's' || e.key === 'S') { e.preventDefault(); stopRef.current() }
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
