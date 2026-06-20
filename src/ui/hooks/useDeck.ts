import { useCallback, useRef, useState } from 'react'
import { dataset } from '../../data/dataset'
import { makeRng, type Rng } from '../../domain/rng'
import { generate } from '../../domain/generate'
import { binOrder } from '../../domain/bins'
import type { BinId, Prompt } from '../../domain/types'

export interface DeckApi {
  bin: BinId
  prompt: Prompt | null
  order: BinId[]
  selectBin: (bin: BinId) => void
  deal: () => void
}

// Owns the seedable rng and current deck state; pure logic lives in domain/.
export function useDeck(seed = Date.now()): DeckApi {
  const rngRef = useRef<Rng>(makeRng(seed))
  const lastSubjectRef = useRef<string | undefined>(undefined)
  const [bin, setBin] = useState<BinId>('improve')
  const [prompt, setPrompt] = useState<Prompt | null>(null)

  const dealBin = useCallback((target: BinId) => {
    const next = generate(
      { data: dataset, rng: rngRef.current, lastSubject: lastSubjectRef.current },
      target,
    )
    lastSubjectRef.current = next.subject
    setPrompt(next)
  }, [])

  const selectBin = useCallback(
    (target: BinId) => {
      setBin(target)
      dealBin(target)
    },
    [dealBin],
  )

  const deal = useCallback(() => dealBin(bin), [bin, dealBin])

  return { bin, prompt, order: binOrder, selectBin, deal }
}
