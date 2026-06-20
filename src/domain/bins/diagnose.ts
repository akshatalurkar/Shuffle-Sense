import type { Bin } from './bin'
import { pickArchetypeId } from './bin'
import { archetypeCompanies, archetypeMetrics } from '../selectors'

const LABEL = '05 Diagnose'
const HINT = 'Internal vs. External'

// "{company}'s {metric} {direction_bad} X%. Where do you look?"
export const diagnose: Bin = {
  id: 'diagnose',
  label: LABEL,
  hint: HINT,
  generate(ctx) {
    const archetypeId = pickArchetypeId(ctx)
    const company = ctx.rng.pick(archetypeCompanies(ctx.data, archetypeId))
    const metric = ctx.rng.pick(archetypeMetrics(ctx.data, archetypeId))
    const pct = ctx.rng.nextInt(5, 30)
    return {
      bin: 'diagnose',
      label: LABEL,
      archetype: archetypeId,
      text: `${company.company_name}'s ${metric.metric_name} ${metric.direction_bad} ${pct}%. Where do you look?`,
      subject: company.company_name,
      hint: HINT,
    }
  },
}
