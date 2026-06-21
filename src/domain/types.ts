// The core types used across the whole app: BinId, Prompt, and GenContext.
import type { Dataset } from '../data/schema'
import type { Rng } from './rng'

export type BinId = 'improve' | 'design' | 'measure' | 'grow' | 'diagnose'

export interface Prompt {
  bin: BinId
  label: string
  archetype: string
  text: string
  subject: string
  // The named framework that guides this bin's answer (e.g. 'CIRCLES').
  hint: string
  // The ordered steps of that framework, shown in the hint card.
  steps: string[]
}

export interface GenContext {
  data: Dataset
  rng: Rng
  lastSubject?: string
}
