import type { GenContext, Prompt } from '../types'
import type { Metric } from '../../data/schema'
import {
  archetypeCompanies,
  compatibleFeatureForCompany,
  growableMetrics,
} from '../selectors'
import { pickArchetypeId, type Bin } from './bin'

const LABEL = '04 Grow'
const HINT = 'AARRR'

// Prefer AARRR-flagged metrics when any exist in the pool.
function preferAarrr(metrics: Metric[]): Metric[] {
  const aarrr = metrics.filter((m) => m.aarrr === 'Y')
  return aarrr.length > 0 ? aarrr : metrics
}

// T4a: "Grow {metric} for {company}."
function variantA(ctx: GenContext, archetypeId: string): Prompt {
  const company = ctx.rng.pick(archetypeCompanies(ctx.data, archetypeId))
  const pool = preferAarrr(growableMetrics(ctx.data, archetypeId, 'product'))
  const metric = ctx.rng.pick(pool)
  return {
    bin: 'grow',
    label: LABEL,
    archetype: archetypeId,
    text: `Grow ${metric.metric_name} for ${company.company_name}.`,
    subject: company.company_name,
    hint: HINT,
  }
}

// T4b: "Grow {metric} for {company}'s {feature}."
function variantB(ctx: GenContext, archetypeId: string): Prompt {
  const company = ctx.rng.pick(archetypeCompanies(ctx.data, archetypeId))
  const feature = ctx.rng.pick(compatibleFeatureForCompany(ctx.data, company))
  const metric = ctx.rng.pick(growableMetrics(ctx.data, archetypeId, 'feature'))
  return {
    bin: 'grow',
    label: LABEL,
    archetype: archetypeId,
    text: `Grow ${metric.metric_name} for ${company.company_name}'s ${feature.feature_name}.`,
    subject: company.company_name,
    hint: HINT,
  }
}

export const grow: Bin = {
  id: 'grow',
  label: LABEL,
  hint: HINT,
  generate(ctx) {
    const archetypeId = pickArchetypeId(ctx)
    return ctx.rng.next() < 0.5
      ? variantA(ctx, archetypeId)
      : variantB(ctx, archetypeId)
  },
}
