// Manages which bin is active, deals prompts, and keeps track of recent history.
import { useCallback, useRef, useState } from 'react'
import { dataset } from '../../data/dataset'
import { makeRng, type Rng } from '../../domain/rng'
import { generate } from '../../domain/generate'
import { binOrder } from '../../domain/bins'
import type { BinId, Prompt } from '../../domain/types'

export interface DeckApi {
  bin: BinId
  prompt: Prompt | null
  nextPrompt: Prompt | null
  order: BinId[]
  dealtCount: number
  recentPrompts: Prompt[]
  selectBin: (bin: BinId) => void
  deal: () => void
}

const FIRST_BIN: BinId = 'improve'

export function useDeck(seed?: number): DeckApi {
  // Create the RNG and pre-generate the first "next up" together so the deck
  // has something to preview before the first deal. Lazy init runs exactly once.
  const [{ rng, firstPrompt }] = useState<{ rng: Rng; firstPrompt: Prompt }>(() => {
    const seededRng = makeRng(seed ?? Date.now())
    const firstPrompt = generate({ data: dataset, rng: seededRng, lastSubject: undefined }, FIRST_BIN)
    return { rng: seededRng, firstPrompt }
  })

  const lastSubjectRef = useRef<string | undefined>(undefined)
  const nextPromptRef = useRef<Prompt | null>(firstPrompt)

  const [bin, setBin] = useState<BinId>(FIRST_BIN)
  const [prompt, setPrompt] = useState<Prompt | null>(null)
  const [nextPrompt, setNextPrompt] = useState<Prompt | null>(firstPrompt)
  const [dealtCount, setDealtCount] = useState(0)
  const [recentPrompts, setRecentPrompts] = useState<Prompt[]>([])

  const advance = useCallback(
    (target: BinId) => {
      const pre = nextPromptRef.current
      const current =
        pre && pre.bin === target
          ? pre
          : generate({ data: dataset, rng, lastSubject: lastSubjectRef.current }, target)

      lastSubjectRef.current = current.subject
      const upcoming = generate({ data: dataset, rng, lastSubject: current.subject }, target)

      nextPromptRef.current = upcoming
      setPrompt(current)
      setNextPrompt(upcoming)
      setDealtCount((c) => c + 1)
      setRecentPrompts((prev) => [current, ...prev].slice(0, 3))
    },
    [rng],
  )

  const selectBin = useCallback(
    (target: BinId) => {
      setBin(target)
      advance(target)
    },
    [advance],
  )

  const deal = useCallback(() => advance(bin), [bin, advance])

  return { bin, prompt, nextPrompt, order: binOrder, dealtCount, recentPrompts, selectBin, deal }
}
