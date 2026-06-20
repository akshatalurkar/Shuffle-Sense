import type { Bin } from './bin'
import { pickArchetypeId } from './bin'
import { archetypeCompanies, compatibleFeatureForCompany } from '../selectors'

const LABEL = '03 Measure'
const HINT = 'Goal → Signal → Metric'

// "Define the success metrics for {feature} on {company}."
export const measure: Bin = {
  id: 'measure',
  label: LABEL,
  hint: HINT,
  generate(ctx) {
    const archetypeId = pickArchetypeId(ctx)
    const company = ctx.rng.pick(archetypeCompanies(ctx.data, archetypeId))
    const feature = ctx.rng.pick(compatibleFeatureForCompany(ctx.data, company))
    return {
      bin: 'measure',
      label: LABEL,
      archetype: archetypeId,
      text: `Define the success metrics for ${feature.feature_name} on ${company.company_name}.`,
      subject: company.company_name,
      hint: HINT,
    }
  },
}
