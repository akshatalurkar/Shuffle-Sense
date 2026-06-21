// Wraps the prompt card and hint card together so they move and center as one unit.
import { PromptCard } from './PromptCard'
import { HintCard } from './HintCard'
import type { Prompt } from '../../domain/types'

interface StageGroupProps {
  prompt: Prompt | null
  dealKey: number
  hintOpen: boolean
  onToggleHint: () => void
}

export function StageGroup({ prompt, dealKey, hintOpen, onToggleHint }: StageGroupProps) {
  return (
    <div key={dealKey} className={`stage-group${hintOpen ? ' open' : ''}`}>
      <HintCard hint={prompt?.hint ?? []} open={hintOpen} onToggle={onToggleHint} bin={prompt?.bin} />
      <PromptCard prompt={prompt} />
    </div>
  )
}
