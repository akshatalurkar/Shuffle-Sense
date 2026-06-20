import type { GenContext, Prompt } from '../types'
import {
  archetypeCompanies,
  archetypeSegments,
  compatibleFeatureForCompany,
} from '../selectors'
import { pickArchetypeId, type Bin } from './bin'

const LABEL = '01 Improve'
const HINT = 'CIRCLES'

// T1a: "Improve {feature} for {company}."
function variantA(ctx: GenContext, archetypeId: string): Prompt {
  const company = ctx.rng.pick(archetypeCompanies(ctx.data, archetypeId))
  const candidates = compatibleFeatureForCompany(ctx.data, company).filter(
    (f) => f.company_id === null || f.company_id === company.company_id,
  )
  const feature = ctx.rng.pick(candidates)
  return {
    bin: 'improve',
    label: LABEL,
    archetype: archetypeId,
    text: `Improve ${feature.feature_name} for ${company.company_name}.`,
    subject: company.company_name,
    hint: HINT,
  }
}

// T1b: "Improve {company} for {segment}."
function variantB(ctx: GenContext, archetypeId: string): Prompt {
  const company = ctx.rng.pick(archetypeCompanies(ctx.data, archetypeId))
  const segment = ctx.rng.pick(archetypeSegments(ctx.data, archetypeId))
  return {
    bin: 'improve',
    label: LABEL,
    archetype: archetypeId,
    text: `Improve ${company.company_name} for ${segment.segment_name}.`,
    subject: company.company_name,
    hint: HINT,
  }
}

export const improve: Bin = {
  id: 'improve',
  label: LABEL,
  hint: HINT,
  generate(ctx) {
    const archetypeId = pickArchetypeId(ctx)
    return ctx.rng.next() < 0.5
      ? variantA(ctx, archetypeId)
      : variantB(ctx, archetypeId)
  },
}
