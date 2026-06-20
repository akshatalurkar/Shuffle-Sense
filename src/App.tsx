import { useCallback, useState } from 'react'
import { BrandMark } from './ui/components/BrandMark'
import { DeckTabs } from './ui/components/DeckTabs'
import { StageGroup } from './ui/components/StageGroup'
import { Console } from './ui/components/Console'
import { Footer } from './ui/components/Footer'
import { useDeck } from './ui/hooks/useDeck'
import { useTimer } from './ui/hooks/useTimer'

export default function App() {
  const deck = useDeck()
  const timer = useTimer(15)
  const [dealKey, setDealKey] = useState(0)
  const [hintOpen, setHintOpen] = useState(false)

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

  return (
    <main className="app">
      <BrandMark />
      <DeckTabs order={deck.order} active={deck.bin} onSelect={selectBin} />
      <StageGroup
        prompt={deck.prompt}
        dealKey={dealKey}
        hintOpen={hintOpen}
        onToggleHint={() => setHintOpen((o) => !o)}
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
      <Footer />
    </main>
  )
}
