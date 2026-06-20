import type { GenContext, Prompt } from '../types'
import {
  archetypeCompanies,
  archetypeGenericProducts,
  archetypeSegments,
  compatibleFeatureForCompany,
} from '../selectors'
import { pickArchetypeId, type Bin } from './bin'

const LABEL = '02 Design'
const HINT = 'CIRCLES'

// T2a: "Design {generic_product} for {segment}."
function variantA(ctx: GenContext, archetypeId: string): Prompt {
  const product = ctx.rng.pick(archetypeGenericProducts(ctx.data, archetypeId))
  const segment = ctx.rng.pick(archetypeSegments(ctx.data, archetypeId))
  return {
    bin: 'design',
    label: LABEL,
    archetype: archetypeId,
    text: `Design ${product.generic_product} for ${segment.segment_name}.`,
    subject: product.generic_product,
    hint: HINT,
  }
}

// T2b: "Design {company}'s {feature} for {segment}."
function variantB(ctx: GenContext, archetypeId: string): Prompt {
  const company = ctx.rng.pick(archetypeCompanies(ctx.data, archetypeId))
  const feature = ctx.rng.pick(compatibleFeatureForCompany(ctx.data, company))
  const segment = ctx.rng.pick(archetypeSegments(ctx.data, archetypeId))
  return {
    bin: 'design',
    label: LABEL,
    archetype: archetypeId,
    text: `Design ${company.company_name}'s ${feature.feature_name} for ${segment.segment_name}.`,
    subject: company.company_name,
    hint: HINT,
  }
}

export const design: Bin = {
  id: 'design',
  label: LABEL,
  hint: HINT,
  generate(ctx) {
    const archetypeId = pickArchetypeId(ctx)
    return ctx.rng.next() < 0.5
      ? variantA(ctx, archetypeId)
      : variantB(ctx, archetypeId)
  },
}
