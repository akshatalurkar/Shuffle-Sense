import type { BinId, GenContext, Prompt } from '../types'

export interface Bin {
  id: BinId
  label: string
  hint: string
  generate(ctx: GenContext): Prompt
}

// Shared helper: pick a random archetype id present in the dataset.
export function pickArchetypeId(ctx: GenContext): string {
  return ctx.rng.pick(ctx.data.archetypes).archetype_id
}
