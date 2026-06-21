// The shared Bin interface and a couple of small helpers all five bins use.
import type { BinId, GenContext, Prompt } from '../types'

export interface Bin {
  id: BinId
  label: string
  // The named framework that guides this bin (e.g. 'CIRCLES').
  hint: string
  // The ordered steps of that framework, shown in the hint card.
  steps: string[]
  generate(ctx: GenContext): Prompt
}

export function pickArchetype(ctx: GenContext): { id: string; name: string } {
  const a = ctx.rng.pick(ctx.data.archetypes)
  return { id: a.archetype_id, name: a.archetype_name }
}

// Uppercases the first character of a sentence, leaving the rest untouched so
// proper nouns and intentionally-cased entity names keep their casing.
export function capFirst(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s
}
